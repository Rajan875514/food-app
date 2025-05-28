// src/Components/Cards/CartDetails.jsx

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { placeorder } from "../../Redux/Slices/orderSlice";
import { clearCart } from "../../Redux/Slices/cartSlice";
import { motion } from "framer-motion";

const CartDetails = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { totalBill } = useSelector((state) => state.cart);
  const { isLoggedIn, role } = useSelector((state) => state.auth);

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const makePayment = async (event) => {
    event.preventDefault();
    const resId = cartItems.length > 0 ? cartItems?.[0]?.restaurant?.resId : null;
    if (!resId) {
      alert("Your cart is empty or the restaurant information is missing.");
      return;
    }

    try {
      setIsPlacingOrder(true);
      await dispatch(placeorder([resId, cartItems])).unwrap();
      alert("Order placed successfully!");
      dispatch(clearCart());
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Failed to place order. Try again.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const clearCartHandler = (e) => {
    e.preventDefault();
    dispatch(clearCart());
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        delayChildren: 0.2,
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  return (
    <motion.section
      aria-labelledby="summary-heading"
      className="mt-16 shadow-xl w-96 m-10 flex-col rounded-md lg:col-span-4 lg:mt-0 lg:p-0"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        className="bg-red-500 p-2 flex items-center justify-center bg-red gap-1 rounded-md hover:bg-red-400 text-white"
        onClick={clearCartHandler}
      >
        Clear Cart
      </motion.button>

      <h2
        id="summary-heading"
        className="border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4"
      >
        Price Details
      </h2>

      <div>
        <dl className="space-y-1 px-2 py-4">
          <motion.div className="flex items-center justify-between" variants={itemVariants}>
            <dt className="text-sm text-gray-800">Price ({cartItems?.length} item)</dt>
            <dd className="text-sm font-medium text-gray-900">₹ {totalBill}</dd>
          </motion.div>

          <motion.div className="flex items-center justify-between py-4" variants={itemVariants}>
            <dt className="text-sm text-gray-800">Delivery Charges</dt>
            <dd className="text-sm font-medium text-green-700">Free</dd>
          </motion.div>

          <motion.div className="flex items-center justify-between border-y border-dashed py-4" variants={itemVariants}>
            <dt className="text-base font-medium text-gray-900">Total Amount</dt>
            <dd className="text-base font-medium text-gray-900">₹ {totalBill}</dd>
          </motion.div>
        </dl>

        {isLoggedIn && role === "Customer" && cartItems?.length > 0 && cartItems?.[0]?.restaurant?.resId && (
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            disabled={isPlacingOrder}
            onClick={makePayment}
            className={`w-full py-2 rounded-md font-medium text-white ${
              isPlacingOrder ? "bg-gray-400 cursor-not-allowed" : "bg-green-500"
            }`}
          >
            {isPlacingOrder ? "Placing Order..." : "ORDER NOW"}
          </motion.button>
        )}

        {!isLoggedIn && (
          <p className="text-center py-2 text-gray-600">Please log in to place your order.</p>
        )}
        {isLoggedIn && role !== "Customer" && (
          <p className="text-center py-2 text-gray-600">Only customers can place orders.</p>
        )}
        {cartItems?.length === 0 && (
          <p className="text-center py-4 text-gray-700">Your cart is currently empty.</p>
        )}
        {isLoggedIn &&
          role === "Customer" &&
          cartItems?.length > 0 &&
          !cartItems?.[0]?.restaurant?.resId && (
            <p className="text-center py-4 text-red-600">
              Restaurant information is missing. Please go back to the restaurant menu.
            </p>
          )}
      </div>
    </motion.section>
  );
};

export default CartDetails;
