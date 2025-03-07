"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaRegHeart, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";
import { toast } from "react-toastify";
import ColorVarient from "./ColorVarient";
import SizeVarient from "./SizeVarient";
import CartModal from "./CartModal";

interface Product {
  title: string;
  thumbnail: string;
  regularPrice: number;
  discountPrice: number;
  summary: string;
  colors: { id: number; name: string; thumbnail: string }[];
  sizes: { id: number; label: string; price: number }[];
}

const ProductDetails = ({ product }: { product: Product }) => {
  const [cart, setCart] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedThumbnail, setSelectedThumbnail] = useState(product.thumbnail);
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleColorChange = (colorId) => {
    const selectedColor = product.colors.find((color) => color.id === colorId);
    if (selectedColor) {
      setSelectedThumbnail(selectedColor.thumbnail);
      setSelectedColor(selectedColor.name);
    }
  };

  const handleSizeChange = (sizeId) => {
    const size = product.sizes.find((size) => size.id === sizeId);
    if (size) {
      setSelectedSize(size.label);
      setSelectedPrice(size.price);
    }
  };

  const handleQuantityChange = (type) => {
    if (type === "increment") {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrement" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (!selectedColor) {
      toast.error("Please select a color.");
      return;
    }
    if (!selectedSize) {
      toast.error("Please select a size.");
      return;
    }

    if (!selectedColor) {
      toast.error("Please select a color.");
      return;
    }
    if (!selectedSize) {
      toast.error("Please select a size.");
      return;
    }

    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.color === selectedColor && item.size === selectedSize
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item === existingItem
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      const newCartItem = {
        title: product.title,
        thumbnail: selectedThumbnail,
        color: selectedColor,
        size: selectedSize,
        price: selectedPrice * quantity,
        quantity,
      };

      return [...prevCart, newCartItem];
    });
    toast.success("Product added to cart!");
  };

  return (
    <section className="py-5">
      <div className="container mx-auto px-4">
        <div className="flex md:flex-row flex-col items-center gap-6">
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <div className="thumbnail-wraper">
              <Image
                id="productThumbnail"
                src={selectedThumbnail}
                width={500}
                height={500}
                alt="Main Thumbnail"
                className="w-full h-auto"
              />
            </div>
          </div>

          <div className="w-full md:w-1/2 flex flex-col">
            <h1 className="text-4xl text-[#364a63] font-bold mb-5">
              {product.title}
            </h1>

            <div className="flex items-center mb-5">
              <div className="flex text-[#ffd200] gap-1 mr-3">
                <FaStar className="text-xl" />
                <FaStar className="text-xl" />
                <FaStar className="text-xl" />
                <FaStarHalfAlt className="text-xl" />
                <FaRegStar className="text-xl" />
              </div>
              <p className="text-xl">(2 Review)</p>
            </div>

            <div className="flex items-center gap-4 mb-5">
              <span className="line-through text-gray-500">
                ${product.regularPrice}
              </span>
              <h3 className="text-xl font-semibold">
                ${product.discountPrice}
              </h3>
            </div>

            <p className="text-gray-600 mb-5">{product.summary}</p>

            <div className="flex gap-4 mb-5">
              <div className="space-y-1">
                <p className="text-sm text-gray-600">Type</p>
                <strong>Watch</strong>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-gray-600">Model Number</p>
                <strong>Forerunner 290XT</strong>
              </div>
            </div>

            <div className="mb-5 ">
              <ColorVarient
                color={product.colors}
                onColorChange={handleColorChange}
              />
            </div>

            <div className="mb-6">
              <SizeVarient
                sizes={product.sizes}
                onSizeChange={handleSizeChange}
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded">
                <button
                  className="px-4 py-2 border-r"
                  type="button"
                  id="decrement"
                  onClick={() => handleQuantityChange("decrement")}
                >
                  -
                </button>
                <input
                  type="text"
                  className="w-12 text-center border-none focus:ring-0"
                  value={quantity}
                  id="quantity"
                  readOnly
                />
                <button
                  className="px-4 py-2 border-l"
                  type="button"
                  id="increment"
                  onClick={() => handleQuantityChange("increment")}
                >
                  +
                </button>
              </div>

              <button
                className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>

              <a
                className="flex items-center justify-center text-gray-500 hover:text-red-500"
                href="#"
              >
                <FaRegHeart className="text-2xl" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={openModal}
            className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Check Out{" "}
            <span id="total_item" className="ml-2">
              {cart.length}
            </span>
          </button>
        </div>

        <CartModal isOpen={isModalOpen} onClose={closeModal} cart={cart} />
      </div>
    </section>
  );
};

export default ProductDetails;
