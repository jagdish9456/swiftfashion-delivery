const ProductService = require('../src/services/productService');

describe('ProductService', () => {
  it('should return an array of products', async () => {
    const products = await ProductService.getAllProducts();
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);
    expect(products[0]).toHaveProperty('name');
    expect(products[0]).toHaveProperty('price');
  });
});
