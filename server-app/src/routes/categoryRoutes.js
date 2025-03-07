const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const subcategoryController = require('../controllers/subcategoryController');

// Category routes
router.post('/', categoryController.createCategory);
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

// Subcategory routes
router.post('/sub', subcategoryController.createSubcategory);
router.get('/sub', subcategoryController.getAllSubcategories);
router.get('/sub/:id', subcategoryController.getSubcategoryById);
router.put('/sub/:id', subcategoryController.updateSubcategory);
router.delete('/sub/:id', subcategoryController.deleteSubcategory);

// Get subcategories by category
router.get('/:categoryId/subcategories', subcategoryController.getSubcategoriesByCategory);

module.exports = router;
