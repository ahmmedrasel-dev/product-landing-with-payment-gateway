"use client";
import axios from "axios";
import Image from "next/image";
import React from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";

interface CartItem {
  thumbnail: string;
  title: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, cart }) => {
  const totalQty = cart.reduce(
    (prevQty, cureentItem) => prevQty + cureentItem.quantity,
    0
  );
  const totalPrice = cart.reduce(
    (prevQty, cureentItem) => prevQty + cureentItem.price,
    0
  );

  const handleCheckout = async () => {
    const orderData = {
      cartItems: cart,
      customerInfo: {
        name: "Rasel Ahmmed",
        email: "customer@example.com",
        phone: "01676176820",
        address: "New Zigatola, Dhaka",
      },
    };
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/payments/init`,
      orderData
    );
    if (response.data.status === "success") {
      window.location.href = response.data.redirectUrl;
    } else {
      toast.error("Payment initiation failed. Please try again.");
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Cart Details"
      className="modal-container"
      overlayClassName="modal-overlay"
      ariaHideApp={false}
    >
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Your Cart</h2>
        {cart.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="text-left">
                <th className="border-b px-4 py-2">Item</th>
                <th className="border-b px-4 py-2">Color</th>
                <th className="border-b px-4 py-2">Size</th>
                <th className="border-b px-4 py-2">Qty</th>
                <th className="border-b px-4 py-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index} className="text-lg">
                  <td className="border-b px-4 py-2 flex items-center">
                    <div className="w-20">
                      <Image
                        src={item.thumbnail}
                        width={100}
                        height={100}
                        alt={item.title}
                        className="w-12 h-12 object-cover"
                      />
                    </div>
                    {item.title}
                  </td>
                  <td className="border-b px-4 py-2">{item.color}</td>
                  <td className="border-b px-4 py-2">{item.size}</td>
                  <td className="border-b px-4 py-2">{item.quantity}</td>
                  <td className="border-b px-4 py-2">
                    ${item.price.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="text-lg">
                <td colSpan={3} className="px-4 py-2 ">
                  Total
                </td>
                <td className="px-4 py-2 ">{totalQty}</td>
                <td className="px-4 py-2 ">${totalPrice.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        ) : (
          <p className="text-gray-500">Your cart is empty.</p>
        )}
        <div className="flex justify-end mt-4 gap-2">
          <button className="modal-shop-btn" onClick={onClose}>
            Continue to Shopping
          </button>
          <button className="modal-checkout-btn" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CartModal;
