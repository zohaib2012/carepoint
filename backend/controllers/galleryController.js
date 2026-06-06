import asyncHandler from 'express-async-handler';
import Gallery from '../models/Gallery.js';

export const getGallery = asyncHandler(async (req, res) => {
  const items = await Gallery.find({}).sort('-createdAt');
  res.json(items);
});

export const createGalleryItem = asyncHandler(async (req, res) => {
  const item = await Gallery.create(req.body);
  res.status(201).json(item);
});

export const updateGalleryItem = asyncHandler(async (req, res) => {
  const item = await Gallery.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!item) {
    res.status(404);
    throw new Error('Gallery item not found');
  }
  res.json(item);
});

export const deleteGalleryItem = asyncHandler(async (req, res) => {
  const item = await Gallery.findById(req.params.id);
  if (!item) {
    res.status(404);
    throw new Error('Gallery item not found');
  }
  await item.deleteOne();
  res.json({ message: 'Gallery item removed' });
});
