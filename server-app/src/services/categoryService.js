const Category = require('../models/categoryModel');

const categoryService = {
    async createCategory(categoryData, userId) {
        try {
            const category = new Category({
                ...categoryData,
                createdModifiedBy: userId,
                createdModifiedOn: new Date()
            });
            return await category.save();
        } catch (error) {
            console.error("Error creating category:", error);
            throw new Error('Failed to create category');
        }
    },

    async getAllCategories(filter = { isActive: true }) {
        try {
            return await Category.find(filter)
                .populate({
                    path: 'subcategories',
                    match: { isActive: true },
                    select: 'name description'
                })
                .populate('createdModifiedBy', 'name email');
        } catch (error) {
            console.error("Error fetching categories:", error);
            throw new Error('Failed to fetch categories');
        }
    },

    async getCategoryById(id) {
        try {
            const category = await Category.findById(id)
                .populate({
                    path: 'subcategories',
                    match: { isActive: true },
                    select: 'name description'
                })
                .populate('createdModifiedBy', 'name email');
            
            if (!category) {
                throw new Error('Category not found');
            }
            return category;
        } catch (error) {
            console.error("Error fetching category:", error);
            if (error.name === 'CastError') {
                throw new Error('Invalid category ID');
            }
            throw error;
        }
    },

    async updateCategory(id, updateData, userId) {
        try {
            const category = await Category.findByIdAndUpdate(
                id,
                {
                    ...updateData,
                    createdModifiedBy: userId,
                    createdModifiedOn: new Date()
                },
                { new: true, runValidators: true }
            ).populate('createdModifiedBy', 'name email');

            if (!category) {
                throw new Error('Category not found');
            }
            return category;
        } catch (error) {
            console.error("Error updating category:", error);
            if (error.name === 'CastError') {
                throw new Error('Invalid category ID');
            }
            throw error;
        }
    },

    async deleteCategory(id, userId) {
        try {
            const category = await Category.findByIdAndUpdate(
                id,
                { 
                    isActive: false,
                    createdModifiedBy: userId,
                    createdModifiedOn: new Date()
                },
                { new: true }
            );

            if (!category) {
                throw new Error('Category not found');
            }

            // Also deactivate all related subcategories
            await Category.updateMany(
                { category: id },
                { 
                    isActive: false,
                    createdModifiedBy: userId,
                    createdModifiedOn: new Date()
                }
            );

            return category;
        } catch (error) {
            console.error("Error deleting category:", error);
            if (error.name === 'CastError') {
                throw new Error('Invalid category ID');
            }
            throw error;
        }
    }
};

module.exports = categoryService;
