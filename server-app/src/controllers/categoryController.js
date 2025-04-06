const Category = require('../models/categoryModel');
const Subcategory = require('../models/subcategoryModel');
const categoryService = require('../services/categoryService');

// Create new category
exports.createCategory = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user info is attached to req by auth middleware
        const savedCategory = await categoryService.createCategory(req.body, userId);
        res.status(201).json(savedCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all categories with their subcategories
exports.getAllCategories = async (req, res) => {
    try {
        const { gender, adults, superSelect } = req.query;
        const filter = { isActive: true };
        
        if (gender) filter.gender = gender;
        if (adults !== undefined) filter.adults = adults === 'true';
        if (superSelect) filter.superSelect = superSelect;

        const categories = await categoryService.getAllCategories(filter);
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get category by ID with its subcategories
exports.getCategoryById = async (req, res) => {
    try {
        const category = await categoryService.getCategoryById(req.params.id);
        res.status(200).json(category);
    } catch (error) {
        if (error.message === 'Category not found') {
            return res.status(404).json({ message: error.message });
        }
        if (error.message === 'Invalid category ID') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: error.message });
    }
};

// Update category
exports.updateCategory = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user info is attached to req by auth middleware
        const category = await categoryService.updateCategory(req.params.id, req.body, userId);
        res.status(200).json(category);
    } catch (error) {
        if (error.message === 'Category not found') {
            return res.status(404).json({ message: error.message });
        }
        if (error.message === 'Invalid category ID') {
            return res.status(400).json({ message: error.message });
        }
        res.status(400).json({ message: error.message });
    }
};

// Delete category and its subcategories (soft delete)
exports.deleteCategory = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user info is attached to req by auth middleware
        const category = await categoryService.deleteCategory(req.params.id, userId);
        res.status(200).json({ message: 'Category and related subcategories deleted successfully' });
    } catch (error) {
        if (error.message === 'Category not found') {
            return res.status(404).json({ message: error.message });
        }
        if (error.message === 'Invalid category ID') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: error.message });
    }
};
