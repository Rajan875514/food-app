// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axiosInstance from "../../Helpers/axiosInstance";
// import toast from "react-hot-toast";
// import { STRIPE_Publishable_key } from "../../utlish/clientCofig";
// import { loadStripe } from "@stripe/stripe-js";

// const initialState = {
//   currentOrders: [],
//   pastOrders: [],
//   preparedOrders: [],
//   AllPrepredOrders: [],
// };


// //=============================================================================================

// // export const placeorder = createAsyncThunk(
// //   "/placeorder",
// //   async ([resId, cartItems]) => {
// //     const loadingMessage = toast.loading("Please wait! Placing your order...");
// //     try {
// //       const stripe = await loadStripe(STRIPE_Publishable_key);

// //       // Persist cartItems and resId in localStorage for use after redirect
// //       localStorage.setItem("cartItems", JSON.stringify(cartItems));
// //       localStorage.setItem("restaurantId", resId);

// //       const session = await axiosInstance.post(`/order/placeorder/${resId}`, {
// //         items: cartItems,
// //       });

// //       const result = await stripe.redirectToCheckout({
// //         sessionId: session.data.data.paymentSessionId,
// //       });

// //       return result;
// //     } catch (error) {
// //       toast.error(error?.response?.data?.error || "Failed to initiate payment", { id: loadingMessage });
// //       throw error;
// //     }
// //   }
// // );


// // export const placeorder = createAsyncThunk(
// //   "/placeorder",
// //   async ([resId, cartItems]) => {
// //     const loadingMessage = toast.loading("Please wait! Placing your order...");
// //     try {
// //       const stripe = await loadStripe(STRIPE_Publishable_key);

// //       // Persist cartItems and resId in localStorage for use after redirect
// //       localStorage.setItem("cartItems", JSON.stringify(cartItems));
// //       localStorage.setItem("restaurantId", resId);

// //       const session = await axiosInstance.post(`/order/placeorder/${resId}`, {
// //         items: cartItems,
// //       });

// //       const result = await stripe.redirectToCheckout({
// //         sessionId: session.data.data.paymentSessionId,
// //       });

// //       return result;
// //     } catch (error) {
// //       toast.error(error?.response?.data?.error || "Failed to initiate payment", { id: loadingMessage });
// //       throw error;
// //     }
// //   }
// // );

// export const placeorder = createAsyncThunk(
//   "/placeorder",
//   async ([resId, cartItems]) => {
//     const loadingMessage = toast.loading("Please wait! Placing your order...");
//     try {
//       const stripe = await loadStripe(STRIPE_Publishable_key);

//       // Persist cartItems and resId in localStorage for use after redirect
//       localStorage.setItem("cartItems", JSON.stringify(cartItems));
//       localStorage.setItem("restaurantId", resId);

//       const session = await axiosInstance.post(`/order/placeorder/${resId}`, {
//         items: cartItems,
//       });

//       const result = await stripe.redirectToCheckout({
//         sessionId: session.data.data.paymentSessionId,
//       });

//       return result;
//     } catch (error) {
//       toast.error(error?.response?.data?.error || "Failed to initiate payment", { id: loadingMessage });
//       throw error;
//     }
//   }
// );
// //==================================================================================

// export const orderSuccess = createAsyncThunk(
//   "order/orderSuccess",
//   async ({ restaurantId, sessionId, items }, { rejectWithValue }) => {
//     const loadingMessage = toast.loading("Please wait! Verifying payment...");
//     try {
//       console.log("Calling /order/handle-success-response with:", { restaurantId, sessionId, items });
//       const res = await axiosInstance.post(
//         `/order/handle-success-response/${restaurantId}?sessionId=${sessionId}`,
//         { items }
//       );
//       console.log("Response from /order/handle-success-response:", res.data);
//       toast.success(res.data.message, { id: loadingMessage });
//       return res.data;
//     } catch (error) {
//       console.error("Error in orderSuccess:", error.response?.data || error);
//       toast.error(error?.response?.data?.error || "Payment verification failed", { id: loadingMessage });
//       return rejectWithValue(error.response?.data || { error: "Payment verification failed" });
//     }
//   }
// );


// //================================================================================================

// export const changePaymentStatus = createAsyncThunk(
//   "/paymentStatus",
//   async (orderID) => {
//     const loadingMessage = toast.loading("Please wait! Changing payment status...");
//     try {
//       const res = await axiosInstance.put(`/order/handle-payment-response/${orderID}`);
//       toast.success("Payment status updated", { id: loadingMessage });
//       return res?.data;
//     } catch (error) {
//       toast.error(error?.response?.data?.error || "Failed to update payment status", { id: loadingMessage });
//       throw error;
//     }
//   }
// );





// //====================================================================================================

// // export const getCurrentOrders = createAsyncThunk("/currentOrder", async () => {
// //   const loadingMessage = toast.loading("Please wait! Fetching your current orders...");
// //   try {
// //     const res = await axiosInstance.get("/order/current");
// //     toast.success(res?.data?.message, { id: loadingMessage });
// //     return res?.data;
// //   } catch (error) {
// //     toast.error(error?.response?.data?.error || "Failed to fetch current orders", { id: loadingMessage });
// //     throw error;
// //   }
// // });

// export const getCurrentOrders = createAsyncThunk("/currentOrder", async (_, { rejectWithValue }) => {
//   const loadingMessage = toast.loading("Please wait! Fetching your current orders...");
//   try {
//     const res = await axiosInstance.get("/order/current");
//     toast.success(res?.data?.message, { id: loadingMessage });
//     return res?.data;
//   } catch (error) {
//     toast.error(error?.response?.data?.error || "Failed to fetch current orders", { id: loadingMessage });
//     if (error?.response?.data?.error === "Customer Not Found") {
//       window.location.href = "/login"; // Redirect to login if customer not found
//     }
//     return rejectWithValue(error?.response?.data || { error: "Failed to fetch current orders" });
//   }
// });

// //==================================================================================================

// export const getPastOrders = createAsyncThunk("/pastOrders", async () => {
//   const loadingMessage = toast.loading("Please wait! Fetching your past orders...");
//   try {
//     const res = await axiosInstance.get("/order/past");
//     toast.success("Past orders fetched", { id: loadingMessage });
//     return res?.data;
//   } catch (error) {
//     toast.error(error?.response?.data?.error || "Failed to fetch past orders", { id: loadingMessage });
//     throw error;
//   }
// });


// //=============================================================================================

// export const updateOrderStatus = createAsyncThunk(
//   "/update/orderStatus",
//   async ([orderId, orderStatus]) => {
//     const loadingMessage = toast.loading("Please wait! Updating order status...");
//     try {
//       const res = await axiosInstance.put(`/order/update/${orderId}`, {
//         orderStatus: orderStatus,
//       });
//       toast.success("Order status updated", { id: loadingMessage });
//       return res?.data;
//     } catch (error) {
//       toast.error(error?.response?.data?.error || "Failed to update order status", { id: loadingMessage });
//       throw error;
//     }
//   }
// );

// //=============================================================================================


// export const getPreparedOrders = createAsyncThunk(
//   "/preparedOrder",
//   async () => {
//     const loadingMessage = toast.loading("Please wait! Fetching your prepared orders...");
//     try {
//       const res = await axiosInstance.get("/order/prepared");
//       toast.success("Prepared orders fetched", { id: loadingMessage });
//       return res?.data;
//     } catch (error) {
//       toast.error(error?.response?.data?.error || "Failed to fetch prepared orders", { id: loadingMessage });
//       throw error;
//     }
//   }
// );

// //=================================================================================================

// export const pickOrder = createAsyncThunk("/pickOrder", async (orderId) => {
//   const loadingMessage = toast.loading("Please wait! Picking order...");
//   try {
//     const res = await axiosInstance.put(`/order/pick/${orderId}`);
//     toast.success(res?.data?.message, { id: loadingMessage });
//     return res?.data;
//   } catch (error) {
//     toast.error(error?.response?.data?.error || "Failed to pick order", { id: loadingMessage });
//     throw error;
//   }
// });

// //============================================================================================

// export const completeOrder = createAsyncThunk(
//   "/completeOrder",
//   async ([orderId, OTP]) => {
//     const loadingMessage = toast.loading("Please wait! Completing order...");
//     try {
//       const res = await axiosInstance.put(`/order/verify/${orderId}`, { OTP });
//       toast.success(res?.data?.message, { id: loadingMessage });
//       return res?.data;
//     } catch (error) {
//       toast.error(error?.response?.data?.error || "Failed to complete order", { id: loadingMessage });
//       throw error;
//     }
//   }
// );


// //==========================================================================================

// export const cancelOrder = createAsyncThunk("/cancelOrder", async (orderId) => {
//   const loadingMessage = toast.loading("Please wait! Canceling order...");
//   try {
//     const res = await axiosInstance.put(`/order/cancel/${orderId}`);
//     toast.success(res?.data?.message, { id: loadingMessage });
//     return res?.data;
//   } catch (error) {
//     toast.error(error?.response?.data?.error || "Failed to cancel order", { id: loadingMessage });
//     throw error;
//   }
// });

// //========================================================================================

// export const getOrderDistance = createAsyncThunk(
//   "/getOrderDistance",
//   async () => {
//     const loadingMessage = toast.loading("Please wait! Fetching order distance...");
//     try {
//       const res = await axiosInstance.get(`/order/location`);
//       toast.success("Order distance fetched", { id: loadingMessage });
//       return res?.data;
//     } catch (error) {
//       toast.error(error?.response?.data?.error || "Failed to fetch order distance", { id: loadingMessage });
//       throw error;
//     }
//   }
// );

// //============================================================================================

// export const getAllPrepredOrdersBydmId = createAsyncThunk(
//   "/PrepredOrders",
//   async (deliveryManId) => {
//     const loadingMessage = toast.loading("Wait! Getting prepared orders...");
//     try {
//       const res = await axiosInstance.get(`/order/currentOrders/${deliveryManId}`);
//       toast.success(res?.data?.message, { id: loadingMessage });
//       return res?.data;
//     } catch (error) {
//       toast.error(error?.response?.data?.error || "Failed to fetch prepared orders", { id: loadingMessage });
//       throw error;
//     }
//   }
// );



// //==============================================================================

// const orderSlice = createSlice({
//   name: "order",
//   initialState,
//   reducers: {
//     NewCurrentOrder: (state, action) => {
//       state.currentOrders.push(action.payload);
//     },
//     removeFromPreOrder: (state, action) => {
//       const orderId = action.payload;
//       state.AllPrepredOrders = state?.AllPrepredOrders?.filter((order) => order._id !== orderId);
//     },
//     removeFromCurrentOrder: (state, action) => {
//       const orderId = action.payload;
//       state.currentOrders = state?.currentOrders?.filter((order) => order._id !== orderId);
//     },
//     pushOrderToAllPrepredOrders: (state, action) => {
//       state?.AllPrepredOrders?.push(action.payload);
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(getCurrentOrders.fulfilled, (state, action) => {
//         state.currentOrders = action?.payload?.data || [];
//       })
//       .addCase(getCurrentOrders.rejected, (state) => {
//         state.currentOrders = [];
//       })
//       .addCase(getPreparedOrders.fulfilled, (state, action) => {
//         state.preparedOrders = action.payload.data || [];
//       })
//       .addCase(getPastOrders.fulfilled, (state, action) => {
//         state.pastOrders = action?.payload?.data || [];
//       })
//       .addCase(getAllPrepredOrdersBydmId.fulfilled, (state, action) => {
//         state.AllPrepredOrders = action?.payload?.data || [];
//       });
//   },
// });

// export const {
//   NewCurrentOrder,
//   removeFromPreOrder,
//   removeFromCurrentOrder,
//   pushOrderToAllPrepredOrders,
// } = orderSlice.actions;

// export default orderSlice.reducer;














// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axiosInstance from "../../Helpers/axiosInstance";
// import toast from "react-hot-toast";
// import { STRIPE_Publishable_key } from "../../utlish/clientCofig";
// import { loadStripe } from "@stripe/stripe-js";

// const initialState = {
//     currentOrders: [],
//     pastOrders: [],
//     preparedOrders: [],
//     AllPrepredOrders: [],
// };

// // PLACE ORDER
// export const placeorder = createAsyncThunk(
//     "/placeorder",
//     async ([resId, cartItems], { rejectWithValue }) => {
//         const loadingMessage = toast.loading("Please wait! Placing your order...");
//         try {
//             const stripe = await loadStripe(STRIPE_Publishable_key);

//             // Persist cartItems and resId in localStorage for use after redirect
//             localStorage.setItem("cartItems", JSON.stringify(cartItems));
//             localStorage.setItem("restaurantId", resId);

//             const session = await axiosInstance.post(`/order/placeorder/${resId}`, {
//                 items: cartItems,
//             });

//             const result = await stripe.redirectToCheckout({
//                 sessionId: session.data.data.paymentSessionId,
//             });

//             if (result.error) {
//                 throw new Error(result.error.message);
//             }

//             return result;
//         } catch (error) {
//             console.error("Error in placeorder:", error.message);
//             toast.error(error?.response?.data?.error || "Failed to initiate payment", { id: loadingMessage });
//             return rejectWithValue(error?.response?.data || { error: "Failed to initiate payment" });
//         }
//     }
// );

// // ORDER SUCCESS (AFTER PAYMENT)
// export const orderSuccess = createAsyncThunk(
//     "order/orderSuccess",
//     async ({ restaurantId, sessionId, items }, { rejectWithValue }) => {
//         const loadingMessage = toast.loading("Please wait! Verifying payment...");
//         try {
//             console.log("Calling /order/handle-success-response with:", { restaurantId, sessionId, items });
//             const res = await axiosInstance.post(
//                 `/order/handle-success-response/${restaurantId}?sessionId=${sessionId}`,
//                 { items }
//             );
//             console.log("Response from /order/handle-success-response:", res.data);

//             // Clear persisted data from localStorage after successful order
//             localStorage.removeItem("cartItems");
//             localStorage.removeItem("restaurantId");

//             toast.success(res.data.message, { id: loadingMessage });
//             return res.data;
//         } catch (error) {
//             console.error("Error in orderSuccess:", error.response?.data || error);
//             toast.error(error?.response?.data?.error || "Payment verification failed", { id: loadingMessage });
//             return rejectWithValue(error.response?.data || { error: "Payment verification failed" });
//         }
//     }
// );

// // CHANGE PAYMENT STATUS
// export const changePaymentStatus = createAsyncThunk(
//     "/paymentStatus",
//     async (orderID, { rejectWithValue }) => {
//         const loadingMessage = toast.loading("Please wait! Changing payment status...");
//         try {
//             const res = await axiosInstance.put(`/order/handle-payment-response/${orderID}`);
//             toast.success("Payment status updated", { id: loadingMessage });
//             return res?.data;
//         } catch (error) {
//             console.error("Error in changePaymentStatus:", error.message);
//             toast.error(error?.response?.data?.error || "Failed to update payment status", { id: loadingMessage });
//             return rejectWithValue(error?.response?.data || { error: "Failed to update payment status" });
//         }
//     }
// );

// // GET CURRENT ORDERS
// export const getCurrentOrders = createAsyncThunk(
//     "/currentOrder",
//     async (_, { rejectWithValue }) => {
//         const loadingMessage = toast.loading("Please wait! Fetching your current orders...");
//         try {
//             const res = await axiosInstance.get("/order/current");
//             toast.success(res?.data?.message, { id: loadingMessage });
//             return res?.data;
//         } catch (error) {
//             console.error("Error in getCurrentOrders:", error.message);
//             toast.error(error?.response?.data?.error || "Failed to fetch current orders", { id: loadingMessage });
//             if (error?.response?.data?.error === "Customer Not Found") {
//                 window.location.href = "/login"; // Redirect to login if customer not found
//             }
//             return rejectWithValue(error?.response?.data || { error: "Failed to fetch current orders" });
//         }
//     }
// );

// // GET PAST ORDERS
// export const getPastOrders = createAsyncThunk(
//     "/pastOrders",
//     async (_, { rejectWithValue }) => {
//         const loadingMessage = toast.loading("Please wait! Fetching your past orders...");
//         try {
//             const res = await axiosInstance.get("/order/past");
//             toast.success("Past orders fetched", { id: loadingMessage });
//             return res?.data;
//         } catch (error) {
//             console.error("Error in getPastOrders:", error.message);
//             toast.error(error?.response?.data?.error || "Failed to fetch past orders", { id: loadingMessage });
//             return rejectWithValue(error?.response?.data || { error: "Failed to fetch past orders" });
//         }
//     }
// );

// // UPDATE ORDER STATUS
// export const updateOrderStatus = createAsyncThunk(
//     "/update/orderStatus",
//     async ([orderId, orderStatus], { rejectWithValue }) => {
//         const loadingMessage = toast.loading("Please wait! Updating order status...");
//         try {
//             const res = await axiosInstance.put(`/order/update/${orderId}`, {
//                 orderStatus: orderStatus,
//             });
//             toast.success("Order status updated", { id: loadingMessage });
//             return res?.data;
//         } catch (error) {
//             console.error("Error in updateOrderStatus:", error.message);
//             toast.error(error?.response?.data?.error || "Failed to update order status", { id: loadingMessage });
//             return rejectWithValue(error?.response?.data || { error: "Failed to update order status" });
//         }
//     }
// );

// // GET PREPARED ORDERS
// export const getPreparedOrders = createAsyncThunk(
//     "/preparedOrder",
//     async (_, { rejectWithValue }) => {
//         const loadingMessage = toast.loading("Please wait! Fetching your prepared orders...");
//         try {
//             const res = await axiosInstance.get("/order/prepared");
//             toast.success("Prepared orders fetched", { id: loadingMessage });
//             return res?.data;
//         } catch (error) {
//             console.error("Error in getPreparedOrders:", error.message);
//             toast.error(error?.response?.data?.error || "Failed to fetch prepared orders", { id: loadingMessage });
//             return rejectWithValue(error?.response?.data || { error: "Failed to fetch prepared orders" });
//         }
//     }
// );

// // PICK ORDER
// export const pickOrder = createAsyncThunk(
//     "/pickOrder",
//     async (orderId, { rejectWithValue }) => {
//         const loadingMessage = toast.loading("Please wait! Picking order...");
//         try {
//             const res = await axiosInstance.put(`/order/pick/${orderId}`);
//             toast.success(res?.data?.message, { id: loadingMessage });
//             return res?.data;
//         } catch (error) {
//             console.error("Error in pickOrder:", error.message);
//             toast.error(error?.response?.data?.error || "Failed to pick order", { id: loadingMessage });
//             return rejectWithValue(error?.response?.data || { error: "Failed to pick order" });
//         }
//     }
// );

// // COMPLETE ORDER
// export const completeOrder = createAsyncThunk(
//     "/completeOrder",
//     async ([orderId, OTP], { rejectWithValue }) => {
//         const loadingMessage = toast.loading("Please wait! Completing order...");
//         try {
//             const res = await axiosInstance.put(`/order/verify/${orderId}`, { OTP });
//             toast.success(res?.data?.message, { id: loadingMessage });
//             return res?.data;
//         } catch (error) {
//             console.error("Error in completeOrder:", error.message);
//             toast.error(error?.response?.data?.error || "Failed to complete order", { id: loadingMessage });
//             return rejectWithValue(error?.response?.data || { error: "Failed to complete order" });
//         }
//     }
// );

// // CANCEL ORDER
// export const cancelOrder = createAsyncThunk(
//     "/cancelOrder",
//     async (orderId, { rejectWithValue }) => {
//         const loadingMessage = toast.loading("Please wait! Canceling order...");
//         try {
//             const res = await axiosInstance.put(`/order/cancel/${orderId}`);
//             toast.success(res?.data?.message, { id: loadingMessage });
//             return res?.data;
//         } catch (error) {
//             console.error("Error in cancelOrder:", error.message);
//             toast.error(error?.response?.data?.error || "Failed to cancel order", { id: loadingMessage });
//             return rejectWithValue(error?.response?.data || { error: "Failed to cancel order" });
//         }
//     }
// );

// // GET ORDER DISTANCE
// export const getOrderDistance = createAsyncThunk(
//     "/getOrderDistance",
//     async ({ orderLocation, customerLocation }, { rejectWithValue }) => {
//         const loadingMessage = toast.loading("Please wait! Fetching order distance...");
//         try {
//             const res = await axiosInstance.post(`/order/location`, {
//                 orderLocation,
//                 customerLocation,
//             });
//             toast.success("Order distance fetched", { id: loadingMessage });
//             return res?.data;
//         } catch (error) {
//             console.error("Error in getOrderDistance:", error.message);
//             toast.error(error?.response?.data?.error || "Failed to fetch order distance", { id: loadingMessage });
//             return rejectWithValue(error?.response?.data || { error: "Failed to fetch order distance" });
//         }
//     }
// );

// // GET ALL PREPARED ORDERS BY DELIVERYMAN ID
// export const getAllPrepredOrdersBydmId = createAsyncThunk(
//     "/PrepredOrders",
//     async (deliveryManId, { rejectWithValue }) => {
//         const loadingMessage = toast.loading("Wait! Getting prepared orders...");
//         try {
//             const res = await axiosInstance.get(`/order/currentOrders/${deliveryManId}`);
//             toast.success(res?.data?.message, { id: loadingMessage });
//             return res?.data;
//         } catch (error) {
//             console.error("Error in getAllPrepredOrdersBydmId:", error.message);
//             toast.error(error?.response?.data?.error || "Failed to fetch prepared orders", { id: loadingMessage });
//             return rejectWithValue(error?.response?.data || { error: "Failed to fetch prepared orders" });
//         }
//     }
// );

// // ORDER SLICE
// const orderSlice = createSlice({
//     name: "order",
//     initialState,
//     reducers: {
//         NewCurrentOrder: (state, action) => {
//             state.currentOrders.push(action.payload);
//         },
//         removeFromPreOrder: (state, action) => {
//             const orderId = action.payload;
//             state.AllPrepredOrders = state?.AllPrepredOrders?.filter((order) => order._id !== orderId);
//         },
//         removeFromCurrentOrder: (state, action) => {
//             const orderId = action.payload;
//             state.currentOrders = state?.currentOrders?.filter((order) => order._id !== orderId);
//         },
//         pushOrderToAllPrepredOrders: (state, action) => {
//             state?.AllPrepredOrders?.push(action.payload);
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(getCurrentOrders.fulfilled, (state, action) => {
//                 state.currentOrders = action?.payload?.data || [];
//             })
//             .addCase(getCurrentOrders.rejected, (state) => {
//                 state.currentOrders = [];
//             })
//             .addCase(getPreparedOrders.fulfilled, (state, action) => {
//                 state.preparedOrders = action.payload.data || [];
//             })
//             .addCase(getPastOrders.fulfilled, (state, action) => {
//                 state.pastOrders = action?.payload?.data || [];
//             })
//             .addCase(getAllPrepredOrdersBydmId.fulfilled, (state, action) => {
//                 state.AllPrepredOrders = action?.payload?.data || [];
//             })
//             .addCase(orderSuccess.fulfilled, (state, action) => {
//                 // Optionally add the new order to currentOrders
//                 if (action.payload?.data?.order) {
//                     state.currentOrders.push(action.payload.data.order);
//                 }
//             });
//     },
// });

// export const {
//     NewCurrentOrder,
//     removeFromPreOrder,
//     removeFromCurrentOrder,
//     pushOrderToAllPrepredOrders,
// } = orderSlice.actions;

// export default orderSlice.reducer;














import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";
import { STRIPE_Publishable_key } from "../../utlish/clientCofig";
import { loadStripe } from "@stripe/stripe-js";

const initialState = {
    currentOrders: [],
    pastOrders: [],
    preparedOrders: [],
    AllPrepredOrders: [],
};

// PLACE ORDER
export const placeorder = createAsyncThunk(
    "/placeorder",
    async ([resId, cartItems], { rejectWithValue }) => {
        const loadingMessage = toast.loading("Please wait! Placing your order...");
        try {
            const stripe = await loadStripe(STRIPE_Publishable_key);

            // Persist cartItems and resId in localStorage for use after redirect
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
            localStorage.setItem("restaurantId", resId);

            const session = await axiosInstance.post(`/order/placeorder/${resId}`, {
                items: cartItems,
            });

            const result = await stripe.redirectToCheckout({
                sessionId: session.data.data.paymentSessionId,
            });

            if (result.error) {
                throw new Error(result.error.message);
            }

            return result;
        } catch (error) {
            console.error("Error in placeorder:", error.message);
            toast.error(error?.response?.data?.error || "Failed to initiate payment", { id: loadingMessage });
            return rejectWithValue(error?.response?.data || { error: "Failed to initiate payment" });
        }
    }
);

// ORDER SUCCESS (AFTER PAYMENT)
export const orderSuccess = createAsyncThunk(
    "order/orderSuccess",
    async ({ restaurantId, sessionId, items }, { rejectWithValue }) => {
        const loadingMessage = toast.loading("Please wait! Verifying payment...");
        try {
            console.log("Calling /order/handle-success-response with:", { restaurantId, sessionId, items });
            const res = await axiosInstance.post(
                `/order/handle-success-response/${restaurantId}?sessionId=${sessionId}`,
                { items }
            );
            console.log("Response from /order/handle-success-response:", res.data);

            // Clear persisted data from localStorage after successful order
            localStorage.removeItem("cartItems");
            localStorage.removeItem("restaurantId");

            toast.success(res.data.message, { id: loadingMessage });
            return res.data;
        } catch (error) {
            console.error("Error in orderSuccess:", error.response?.data || error);
            toast.error(error?.response?.data?.error || "Payment verification failed", { id: loadingMessage });
            return rejectWithValue(error.response?.data || { error: "Payment verification failed" });
        }
    }
);

// CHANGE PAYMENT STATUS
export const changePaymentStatus = createAsyncThunk(
    "/paymentStatus",
    async (orderID, { rejectWithValue }) => {
        const loadingMessage = toast.loading("Please wait! Changing payment status...");
        try {
            const res = await axiosInstance.put(`/order/handle-payment-response/${orderID}`);
            toast.success("Payment status updated", { id: loadingMessage });
            return res?.data;
        } catch (error) {
            console.error("Error in changePaymentStatus:", error.message);
            toast.error(error?.response?.data?.error || "Failed to update payment status", { id: loadingMessage });
            return rejectWithValue(error?.response?.data || { error: "Failed to update payment status" });
        }
    }
);

// GET CURRENT ORDERS
export const getCurrentOrders = createAsyncThunk(
    "/currentOrder",
    async (_, { rejectWithValue }) => {
        const loadingMessage = toast.loading("Please wait! Fetching your current orders...");
        try {
            const res = await axiosInstance.get("/order/current");
            toast.success(res?.data?.message, { id: loadingMessage });
            return res?.data;
        } catch (error) {
            console.error("Error in getCurrentOrders:", error.message);
            toast.error(error?.response?.data?.error || "Failed to fetch current orders", { id: loadingMessage });
            if (error?.response?.data?.error === "Customer Not Found") {
                window.location.href = "/login"; // Redirect to login if customer not found
            }
            return rejectWithValue(error?.response?.data || { error: "Failed to fetch current orders" });
        }
    }
);

// GET PAST ORDERS
export const getPastOrders = createAsyncThunk(
    "/pastOrders",
    async (_, { rejectWithValue }) => {
        const loadingMessage = toast.loading("Please wait! Fetching your past orders...");
        try {
            const res = await axiosInstance.get("/order/past");
            toast.success("Past orders fetched", { id: loadingMessage });
            return res?.data;
        } catch (error) {
            console.error("Error in getPastOrders:", error.message);
            toast.error(error?.response?.data?.error || "Failed to fetch past orders", { id: loadingMessage });
            return rejectWithValue(error?.response?.data || { error: "Failed to fetch past orders" });
        }
    }
);

// UPDATE ORDER STATUS
export const updateOrderStatus = createAsyncThunk(
    "/update/orderStatus",
    async ([orderId, orderStatus], { rejectWithValue }) => {
        const loadingMessage = toast.loading("Please wait! Updating order status...");
        try {
            const res = await axiosInstance.put(`/order/update/${orderId}`, {
                orderStatus: orderStatus,
            });
            toast.success("Order status updated", { id: loadingMessage });
            return res?.data;
        } catch (error) {
            console.error("Error in updateOrderStatus:", error.message);
            toast.error(error?.response?.data?.error || "Failed to update order status", { id: loadingMessage });
            return rejectWithValue(error?.response?.data || { error: "Failed to update order status" });
        }
    }
);

// GET PREPARED ORDERS
export const getPreparedOrders = createAsyncThunk(
    "/preparedOrder",
    async (_, { rejectWithValue }) => {
        const loadingMessage = toast.loading("Please wait! Fetching your prepared orders...");
        try {
            const res = await axiosInstance.get("/order/prepared");
            toast.success("Prepared orders fetched", { id: loadingMessage });
            return res?.data;
        } catch (error) {
            console.error("Error in getPreparedOrders:", error.message);
            toast.error(error?.response?.data?.error || "Failed to fetch prepared orders", { id: loadingMessage });
            return rejectWithValue(error?.response?.data || { error: "Failed to fetch prepared orders" });
        }
    }
);

// PICK ORDER
export const pickOrder = createAsyncThunk(
    "/pickOrder",
    async (orderId, { rejectWithValue }) => {
        const loadingMessage = toast.loading("Please wait! Picking order...");
        try {
            const res = await axiosInstance.put(`/order/pick/${orderId}`);
            toast.success(res?.data?.message, { id: loadingMessage });
            return res?.data;
        } catch (error) {
            console.error("Error in pickOrder:", error.message);
            toast.error(error?.response?.data?.error || "Failed to pick order", { id: loadingMessage });
            return rejectWithValue(error?.response?.data || { error: "Failed to pick order" });
        }
    }
);

// COMPLETE ORDER
export const completeOrder = createAsyncThunk(
    "/completeOrder",
    async ([orderId, OTP], { rejectWithValue }) => {
        const loadingMessage = toast.loading("Please wait! Completing order...");
        try {
            const res = await axiosInstance.put(`/order/verify/${orderId}`, { OTP });
            toast.success(res?.data?.message, { id: loadingMessage });
            return res?.data;
        } catch (error) {
            console.error("Error in completeOrder:", error.message);
            toast.error(error?.response?.data?.error || "Failed to complete order", { id: loadingMessage });
            return rejectWithValue(error?.response?.data || { error: "Failed to complete order" });
        }
    }
);

// CANCEL ORDER
export const cancelOrder = createAsyncThunk(
    "/cancelOrder",
    async (orderId, { rejectWithValue }) => {
        const loadingMessage = toast.loading("Please wait! Canceling order...");
        try {
            const res = await axiosInstance.put(`/order/cancel/${orderId}`);
            toast.success(res?.data?.message, { id: loadingMessage });
            return res?.data;
        } catch (error) {
            console.error("Error in cancelOrder:", error.message);
            toast.error(error?.response?.data?.error || "Failed to cancel order", { id: loadingMessage });
            return rejectWithValue(error?.response?.data || { error: "Failed to cancel order" });
        }
    }
);

// GET ORDER DISTANCE
export const getOrderDistance = createAsyncThunk(
    "/getOrderDistance",
    async ({ orderLocation, customerLocation }, { rejectWithValue }) => {
        const loadingMessage = toast.loading("Please wait! Fetching order distance...");
        try {
            const res = await axiosInstance.post(`/order/location`, {
                orderLocation,
                customerLocation,
            });
            toast.success("Order distance fetched", { id: loadingMessage });
            return res?.data;
        } catch (error) {
            console.error("Error in getOrderDistance:", error.message);
            toast.error(error?.response?.data?.error || "Failed to fetch order distance", { id: loadingMessage });
            return rejectWithValue(error?.response?.data || { error: "Failed to fetch order distance" });
        }
    }
);

// GET ALL PREPARED ORDERS BY DELIVERYMAN ID
export const getAllPrepredOrdersBydmId = createAsyncThunk(
    "/PrepredOrders",
    async (deliveryManId, { rejectWithValue }) => {
        const loadingMessage = toast.loading("Wait! Getting prepared orders...");
        try {
            const res = await axiosInstance.get(`/order/currentOrders/${deliveryManId}`);
            toast.success(res?.data?.message, { id: loadingMessage });
            return res?.data;
        } catch (error) {
            console.error("Error in getAllPrepredOrdersBydmId:", error.message);
            toast.error(error?.response?.data?.error || "Failed to fetch prepared orders", { id: loadingMessage });
            return rejectWithValue(error?.response?.data || { error: "Failed to fetch prepared orders" });
        }
    }
);

// ORDER SLICE
const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        NewCurrentOrder: (state, action) => {
            state.currentOrders.push(action.payload);
        },
        removeFromPreOrder: (state, action) => {
            const orderId = action.payload;
            state.AllPrepredOrders = state?.AllPrepredOrders?.filter((order) => order._id !== orderId);
        },
        removeFromCurrentOrder: (state, action) => {
            const orderId = action.payload;
            state.currentOrders = state?.currentOrders?.filter((order) => order._id !== orderId);
        },
        pushOrderToAllPrepredOrders: (state, action) => {
            state?.AllPrepredOrders?.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCurrentOrders.fulfilled, (state, action) => {
                state.currentOrders = action?.payload?.data || [];
            })
            .addCase(getCurrentOrders.rejected, (state) => {
                state.currentOrders = [];
            })
            .addCase(getPreparedOrders.fulfilled, (state, action) => {
                state.preparedOrders = action.payload.data || [];
            })
            .addCase(getPastOrders.fulfilled, (state, action) => {
                state.pastOrders = action?.payload?.data || [];
            })
            .addCase(getAllPrepredOrdersBydmId.fulfilled, (state, action) => {
                state.AllPrepredOrders = action?.payload?.data || [];
            })
            .addCase(orderSuccess.fulfilled, (state, action) => {
                // Optionally add the new order to currentOrders
                if (action.payload?.data?.order) {
                    state.currentOrders.push(action.payload.data.order);
                }
            });
    },
});

export const {
    NewCurrentOrder,
    removeFromPreOrder,
    removeFromCurrentOrder,
    pushOrderToAllPrepredOrders,
} = orderSlice.actions;

export default orderSlice.reducer;