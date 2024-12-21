import { ClothingCategoryRow } from "./ClothingCategoryRow";

interface ClothingCategoriesProps {
  categoryId?: string;
}

const formalWear = [
  {
    id: "fw1",
    name: "Classic Black Suit",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200",
  },
  {
    id: "fw2",
    name: "Business Blazer",
    price: 189.99,
    image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=200",
  },
  {
    id: "fw3",
    name: "Formal Trousers",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200",
  },
  {
    id: "fw4",
    name: "White Dress Shirt",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=200",
  },
  {
    id: "fw5",
    name: "Formal Dress",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200",
  },
  {
    id: "fw6",
    name: "Evening Gown",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=200",
  },
  {
    id: "fw7",
    name: "Tuxedo Set",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200",
  },
];

const ethnicWear = [
  {
    id: "ew1",
    name: "Silk Saree",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200",
  },
  {
    id: "ew2",
    name: "Kurta Set",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=200",
  },
  {
    id: "ew3",
    name: "Designer Lehenga",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200",
  },
  {
    id: "ew4",
    name: "Embroidered Sherwani",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=200",
  },
  {
    id: "ew5",
    name: "Traditional Dhoti",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200",
  },
  {
    id: "ew6",
    name: "Anarkali Suit",
    price: 179.99,
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=200",
  },
  {
    id: "ew7",
    name: "Banarasi Saree",
    price: 259.99,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200",
  },
];

const casualWear = [
  {
    id: "cw1",
    name: "Denim Jeans",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200",
  },
  {
    id: "cw2",
    name: "Cotton T-Shirt",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200",
  },
  {
    id: "cw3",
    name: "Casual Shirt",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200",
  },
  {
    id: "cw4",
    name: "Summer Dress",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200",
  },
  {
    id: "cw5",
    name: "Hoodie",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200",
  },
  {
    id: "cw6",
    name: "Shorts",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200",
  },
  {
    id: "cw7",
    name: "Sweatshirt",
    price: 54.99,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200",
  },
];

export const ClothingCategories = ({ categoryId }: ClothingCategoriesProps) => {
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
