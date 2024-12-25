import React from 'react';
import { Link } from 'react-router-dom';

const mustHaveItems = [
  {
    id: "1",
    name: "Dettol Antiseptic Liquid",
    price: 80,
    originalPrice: 95,
    discount: "15% OFF",
    image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=500"
  },
  {
    id: "2",
    name: "VEGA Organic Cotton Balls",
    price: 60,
    originalPrice: 79,
    discount: "24% OFF",
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500"
  },
  {
    id: "3",
    name: "Betadine 10% Ointment",
    price: 128,
    originalPrice: 145,
    discount: "12% OFF",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500"
  },
  {
    id: "4",
    name: "Eveready Batteries",
    price: 54,
    originalPrice: 65,
    discount: "17% OFF",
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500"
  },
  {
    id: "5",
    name: "Parachute Body Lotion",
    price: 104,
    originalPrice: 229,
    discount: "55% OFF",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500"
  }
];

const TrackOrder = () => {
  return (
    <div>
      <h1>Track Your Order</h1>
      <div>
        {mustHaveItems.map(item => (
          <div key={item.id}>
            <img src={item.image} alt={item.name} />
            <h2>{item.name}</h2>
            <p>Price: ₹{item.price} <span className="line-through">₹{item.originalPrice}</span></p>
            <p>{item.discount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackOrder;
