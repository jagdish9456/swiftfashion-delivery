import { ProductCard } from "@/components/categories/ProductCard";

const products = [
  {
    id: "tp1",
    name: "Designer Dress",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=500",
    description: "Elegant designer dress for special occasions",
    brand: "LuxeFashion"
  },
  {
    id: "tp2",
    name: "Formal Suit",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500",
    description: "Classic formal suit for professional settings",
    brand: "ElegantWear"
  },
  {
    id: "tp3",
    name: "Summer Collection",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500",
    description: "Light and breezy summer collection pieces",
    brand: "SummerStyle"
  },
  {
    id: "tp4",
    name: "Winter Jacket",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500",
    description: "Warm and stylish winter jacket",
    brand: "WinterComfort"
  },
  {
    id: "tp5",
    name: "Casual Shirt",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500",
    description: "Comfortable casual shirt for everyday wear",
    brand: "CasualWear"
  },
  {
    id: "tp6",
    name: "Party Wear",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500",
    description: "Stunning party wear for special events",
    brand: "PartyGlam"
  },
  {
    id: "tp7",
    name: "Traditional Wear",
    price: 179.99,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500",
    description: "Beautiful traditional wear collection",
    brand: "Heritage"
  },
  {
    id: "tp8",
    name: "Ethnic Wear",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=500",
    description: "Elegant ethnic wear for cultural occasions",
    brand: "EthnicElegance"
  },
  {
    id: "tp9",
    name: "Business Attire",
    price: 219.99,
    image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=500",
    description: "Professional business attire collection",
    brand: "BusinessClass"
  },
  {
    id: "tp10",
    name: "Casual Wear",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500",
    description: "Trendy casual wear for everyday style",
    brand: "CasualChic"
  },
];

export const TopProducts = () => {
  return (
    <div className="px-4 py-6">
      <h2 className="text-lg font-semibold mb-4">Popular Near You</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};