import express from 'express';
import {
  createAppointment,
  getAllAppointments,
  getMyAppointments,
  getDoctorAppointments,
  updateAppointmentStatus,
  deleteAppointment,
} from '../controllers/appointmentController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .post(protect, createAppointment)
  .get(protect, authorize('admin'), getAllAppointments);

router.get('/my', protect, getMyAppointments);
router.get('/doctor', protect, authorize('doctor'), getDoctorAppointments);
router.put('/:id/status', protect, authorize('admin', 'doctor'), updateAppointmentStatus);
router.delete('/:id', protect, authorize('admin'), deleteAppointment);

export default router;
