import { ClothingCategoryRow } from "./ClothingCategoryRow";

const formalWear = [
  {
    id: "fw1",
    name: "Classic Black Suit",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200",
    description: "Elegant black suit for formal occasions",
    brand: "EssentialWear",
    images: [{
      id: "img1",
      url: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200",
      alt: "Classic Black Suit",
      isDefault: true
    }]
  },
  {
    id: "fw2",
    name: "Business Blazer",
    price: 189.99,
    image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=200",
    description: "Professional business blazer for office wear",
    brand: "EssentialWear",
    images: [{
      id: "img2",
      url: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=200",
      alt: "Business Blazer",
      isDefault: true
    }]
  },
  {
    id: "fw3",
    name: "Formal Trousers",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200",
    description: "Classic formal trousers for a polished look",
    brand: "EssentialWear",
    images: [{
      id: "img3",
      url: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200",
      alt: "Formal Trousers",
      isDefault: true
    }]
  },
  {
    id: "fw4",
    name: "White Dress Shirt",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=200",
    description: "Crisp white dress shirt for formal occasions",
    brand: "EssentialWear",
    images: [{
      id: "img4",
      url: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=200",
      alt: "White Dress Shirt",
      isDefault: true
    }]
  },
  {
    id: "fw5",
    name: "Formal Dress",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200",
    description: "Elegant formal dress for special events",
    brand: "EssentialWear",
    images: [{
      id: "img5",
      url: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200",
      alt: "Formal Dress",
      isDefault: true
    }]
  },
  {
    id: "fw6",
    name: "Evening Gown",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=200",
    description: "Luxurious evening gown for formal occasions",
    brand: "EssentialWear",
    images: [{
      id: "img6",
      url: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=200",
      alt: "Evening Gown",
      isDefault: true
    }]
  },
  {
    id: "fw7",
    name: "Tuxedo Set",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200",
    description: "Complete tuxedo set for formal events",
    brand: "EssentialWear",
    images: [{
      id: "img7",
      url: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200",
      alt: "Tuxedo Set",
      isDefault: true
    }]
  },
];

const ethnicWear = [
  {
    id: "ew1",
    name: "Silk Saree",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200",
    description: "Traditional silk saree with intricate designs",
    brand: "EssentialWear",
    images: [{
      id: "img1",
      url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200",
      alt: "Silk Saree",
      isDefault: true
    }]
  },
  {
    id: "ew2",
    name: "Kurta Set",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=200",
    description: "Stylish kurta set for festive occasions",
    brand: "EssentialWear",
    images: [{
      id: "img2",
      url: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=200",
      alt: "Kurta Set",
      isDefault: true
    }]
  },
  {
    id: "ew3",
    name: "Designer Lehenga",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200",
    description: "Beautiful designer lehenga for weddings",
    brand: "EssentialWear",
    images: [{
      id: "img3",
      url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200",
      alt: "Designer Lehenga",
      isDefault: true
    }]
  },
  {
    id: "ew4",
    name: "Embroidered Sherwani",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=200",
    description: "Elegant embroidered sherwani for grooms",
    brand: "EssentialWear",
    images: [{
      id: "img4",
      url: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=200",
      alt: "Embroidered Sherwani",
      isDefault: true
    }]
  },
  {
    id: "ew5",
    name: "Traditional Dhoti",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200",
    description: "Classic traditional dhoti for cultural events",
    brand: "EssentialWear",
    images: [{
      id: "img5",
      url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200",
      alt: "Traditional Dhoti",
      isDefault: true
    }]
  },
  {
    id: "ew6",
    name: "Anarkali Suit",
    price: 179.99,
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=200",
    description: "Graceful anarkali suit for festive occasions",
    brand: "EssentialWear",
    images: [{
      id: "img6",
      url: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=200",
      alt: "Anarkali Suit",
      isDefault: true
    }]
  },
  {
    id: "ew7",
    name: "Banarasi Saree",
    price: 259.99,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200",
    description: "Luxurious Banarasi saree for special occasions",
    brand: "EssentialWear",
    images: [{
      id: "img7",
      url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200",
      alt: "Banarasi Saree",
      isDefault: true
    }]
  },
];

const casualWear = [
  {
    id: "cw1",
    name: "Denim Jeans",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200",
    description: "Classic denim jeans for casual wear",
    brand: "EssentialWear",
    images: [{
      id: "img1",
      url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200",
      alt: "Denim Jeans",
      isDefault: true
    }]
  },
  {
    id: "cw2",
    name: "Cotton T-Shirt",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200",
    description: "Breathable cotton t-shirt for everyday wear",
    brand: "EssentialWear",
    images: [{
      id: "img2",
      url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200",
      alt: "Cotton T-Shirt",
      isDefault: true
    }]
  },
  {
    id: "cw3",
    name: "Casual Shirt",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200",
    description: "Stylish casual shirt for relaxed outings",
    brand: "EssentialWear",
    images: [{
      id: "img3",
      url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200",
      alt: "Casual Shirt",
      isDefault: true
    }]
  },
  {
    id: "cw4",
    name: "Summer Dress",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200",
    description: "Light and breezy summer dress for warm days",
    brand: "EssentialWear",
    images: [{
      id: "img4",
      url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200",
      alt: "Summer Dress",
      isDefault: true
    }]
  },
  {
    id: "cw5",
    name: "Hoodie",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200",
    description: "Cozy hoodie for casual wear",
    brand: "EssentialWear",
    images: [{
      id: "img5",
      url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200",
      alt: "Hoodie",
      isDefault: true
    }]
  },
  {
    id: "cw6",
    name: "Shorts",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200",
    description: "Comfortable shorts for summer outings",
    brand: "EssentialWear",
    images: [{
      id: "img6",
      url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200",
      alt: "Shorts",
      isDefault: true
    }]
  },
  {
    id: "cw7",
    name: "Sweatshirt",
    price: 54.99,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200",
    description: "Warm sweatshirt for chilly days",
    brand: "EssentialWear",
    images: [{
      id: "img7",
      url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200",
      alt: "Sweatshirt",
      isDefault: true
    }]
  },
];

export const ClothingCategories = () => {
  return (
    <div className="py-4">
      <ClothingCategoryRow
        title="Formal Wear"
        categoryId="formal-wear"
        products={formalWear}
      />
      <ClothingCategoryRow
        title="Ethnic Wear"
        categoryId="ethnic-wear"
        products={ethnicWear}
      />
      <ClothingCategoryRow
        title="Casual Wear"
        categoryId="casual-wear"
        products={casualWear}
      />
    </div>
  );
};
