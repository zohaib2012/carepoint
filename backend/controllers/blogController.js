import asyncHandler from 'express-async-handler';
import Blog from '../models/Blog.js';

export const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({}).sort('-date');
  res.json(blogs);
});

export const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    res.status(404);
    throw new Error('Blog not found');
  }
  res.json(blog);
});

export const createBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.create(req.body);
  res.status(201).json(blog);
});

export const updateBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!blog) {
    res.status(404);
    throw new Error('Blog not found');
  }
  res.json(blog);
});

export const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    res.status(404);
    throw new Error('Blog not found');
  }
  await blog.deleteOne();
  res.json({ message: 'Blog removed' });
});
