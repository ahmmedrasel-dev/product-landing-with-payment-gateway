"use client";
import React from "react";

interface Size {
  id: number;
  label: string;
  price: number;
}

interface SizeVarientProps {
  sizes: Size[];
  onSizeChange: (id: number) => void;
}

const SizeVarient: React.FC<SizeVarientProps> = ({ sizes, onSizeChange }) => {
  return (
    <div>
      <p className="text-sm text-gray-600 mb-6">Wrist Size</p>
      <div className="flex items-center gap-2">
        {sizes.map((item) => (
          <div key={item.id}>
            <input
              type="radio"
              className="btn-check"
              name="bandSize"
              id={`size${item.id}`}
              defaultValue="69"
              autoComplete="off"
              onChange={() => onSizeChange(item.id)}
            />
            <label className="size-varient-item" htmlFor={`size${item.id}`}>
              <strong>{item.label}</strong> ${item.price}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SizeVarient;
