export const OfferBanners = () => {
  return (
    <div className="px-4 py-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=800"
            alt="Special Offer on Designer Wear"
            className="w-full h-40 object-cover"
          />
        </div>
        <div className="rounded-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800"
            alt="Summer Collection Sale"
            className="w-full h-40 object-cover"
          />
        </div>
      </div>
    </div>
  );
};