import express from 'express';
import { Product, PRODUCT_CONDITIONS } from '../models/Product.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

function buildProductQuery(queryParams) {
  const filter = { isActive: true };

  const { search, category, minPrice, maxPrice, condition } = queryParams;

  if (category && category !== 'all') {
    filter.category = category;
  }

  if (condition && condition !== 'all') {
    filter.condition = condition;
  }

  if (minPrice !== undefined && minPrice !== '') {
    const min = Number(minPrice);
    if (!Number.isNaN(min)) {
      filter.price = { ...filter.price, $gte: min };
    }
  }

  if (maxPrice !== undefined && maxPrice !== '') {
    const max = Number(maxPrice);
    if (!Number.isNaN(max)) {
      filter.price = { ...filter.price, $lte: max };
    }
  }

  if (search && search.trim()) {
    filter.$text = { $search: search.trim() };
  }

  return filter;
}

router.get(
  '/meta/categories',
  asyncHandler(async (req, res) => {
    const categories = await Product.distinct('category', { isActive: true });
    res.json({ categories: categories.sort(), conditions: PRODUCT_CONDITIONS });
  })
);

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const filter = buildProductQuery(req.query);
    const products = await Product.find(filter)
      .populate('seller', 'name email college')
      .sort({ createdAt: -1 })
      .limit(100);

    res.json({ products });
  })
);

router.get(
  '/mine',
  requireAuth,
  asyncHandler(async (req, res) => {
    const products = await Product.find({ seller: req.user._id }).sort({ createdAt: -1 });
    res.json({ products });
  })
);

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate('seller', 'name email college');

    if (!product || !product.isActive) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ product });
  })
);

router.post(
  '/',
  requireAuth,
  asyncHandler(async (req, res) => {
    const { title, description, price, category, condition, imageUrl, contactEmail } = req.body;

    if (!title || !description || price === undefined || !category) {
      return res.status(400).json({
        message: 'Title, description, price, and category are required',
      });
    }

    const numericPrice = Number(price);
    if (Number.isNaN(numericPrice) || numericPrice < 0) {
      return res.status(400).json({ message: 'Price must be a non-negative number' });
    }

    const product = await Product.create({
      title: title.trim(),
      description: description.trim(),
      price: numericPrice,
      category: category.trim(),
      condition: condition || 'Good',
      imageUrl: imageUrl ? imageUrl.trim() : '',
      contactEmail: contactEmail ? contactEmail.trim() : req.user.email,
      seller: req.user._id,
    });

    await product.populate('seller', 'name email college');

    res.status(201).json({ product });
  })
);

router.put(
  '/:id',
  requireAuth,
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only edit your own listings' });
    }

    const { title, description, price, category, condition, imageUrl, contactEmail, isActive } =
      req.body;

    if (title !== undefined) product.title = title.trim();
    if (description !== undefined) product.description = description.trim();
    if (category !== undefined) product.category = category.trim();
    if (condition !== undefined) product.condition = condition;
    if (imageUrl !== undefined) product.imageUrl = imageUrl.trim();
    if (contactEmail !== undefined) product.contactEmail = contactEmail.trim();
    if (isActive !== undefined) product.isActive = Boolean(isActive);

    if (price !== undefined) {
      const numericPrice = Number(price);
      if (Number.isNaN(numericPrice) || numericPrice < 0) {
        return res.status(400).json({ message: 'Price must be a non-negative number' });
      }
      product.price = numericPrice;
    }

    await product.save();
    await product.populate('seller', 'name email college');

    res.json({ product });
  })
);

router.delete(
  '/:id',
  requireAuth,
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only delete your own listings' });
    }

    await product.deleteOne();

    res.json({ message: 'Product deleted' });
  })
);

export default router;
