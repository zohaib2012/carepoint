import express from 'express';
import {
  getGallery,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} from '../controllers/galleryController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getGallery)
  .post(protect, authorize('admin'), createGalleryItem);

router.route('/:id')
  .put(protect, authorize('admin'), updateGalleryItem)
  .delete(protect, authorize('admin'), deleteGalleryItem);

export default router;
