class ProductService {
  async getAllProducts() {
    // For now, return dummy data
    return [
      {
        id: "1",
        name: "Classic White Cotton T-Shirt",
        price: 29.99,
        category: "T-Shirts",
        colors: ["White"],
        type: ["Casual", "Basic", "Essential"],
        material: "100% Cotton",
        sizes: ["XS", "S", "M", "L", "XL"],
        season: ["Summer", "Spring"],
        wearType: "Casual Wear",
        description: "Breathable cotton t-shirt perfect for everyday wear",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
        brand: "EssentialWear"
      },
      {
        id: "2",
        name: "Slim Fit Dark Denim Jeans",
        price: 79.99,
        category: "Jeans",
        colors: ["Dark Blue"],
        type: ["Casual", "Slim Fit", "Denim"],
        material: "98% Cotton, 2% Elastane",
        sizes: ["28", "30", "32", "34", "36"],
        season: ["All Season"],
        wearType: "Casual Wear",
        description: "Classic dark wash slim fit jeans with stretch comfort",
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
        brand: "DenimCo"
      }
    ];
  }
}

module.exports = new ProductService();