const Category = require('../models/categoryModel');
const Subcategory = require('../models/subcategoryModel');

// Create new category
exports.createCategory = async (req, res) => {
    try {
        const category = new Category(req.body);
        const savedCategory = await category.save();
        res.status(201).json(savedCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all categories with their subcategories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({ isActive: true })
            .populate({
                path: 'subcategories',
                match: { isActive: true },
                select: 'name description'
            });
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get category by ID with its subcategories
exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)
            .populate({
                path: 'subcategories',
                match: { isActive: true },
                select: 'name description'
            });
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update category
exports.updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate({
            path: 'subcategories',
            match: { isActive: true },
            select: 'name description'
        });
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete category and its subcategories (soft delete)
exports.deleteCategory = async (req, res) => {
    try {
        const session = await Category.startSession();
        session.startTransaction();

        try {
            // Soft delete the category
            const category = await Category.findByIdAndUpdate(
                req.params.id,
                { isActive: false },
                { new: true, session }
            );

            if (!category) {
                await session.abortTransaction();
                session.endSession();
                return res.status(404).json({ message: 'Category not found' });
            }

            // Soft delete all associated subcategories
            await Subcategory.updateMany(
                { category: req.params.id },
                { isActive: false },
                { session }
            );

            await session.commitTransaction();
            session.endSession();

            res.status(200).json({ 
                message: 'Category and its subcategories deleted successfully' 
            });
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            throw error;
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
