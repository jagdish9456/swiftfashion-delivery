const Subcategory = require('../models/subcategoryModel');
const Category = require('../models/categoryModel');

// Create new subcategory
exports.createSubcategory = async (req, res) => {
    try {
        // Verify category exists
        const categoryExists = await Category.findById(req.body.category);
        if (!categoryExists) {
            return res.status(404).json({ message: 'Category not found' });
        }

        const subcategory = new Subcategory(req.body);
        const savedSubcategory = await subcategory.save();
        
        // Populate category details
        await savedSubcategory.populate('category', 'name');
        res.status(201).json(savedSubcategory);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ 
                message: 'Subcategory with this name already exists in the selected category' 
            });
        }
        res.status(400).json({ message: error.message });
    }
};

// Get all subcategories
exports.getAllSubcategories = async (req, res) => {
    try {
        const filter = { isActive: true };
        
        // Filter by category if provided
        if (req.query.category) {
            filter.category = req.query.category;
        }

        const subcategories = await Subcategory.find(filter)
            .populate('category', 'name')
            .sort({ name: 1 });
        res.status(200).json(subcategories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get subcategory by ID
exports.getSubcategoryById = async (req, res) => {
    try {
        const subcategory = await Subcategory.findById(req.params.id)
            .populate('category', 'name');
        if (!subcategory) {
            return res.status(404).json({ message: 'Subcategory not found' });
        }
        res.status(200).json(subcategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update subcategory
exports.updateSubcategory = async (req, res) => {
    try {
        // If category is being updated, verify it exists
        if (req.body.category) {
            const categoryExists = await Category.findById(req.body.category);
            if (!categoryExists) {
                return res.status(404).json({ message: 'Category not found' });
            }
        }

        const subcategory = await Subcategory.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('category', 'name');

        if (!subcategory) {
            return res.status(404).json({ message: 'Subcategory not found' });
        }
        res.status(200).json(subcategory);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ 
                message: 'Subcategory with this name already exists in the selected category' 
            });
        }
        res.status(400).json({ message: error.message });
    }
};

// Delete subcategory (soft delete)
exports.deleteSubcategory = async (req, res) => {
    try {
        const subcategory = await Subcategory.findByIdAndUpdate(
            req.params.id,
            { isActive: false },
            { new: true }
        );
        if (!subcategory) {
            return res.status(404).json({ message: 'Subcategory not found' });
        }
        res.status(200).json({ message: 'Subcategory deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get subcategories by category
exports.getSubcategoriesByCategory = async (req, res) => {
    try {
        const subcategories = await Subcategory.find({
            category: req.params.categoryId,
            isActive: true
        }).populate('category', 'name');
        res.status(200).json(subcategories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
