type FullWidthBannerProps = {
  title?: string;
  description?: string;
  className?: string;
};

export const FullWidthBanner = ({ title, description, className }: FullWidthBannerProps) => {
  return (
    <div className="px-4 py-2">
      <div className={`rounded-lg overflow-hidden relative group ${className}`}>
        <div className="absolute inset-0 bg-primary-500/40 group-hover:bg-primary-500/50 transition-colors" />
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200"
          alt="Special Discount Offer"
          className="w-full h-32 object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white">{title || "Summer Sale"}</h2>
            <p className="text-white">{description || "Get up to 50% off on selected items"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};