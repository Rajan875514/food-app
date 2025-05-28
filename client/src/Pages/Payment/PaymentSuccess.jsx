

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useLocation, useNavigate } from "react-router-dom";
// import { clearCart } from "../../Redux/Slices/cartSlice";
// import { orderSuccess } from "../../Redux/Slices/orderSlice";

// const PaymentSuccess = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const sessionId = queryParams.get("sessionId");

//   const { cartItems } = useSelector((state) => state?.cart);

//   useEffect(() => {
//     async function verifyPayment() {
//       try {
//         const restaurantId = cartItems[0]?.restaurant?.resId;
//         const res = await dispatch(
//           orderSuccess({ restaurantId, sessionId, items: cartItems })
//         );

//         if (res?.payload?.success) {
//           dispatch(clearCart());
//         }
//         console.log("Payment Success Response:", res);
//       } catch (error) {
//         console.error("Payment verification failed:", error);
//       }
//     }

//     if (sessionId && cartItems.length > 0) {
//       verifyPayment();
//     }
//   }, [sessionId]);

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <div className="p-8 bg-white shadow-md rounded-md text-center">
//         <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
//         <p className="text-gray-600">
//           Thank you for your order. Your payment was successful.
//         </p>
//         <div className="mt-8">
//           <button
//             onClick={() => navigate("/")}
//             className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4"
//           >
//             Continue Shopping
//           </button>
//           <button
//             onClick={() => navigate("/myorder")}
//             className="bg-green-500 text-white px-4 py-2 rounded-md"
//           >
//             Trace Your Order
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentSuccess;
























// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useLocation, useNavigate } from "react-router-dom";
// import { clearCart } from "../../Redux/Slices/cartSlice";
// import { orderSuccess } from "../../Redux/Slices/orderSlice";

// const PaymentSuccess = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const sessionId = queryParams.get("sessionId");

//   // Keep cartItems if you need them for the 'items' payload,
//   // but do NOT rely on them for restaurantId after redirect
//   const { cartItems } = useSelector((state) => state?.cart);

//   useEffect(() => {
//     async function verifyPayment() {
//       try {
//         // Retrieve restaurantId directly from localStorage
//         const storedRestaurantId = localStorage.getItem("restaurantId"); //

//         if (!storedRestaurantId) {
//           console.error("Restaurant ID not found in localStorage.");
//           // Handle this case, maybe redirect to home or an error page
//           toast.error("Restaurant information missing for payment verification.");
//           navigate("/"); // Example: Redirect to home
//           return;
//         }

//         const res = await dispatch(
//           orderSuccess({
//             restaurantId: storedRestaurantId, // Use the ID from localStorage
//             sessionId,
//             items: cartItems // Use cartItems from Redux, it should be populated if page didn't fully unmount, or use localStorage if it was cleared
//           })
//         );

//         if (res?.payload?.success) {
//           dispatch(clearCart());
//           // Also, clear the localStorage items related to the order now that it's processed
//           localStorage.removeItem("cartItems"); //
//           localStorage.removeItem("restaurantId"); //
//         }
//         console.log("Payment Success Response:", res);
//       } catch (error) {
//         console.error("Payment verification failed:", error);
//       }
//     }

//     // Only proceed if sessionId is present and cartItems are available (or retrieved from localStorage for items)
//     // For `items`, if you previously stored them in localStorage in `placeorder`, retrieve them here too if `cartItems` might be empty.
//     // Given your `placeorder` also stores `cartItems` in localStorage, you might want to retrieve both here.
//     const storedCartItems = JSON.parse(localStorage.getItem('cartItems')); //

//     if (sessionId && storedCartItems && storedCartItems.length > 0) { // Check storedCartItems
//         verifyPayment();
//     } else if (sessionId) {
//         // If sessionId is present but cartItems aren't (e.g., page refresh after initial dispatch)
//         // You might want to handle this gracefully or prompt the user to re-order.
//         console.warn("Session ID present but cart items not found. Payment might have already been processed or data lost.");
//         // Consider dispatching orderSuccess with just sessionId and restaurantId if `items` are not strictly needed for verification by backend (though your backend expects them).
//         // If `items` are mandatory for `handleSuccessfulPayment`, you MUST retrieve them from localStorage here.
//         // For now, let's assume `items` are retrieved from Redux store, but if that causes issues after refresh, switch to localStorage for items too.
//     }


//   }, [sessionId, dispatch, navigate, cartItems]); // Add cartItems to dependency array if you use it

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <div className="p-8 bg-white shadow-md rounded-md text-center">
//         <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
//         <p className="text-gray-600">
//           Thank you for your order. Your payment was successful.
//         </p>
//         <div className="mt-8">
//           <button
//             onClick={() => navigate("/")}
//             className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4"
//           >
//             Continue Shopping
//           </button>
//           <button
//             onClick={() => navigate("/myorder")}
//             className="bg-green-500 text-white px-4 py-2 rounded-md"
//           >
//             Trace Your Order
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentSuccess;











import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { clearCart } from "../../Redux/Slices/cartSlice";
import { orderSuccess } from "../../Redux/Slices/orderSlice";
import toast from "react-hot-toast"; // Import toast

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get("sessionId");

  useEffect(() => {
    async function verifyPayment() {
      try {
        const storedRestaurantId = localStorage.getItem("restaurantId");
        if (!storedRestaurantId) {
          console.error("Restaurant ID not found in localStorage.");
          toast.error("Restaurant information missing for payment verification.");
          navigate("/");
          return;
        }

        const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
        console.log("Session ID:", sessionId); // Debug log
        console.log("Stored Cart Items:", storedCartItems); // Debug log

        if (!storedCartItems || storedCartItems.length === 0) {
          toast.error("Cart items missing for order verification.");
          navigate("/myorder");
          return;
        }

        const res = await dispatch(
          orderSuccess({
            restaurantId: storedRestaurantId,
            sessionId,
            items: storedCartItems, // Use storedCartItems instead of Redux cartItems
          })
        );

        console.log("Order Success Response:", res); // Debug log

        if (res?.payload?.success) {
          dispatch(clearCart());
          localStorage.removeItem("cartItems");
          localStorage.removeItem("restaurantId");
          toast.success("Order placed successfully!");
        } else {
          toast.error("Failed to verify payment.");
        }
      } catch (error) {
        console.error("Payment verification failed:", error);
        toast.error("Error verifying payment.");
      }
    }

    if (sessionId) {
      verifyPayment();
    } else {
      toast.error("Payment session ID missing.");
      navigate("/");
    }
  }, [sessionId, dispatch, navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-md rounded-md text-center">
        <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-gray-600">
          Thank you for your order. Your payment was successful.
        </p>
        <div className="mt-8">
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => navigate("/myorder")}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Trace Your Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;