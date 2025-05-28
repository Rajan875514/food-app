




























// // import React, { useEffect } from "react";
// // import { Route, Routes } from "react-router-dom";
// // import { io } from "socket.io-client";

// // // Pages
// // import HomePage from "./Pages/HomePage";
// // import NotFoundPage from "./Pages/NotFoundPage";
// // import SignUp from "./Pages/User/SignUp";
// // import Login from "./Pages/User/Login";
// // import ForgotPassword from "./Pages/Password/ForgotPassword";
// // import ResetPassword from "./Pages/Password/ResetPassword";
// // import ChangePassword from "./Pages/Password/ChangePassword";
// // import Profile from "./Pages/User/Profile";
// // import Cart from "./Pages/User/Cart";
// // import MyOrder from "./Pages/User/MyOrder";
// // import AboutUs from "./Pages/AboutUs";

// // // Restaurant
// // import RestaurantList from "./Pages/Restaurant/RestaurantList";
// // import RestaurantDetails from "./Pages/Restaurant/RestaurantDetails"
// // import CreateRestaurant from "./Pages/Restaurant/CreateRestaurant";
// // import SelectRestaurant from "./Pages/Restaurant/SelectRestarant";

// // // Payment
// // import PaymentSuccess from "./Pages/Payment/PaymentSuccess";
// // import PaymentFail from "./Pages/Payment/PaymentFail";

// // // Auth Middleware
// // import RequireAuth from "./Components/Auth/RequireAuth";

// // // Initialize socket
// // export const socket = io("http://localhost:5000/");

// // const App = () => {
// //   useEffect(() => {
// //     socket.on("connect", () => {
// //       console.log(socket.id, "connected");
// //     });

// //     return () => {
// //       socket.disconnect();
// //     };
// //   }, []);

// //   return (
// //     <Routes>
// //       {/* Public Routes */}
// //       <Route path="/" element={<HomePage />} />
// //       <Route path="/about" element={<AboutUs />} />
// //       <Route path="/signup" element={<SignUp />} />
// //       <Route path="/login" element={<Login />} />
// //       <Route path="/forgotPassword" element={<ForgotPassword />} />
// //       <Route path="/password/reset/:token" element={<ResetPassword />} />
// //       <Route path="/restaurant" element={<RestaurantList />} />
// //       <Route path="/restaurant/details" element={<RestaurantDetails />} />
// //       <Route path="/cart" element={<Cart />} />
// //       <Route path="/select/Restaurants" element={<SelectRestaurant />} />

// //       {/* Customer-only Routes */}
// //       <Route element={<RequireAuth allowedRoles={["Customer"]} />}>
// //         <Route path="/payment/success" element={<PaymentSuccess />} />
// //         <Route path="/payment/fail" element={<PaymentFail />} />
// //       </Route>

// //       {/* Authenticated Routes for all roles */}
// //       <Route element={<RequireAuth allowedRoles={["Restaurant", "DeliveryMan", "Customer"]} />}>
// //         <Route path="/changePassword" element={<ChangePassword />} />
// //         <Route path="/profile" element={<Profile />} />
// //         <Route path="/myorder" element={<MyOrder />} />
// //       </Route>

// //       {/* Restaurant-only Routes */}
// //       <Route element={<RequireAuth allowedRoles={["Restaurant"]} />}>
// //         <Route path="/create/Restaurant" element={<CreateRestaurant />} />
// //       </Route>

// //       {/* Fallback Route */}
// //       <Route path="*" element={<NotFoundPage />} />
// //     </Routes>
// //   );
// // };

// // export default App;







// import React, { useEffect } from "react";
// import { Route, Routes } from "react-router-dom";
// import { io } from "socket.io-client";

// // Pages
// import HomePage from "./Pages/HomePage";
// import NotFoundPage from "./Pages/NotFoundPage";
// import SignUp from "./Pages/User/SignUp";
// import Login from "./Pages/User/Login";
// import ForgotPassword from "./Pages/Password/ForgotPassword";
// import ResetPassword from "./Pages/Password/ResetPassword";
// import ChangePassword from "./Pages/Password/ChangePassword";
// import Profile from "./Pages/User/Profile";
// import Cart from "./Pages/User/Cart";
// import MyOrder from "./Pages/User/MyOrder";
// import AboutUs from "./Pages/AboutUs";

// // Restaurant
// import RestaurantList from "./Pages/Restaurant/RestaurantList";
// import RestaurantDetails from "./Pages/Restaurant/RestaurantDetails";
// import CreateRestaurant from "./Pages/Restaurant/CreateRestaurant";
// import SelectRestaurant from "./Pages/Restaurant/SelectRestarant";

// // Payment
// import PaymentSuccess from "./Pages/Payment/PaymentSuccess";
// import PaymentFail from "./Pages/Payment/PaymentFail";

// // Auth Middleware
// import RequireAuth from "./Components/Auth/RequireAuth";

// // Initialize socket
// export const socket = io("http://localhost:5000/");

// const App = () => {
//   useEffect(() => {
//     socket.on("connect", () => {
//       console.log(socket.id, "connected");
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   return (
//     <Routes>
//       {/* Public Routes */}
//       <Route path="/" element={<HomePage />} />
//       <Route path="/about" element={<AboutUs />} />
//       <Route path="/signup" element={<SignUp />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/forgotPassword" element={<ForgotPassword />} />
//       <Route path="/password/reset/:token" element={<ResetPassword />} />
//       <Route path="/restaurant" element={<RestaurantList />} />
//       <Route path="/restaurant/details" element={<RestaurantDetails />} />
//       <Route path="/cart" element={<Cart />} />
//       <Route path="/select/Restaurants" element={<SelectRestaurant />} />

//       {/* Customer-only Routes */}
//       <Route element={<RequireAuth allowedRoles={["Customer"]} />}>
//         <Route path="/order/success" element={<PaymentSuccess />} />
//         <Route path="/order/fail" element={<PaymentFail />} />
//       </Route>

//       {/* Authenticated Routes for all roles */}
//       <Route element={<RequireAuth allowedRoles={["Restaurant", "DeliveryMan", "Customer"]} />}>
//         <Route path="/changePassword" element={<ChangePassword />} />
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/myorder" element={<MyOrder />} />
//       </Route>

//       {/* Restaurant-only Routes */}
//       <Route element={<RequireAuth allowedRoles={["Restaurant"]} />}>
//         <Route path="/create/Restaurant" element={<CreateRestaurant />} />
//       </Route>

//       {/* Fallback Route */}
//       <Route path="*" element={<NotFoundPage />} />
//     </Routes>
//   );
// };

// export default App;























import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { NewCurrentOrder } from "./Redux/Slices/orderSlice"; // Adjust path as needed

// Pages
import HomePage from "./Pages/HomePage";
import NotFoundPage from "./Pages/NotFoundPage";
import SignUp from "./Pages/User/SignUp";
import Login from "./Pages/User/Login";
import ForgotPassword from "./Pages/Password/ForgotPassword";
import ResetPassword from "./Pages/Password/ResetPassword";
import ChangePassword from "./Pages/Password/ChangePassword";
import Profile from "./Pages/User/Profile";
import Cart from "./Pages/User/Cart";
import MyOrder from "./Pages/User/MyOrder";
import AboutUs from "./Pages/AboutUs";

// Restaurant
import RestaurantList from "./Pages/Restaurant/RestaurantList";
import RestaurantDetails from "./Pages/Restaurant/RestaurantDetails";
import CreateRestaurant from "./Pages/Restaurant/CreateRestaurant";
import SelectRestaurant from "./Pages/Restaurant/SelectRestarant";

// Payment
import PaymentSuccess from "./Pages/Payment/PaymentSuccess";
import PaymentFail from "./Pages/Payment/PaymentFail";

// Auth Middleware
import RequireAuth from "./Components/Auth/RequireAuth";

// Initialize socket
export const socket = io("http://localhost:5000/");

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id, "connected");
    });

    // Listen for the "orderPlaced" event
    socket.on("orderPlaced", (data) => {
      console.log("New order received:", data);
      // Add the new order to the Redux store
      dispatch(NewCurrentOrder(data.newOrder));
    });

    // Clean up on unmount
    return () => {
      socket.off("connect");
      socket.off("orderPlaced");
      socket.disconnect();
    };
  }, [dispatch]);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route path="/password/reset/:token" element={<ResetPassword />} />
      <Route path="/restaurant" element={<RestaurantList />} />
      <Route path="/restaurant/details" element={<RestaurantDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/select/Restaurants" element={<SelectRestaurant />} />

      {/* Customer-only Routes */}
      <Route element={<RequireAuth allowedRoles={["Customer"]} />}>
        <Route path="/order/success" element={<PaymentSuccess />} />
        <Route path="/order/fail" element={<PaymentFail />} />
      </Route>

      {/* Authenticated Routes for all roles */}
      <Route element={<RequireAuth allowedRoles={["Restaurant", "DeliveryMan", "Customer"]} />}>
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/myorder" element={<MyOrder />} />
      </Route>

      {/* Restaurant-only Routes */}
      <Route element={<RequireAuth allowedRoles={["Restaurant"]} />}>
        <Route path="/create/Restaurant" element={<CreateRestaurant />} />
      </Route>

      {/* Fallback Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;