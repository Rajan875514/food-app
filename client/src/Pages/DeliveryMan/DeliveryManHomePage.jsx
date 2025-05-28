// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import OrderCard from "../../Components/Cards/OrderCard.jsx";
// import NoOrder from "../../Components/Order/NoOrder";
// import {
//     // Corrected the import name to match the export in orderSlice.js
//     getAllPrepredOrdersBydmId, // Changed from getAllPreparedOrdersBydmId
//     pushOrderToAllPrepredOrders, // Changed from pushOrderToAllPreparedOrders
// } from "../../Redux/Slices/orderSlice.js";
// import { socket } from "../../App.jsx"; // Assuming socket is initialized and exported from App.jsx

// const DeliveryManHomePage = () => {
//     const dispatch = useDispatch();
//     const { role, data } = useSelector((state) => state.auth);

//     // Ensure you are using the correct state property name from Redux
//     // It's 'AllPrepredOrders' in your slice's initialState and reducers
//     const { AllPrepredOrders } = useSelector((state) => state?.order); // Changed from AllPreparedOrders

//     useEffect(() => {
//         // Ensure the socket is connected before listening
//         if (!socket.connected) {
//             socket.connect(); // Reconnect if disconnected
//         }

//         socket.on("orderPrepared", (orderData) => { // Renamed 'data' to 'orderData' to avoid conflict with 'data' from useSelector
//             console.log("Received orderPrepared event:", orderData);
//             const { order, deliverymanId } = orderData; // Destructure order and deliverymanId from orderData
//             // Use data._id from useSelector for the current user's ID
//             if (deliverymanId === data._id) {
//                 console.log("This order is for me:", order);
//                 dispatch(pushOrderToAllPrepredOrders(order)); // Use the corrected action name
//             }
//         });

//         return () => {
//             // Only disconnect the socket here if it's managed *only* by this component.
//             // If it's a global socket (initialized in App.jsx), do not disconnect here.
//             // It's generally better to remove specific listeners if the socket is global.
//             socket.off("orderPrepared"); // Remove the specific listener
//             // If socket is truly global and you only want to disconnect when the whole app unmounts,
//             // remove the line below:
//             // socket.disconnect();
//         };
//     }, [dispatch, data._id, socket]); // Added socket to dependencies

//     useEffect(() => {
//         const fetchData = async () => {
//             // Use the corrected action name
//             await dispatch(getAllPrepredOrdersBydmId(data._id));
//         };
//         fetchData();
//     }, [dispatch, data._id]);

//     return (
//         <div>
//             <div className="text-2xl text-center mt-5 border border-black-2 bg-red-100">
//                 Prepared Orders by your Selected Restaurants
//             </div>
//             <div>
//                 <div>
//                     {AllPrepredOrders?.length !== 0 ? ( // Use the corrected state property name
//                         <div className="flex flex-col gap-10 m-10">
//                             {AllPrepredOrders?.map((order) => ( // Use the corrected state property name
//                                 <OrderCard key={order?._id} order={order} />
//                             )).reverse()}
//                         </div>
//                     ) : (
//                         <NoOrder order="Prepared" />
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DeliveryManHomePage;
















import React from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const TrackOrder = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const currentOrders = useSelector((state) => state.order.currentOrders);

  const order = currentOrders.find((o) => o._id === orderId);

  if (!order) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-bold mb-4">Order Not Found</h2>
          <p className="text-gray-600 mb-6">
            The order you're trying to track could not be found.
          </p>
          <button
            onClick={() => navigate("/my-orders")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Go to My Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">Track Your Order</h2>
        <div className="space-y-4">
          <p>
            <strong>Order ID:</strong> {order._id}
          </p>
          <p>
            <strong>Status:</strong> {order.orderStatus}
          </p>
          <p>
            <strong>Restaurant:</strong> {order.restaurant.name}
          </p>
          <p>
            <strong>Total:</strong> ₹{order.orderTotal}
          </p>
          <h3 className="text-lg font-semibold">Items:</h3>
          <ul className="divide-y divide-gray-200">
            {order.items.map((item, index) => (
              <li key={index} className="py-2">
                {item.name} - Quantity: {item.quantity} - ₹{item.price}
              </li>
            ))}
          </ul>
          <button
            onClick={() => navigate("/my-orders")}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Back to My Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;