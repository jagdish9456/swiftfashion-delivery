type Category = {
  name: string;
  icon: string;
};

export interface CategorySidebarProps {
  categories: Category[];
  currentCategory?: {
    id: string;
    name: string;
    description: string;
    image: string;
    icon: string;
    gender: string;
    featured: boolean;
    order: number;
    metaTitle: string;
    metaDescription: string;
  };
}

export const CategorySidebar = ({ categories, currentCategory }: CategorySidebarProps) => {
  return (
    <aside className="w-16 bg-white shadow-sm fixed left-0 top-[41px] bottom-0">
      <div className="p-2 overflow-y-auto max-h-full hide-scrollbar">
        <nav className="space-y-1">
          {categories.map((category) => (
            <button
              key={category.name}
              className={`w-full flex flex-col items-center p-2 rounded-lg text-sm hover:bg-primary-50 hover:text-primary-500 transition-colors ${
                currentCategory?.name === category.name ? 'bg-primary-50 text-primary-500' : ''
              }`}
            >
              <span className="text-lg mb-1">{category.icon}</span>
              <span className="text-[10px]">{category.name}</span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};