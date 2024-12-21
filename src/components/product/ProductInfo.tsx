type ProductInfoProps = {
  name: string;
  price: number;
  originalPrice: number;
  discount: string;
  rating: number;
  ratingCount: number;
};

export const ProductInfo = ({
  name,
  price,
  originalPrice,
  discount,
  rating,
  ratingCount,
}: ProductInfoProps) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">{name}</h2>
        <div className="flex items-center gap-1">
          <span className="bg-primary-500 text-white text-xs px-1.5 py-0.5 rounded">
            {rating} ★
          </span>
          <span className="text-xs text-gray-500">
            {ratingCount}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <span className="text-xl font-semibold">${price}</span>
        <span className="text-gray-500 line-through text-sm">
          ${originalPrice}
        </span>
        <span className="text-primary-500 text-sm">{discount}</span>
      </div>
    </div>
  );
};