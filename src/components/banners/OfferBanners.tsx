export const OfferBanners = () => {
  return (
    <div className="px-4 py-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-lg overflow-hidden relative group">
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
          <img
            src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=800"
            alt="Special Offer on Designer Wear"
            loading="lazy"
            className="w-full h-40 object-cover"
          />
          <div className="absolute top-0 left-0 p-4 text-white">
            <h3 className="text-lg font-bold">Designer Collection</h3>
            <p className="text-sm">Up to 60% OFF</p>
            <button className="mt-2 text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full backdrop-blur-sm transition-colors">
              Shop Now →
            </button>
          </div>
        </div>
        <div className="rounded-lg overflow-hidden relative group">
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800"
            alt="Summer Collection Sale"
            loading="lazy"
            className="w-full h-40 object-cover"
          />
          <div className="absolute top-0 left-0 p-4 text-white">
            <h3 className="text-lg font-bold">Summer Collection</h3>
            <p className="text-sm">Starting at ₹499</p>
            <button className="mt-2 text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full backdrop-blur-sm transition-colors">
              Shop Now →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
