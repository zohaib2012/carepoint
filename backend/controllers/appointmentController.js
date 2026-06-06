import asyncHandler from 'express-async-handler';
import Appointment from '../models/Appointment.js';
import Doctor from '../models/Doctor.js';

const VALID_STATUSES = ['pending', 'confirmed', 'cancelled', 'completed'];

export const createAppointment = asyncHandler(async (req, res) => {
  const { doctorId, service, date, timeSlot, notes } = req.body;
  const doctor = await Doctor.findById(doctorId);
  if (!doctor) {
    res.status(400);
    throw new Error('Doctor not found');
  }
  const appointment = await Appointment.create({
    patientId: req.user._id,
    doctorId,
    service,
    date,
    timeSlot,
    notes,
  });
  await appointment.populate('patientId', 'name email phone');
  await appointment.populate({ path: 'doctorId', populate: { path: 'userId', select: 'name email' } });
  res.status(201).json(appointment);
});

export const getAllAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({})
    .populate('patientId', 'name email phone')
    .populate({
      path: 'doctorId',
      populate: { path: 'userId', select: 'name email' },
    })
    .sort('-createdAt');
  res.json(appointments);
});

export const getMyAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({ patientId: req.user._id })
    .populate('patientId', 'name email phone')
    .populate({
      path: 'doctorId',
      populate: { path: 'userId', select: 'name email' },
    })
    .sort('-createdAt');
  res.json(appointments);
});

export const getDoctorAppointments = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findOne({ userId: req.user._id });
  if (!doctor) {
    res.status(404);
    throw new Error('Doctor profile not found');
  }
  const appointments = await Appointment.find({ doctorId: doctor._id })
    .populate('patientId', 'name email phone')
    .populate({
      path: 'doctorId',
      populate: { path: 'userId', select: 'name email' },
    })
    .sort('-createdAt');
  res.json(appointments);
});

export const updateAppointmentStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  if (!VALID_STATUSES.includes(status)) {
    res.status(400);
    throw new Error(`Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}`);
  }
  const appointment = await Appointment.findById(req.params.id);
  if (!appointment) {
    res.status(404);
    throw new Error('Appointment not found');
  }
  appointment.status = status;
  const updated = await appointment.save();
  await updated.populate('patientId', 'name email phone');
  await updated.populate({ path: 'doctorId', populate: { path: 'userId', select: 'name email' } });
  res.json(updated);
});

export const deleteAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);
  if (!appointment) {
    res.status(404);
    throw new Error('Appointment not found');
  }
  await appointment.deleteOne();
  res.json({ message: 'Appointment removed' });
});
