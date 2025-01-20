const express = require('express');
const router = express.Router();
const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory, // Import the new getCategory method
} = require('../controllers/categoriesController');

// GET all categories
router.get('/', getCategories);

// GET a category by ID (new route)
router.get('/:id', getCategory);  // Add this line

// POST a new category
router.post('/', createCategory);

// PUT (update) an existing category
router.put('/:id', updateCategory);

// DELETE a category
router.delete('/:id', deleteCategory);

module.exports = router;
