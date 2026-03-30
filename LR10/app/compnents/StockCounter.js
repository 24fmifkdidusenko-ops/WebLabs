"use client"; 

import { useState } from "react";

export default function StockCounter({ initialStock }) {
  const [stock, setStock] = useState(initialStock);

  const addToCart = () => {
    if (stock > 0) setStock(stock - 1);
  };

  return (
    <div>
      <p>Stock: {stock}</p>
      <button onClick={addToCart} disabled={stock === 0}>
        Add to Cart
      </button>
    </div>
  );
}