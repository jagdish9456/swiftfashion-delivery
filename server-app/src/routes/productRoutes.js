const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');

router.get('/', ProductController.getAllProducts.bind(ProductController));
router.get('/:id', ProductController.getProductById.bind(ProductController));
router.post('/', ProductController.createProduct.bind(ProductController));
router.put('/:id', ProductController.updateProduct.bind(ProductController));
router.delete('/:id', ProductController.deleteProduct.bind(ProductController));

module.exports = router;