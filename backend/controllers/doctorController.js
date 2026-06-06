import asyncHandler from 'express-async-handler';
import Doctor from '../models/Doctor.js';
import User from '../models/User.js';

export const getDoctors = asyncHandler(async (req, res) => {
  const { specialty } = req.query;
  const filter = specialty ? { specialty } : {};
  const doctors = await Doctor.find(filter).populate('userId', 'name email phone avatar');
  res.json(doctors);
});

export const getDoctorById = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.params.id).populate('userId', 'name email phone avatar');
  if (!doctor) {
    res.status(404);
    throw new Error('Doctor not found');
  }
  res.json(doctor);
});

export const createDoctor = asyncHandler(async (req, res) => {
  const { userId, specialty, experience, bio, availability, fee } = req.body;
  const user = await User.findById(userId);
  if (!user) {
    res.status(400);
    throw new Error('User not found');
  }
  if (user.role !== 'doctor') {
    res.status(400);
    throw new Error('User must have doctor role');
  }
  const existing = await Doctor.findOne({ userId });
  if (existing) {
    res.status(400);
    throw new Error('Doctor profile already exists for this user');
  }
  const doctor = await Doctor.create({ userId, specialty, experience, bio, availability, fee });
  const populated = await doctor.populate('userId', 'name email phone avatar');
  res.status(201).json(populated);
});

export const updateDoctor = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);
  if (!doctor) {
    res.status(404);
    throw new Error('Doctor not found');
  }
  doctor.specialty = req.body.specialty || doctor.specialty;
  doctor.experience = req.body.experience ?? doctor.experience;
  doctor.bio = req.body.bio ?? doctor.bio;
  doctor.availability = req.body.availability || doctor.availability;
  doctor.fee = req.body.fee ?? doctor.fee;
  doctor.rating = req.body.rating ?? doctor.rating;
  const updated = await doctor.save();
  const populated = await updated.populate('userId', 'name email phone avatar');
  res.json(populated);
});

export const deleteDoctor = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);
  if (!doctor) {
    res.status(404);
    throw new Error('Doctor not found');
  }
  await doctor.deleteOne();
  res.json({ message: 'Doctor removed' });
});
