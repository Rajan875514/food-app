

// const Order = require("../models/Order");
// const User = require("../models/User");
// const Restaurant = require("../models/Restaurant");
// const DeliveryMan = require("../models/DeliveryMan");
// const Customer = require("../models/Customer");
// const { getCoordinates } = require("../helpers/utils/getCoordinates");
// const { calculateDistance } = require("../helpers/utils/calculateDistance");
// const { sendEmailToGmail } = require("../helpers/mailer/mailer");
// const fs = require("fs");
// const path = require("path");
// const {
//     STRIPE_TEST_SECRET_KEY,
//     PAYMENT_SUCCESS_URL,
//     PAYMENT_FAIL_URL,
// } = require("../config/appConfig");
// const stripe = require("stripe")(STRIPE_TEST_SECRET_KEY);
// const { io } = require("../startup/io");

// // PLACE NEW ORDER
// //==============================================================================

// async function createOrder(req, res) {
//   try {
//     const { items } = req.body;
//     if (!items || !Array.isArray(items) || items.length === 0) {
//       return res.status(400).json({ success: false, message: "No items to order" });
//     }

//     // Calculate total (optional)
//     let orderTotal = 0;
//     items.forEach(item => {
//       orderTotal += item.quantity * item.price;
//     });

//     const line_items = items.map(item => ({
//       price_data: {
//         currency: "inr",
//         product_data: {
//           name: item.name,
//         },
//         unit_amount: Math.round(item.price * 100), // Stripe expects amount in smallest currency unit (paise)
//       },
//       quantity: item.quantity,
//     }));

//     const stripeSession = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items,
//       mode: "payment",
//       success_url: `${PAYMENT_SUCCESS_URL}?sessionId={CHECKOUT_SESSION_ID}`,
//       cancel_url: PAYMENT_FAIL_URL,
//       billing_address_collection: "required",
//       shipping_address_collection: {
//         allowed_countries: ["IN"],
//       },
//     });

//     res.status(201).json({
//       success: true,
//       data: {
//         paymentSessionId: stripeSession.id,
//         paymentUrl: stripeSession.url,
//       },
//       message: "Payment session created successfully",
//     });
//   } catch (error) {
//     console.error("Error creating payment session:", error.message);
//     return res.status(500).json({ success: false, error: error.message });
//   }
// }

// //==============================================================================

// // UPDATE ORDER STATUS

// async function updateOrderStatus(req, res) {
//     const userId = req.user.id;
//     const user = await User.findById(userId);
//     if (!user) {
//         return res
//             .status(404)
//             .json({ success: false, error: "Restaurant Not Found" });
//     }
//     const { orderStatus } = req.body;
//     const orderId = req.params.id;
//     const order = await Order.findById(orderId);
//     if (!order) {
//         return res
//             .status(400)
//             .json({ success: false, error: "Order Not Found" });
//     }
//     if (order.orderStatus != "Placed" && order.orderStatus != "Preparing") {
//         return res.status(400).json({
//             success: false,
//             error: "Sorry 🙏🙏 after Prepared you can't change the order Status",
//         });
//     }
//     const allowedOrderStatuses = ["Prepared", "Preparing"];
//     const isValidOrderStatus = allowedOrderStatuses.includes(orderStatus);
//     if (!isValidOrderStatus) {
//         return res.status(400).json({
//             success: false,
//             error: "Invalid Order Status Value",
//         });
//     }
//     const updatedOrder = await Order.findByIdAndUpdate(
//         orderId,
//         { $set: { orderStatus } },
//         { new: true }
//     );

//     if (!updatedOrder) {
//         return res
//             .status(404)
//             .json({ success: false, error: "Order Not Found" });
//     }

//     await io.emit("updateOrderStatus", { orderId, orderStatus });

//     if (updatedOrder.orderStatus === "Prepared") {
//         const restaurant = await Restaurant.findById(order.restaurant.id);
//         if (!restaurant) {
//             return res
//                 .status(404)
//                 .json({ success: false, error: "Restaurant Not Found" });
//         }

//         restaurant.deliveryMen.forEach((deliveryman) => {
//             const userId = deliveryman.user_id;
//             io.emit("orderPrepared", {
//                 order: updatedOrder,
//                 userId: userId,
//             });
//         });
//     }

//     res.status(221).json({
//         success: true,
//         message: "Order Status Updated",
//         orderstatus: updatedOrder.orderStatus,
//     });
// }

// //=============================================================================================
// // PICK THE ORDER
// const pickOrder = async (req, res) => {
//     const user = req.user;
//     const id = req.params.id;

//     // Find the order
//     const order = await Order.findById(id);

//     // Check if the order exists
//     if (!order) {
//         return res
//             .status(404)
//             .json({ success: false, error: "Order not found" });
//     }

//     // Check if the order status is not "Prepared"
//     if (order.orderStatus !== "Prepared") {
//         return res
//             .status(400)
//             .json({ success: false, error: "Order is not prepared" });
//     }

//     // Find the delivery man
//     const deliveryMan = await DeliveryMan.findOne({ user_id: user.id });
//     if (!deliveryMan) {
//         return res
//             .status(404)
//             .json({ success: false, error: "Delivery Man not found" });
//     }

//     // Check if the order status is "Prepared"
//     if (order.orderStatus === "Prepared") {
//         // Update the delivery man's currentOrders and the order's status
//         await DeliveryMan.updateOne(
//             { _id: deliveryMan.id },
//             {
//                 $push: {
//                     currentOrders: order._id,
//                 },
//             }
//         );
//         // Generate OTP
//         const OTP = await order.generateOTP();
//         order.deliveryManId = deliveryMan._id;
//         // Save the order
//         await order.save();

//         // Load HTML template for email
//         const htmlFilePath = path.join(
//             __dirname,
//             "../helpers/mailer/OTP_Code.html"
//         );
//         const otpTemplate = fs.readFileSync(htmlFilePath, "utf-8");

//         // Find the customer for email
//         const customer = await Customer.findById(order.customer.id);
//         if (!customer) {
//             return res
//                 .status(404)
//                 .json({ success: false, error: "Customer not found" });
//         }

//         // Find the user for email
//         const user = await User.findById(customer.user_id);
//         if (!user) {
//             return res
//                 .status(404)
//                 .json({ success: false, error: "User not found" });
//         }

//         // Send email to the customer
//         await sendEmailToGmail({
//             email: user.email,
//             subject: "OTP for Delivery Verification",
//             html: otpTemplate.replace("{{otp}}", OTP),
//         });

//         // Update order status
//         await Order.updateOne(
//             { _id: order._id },
//             { $set: { orderStatus: "Picked" } }
//         );

//         // Emit order status update
//         await io.emit("orderStatusUpdate", "Picked");
//     } else {
//         return res.status(400).json({
//             success: false,
//             error: "Order is not prepared for picking",
//         });
//     }

//     res.status(201).json({ success: true, message: "Order Picked" });
// };


// //=======================================================================================
// // COMPLETE / VERIFY THE ORDER
// const completeOrder = async (req, res) => {
//     const orderId = req.params.id;
//     const OTP = req.body.OTP;

//     // Find the order
//     const order = await Order.findById(orderId);

//     if (!order) {
//         throw new Error("Order not found");
//     }

//     // Verify OTP
//     const isOTPVerified = await order.verifyOTP(OTP);

//     if (!isOTPVerified) {
//         throw new Error("Invalid OTP");
//     }

//     // Update order status to "Completed"
//     order.orderStatus = "Completed";
//     order.OTP = undefined;
//     order.OTPExpiry = undefined;
//     await order.save();

//     // Move order from current orders to past orders for customer
//     const updatedCustomer = await Customer.findByIdAndUpdate(
//         order.customer.id,
//         {
//             $pull: { currentOrders: order._id },
//             $push: { pastOrders: order._id },
//         }
//     );
//     if (!updatedCustomer) {
//         throw new Error("Customer not updated");
//     }

//     // Move order from current orders to past orders for restaurant
//     const updatedRestaurant = await Restaurant.findByIdAndUpdate(
//         order.restaurant.id,
//         {
//             $pull: { currentOrders: order._id },
//             $push: { pastOrders: order._id },
//             $inc: { income: order.orderTotal - order.orderTotal / 10 },
//         }
//     );
//     if (!updatedRestaurant) {
//         throw new Error("Restaurant not updated");
//     }

//     // Move order from current orders to delivery history for delivery man
//     const updatedDeliveryMan = await DeliveryMan.findByIdAndUpdate(
//         order.deliveryManId,
//         {
//             $pull: { currentOrders: orderId },
//             $push: { pastOrders: orderId },
//         }
//     );
//     if (!updatedDeliveryMan) {
//         throw new Error("Delivery Man not updated");
//     }
//     await io.emit("orderStatusUpdate", "Completed");

//     // Return success response
//     return res
//         .status(200)
//         .json({ success: true, message: "Order completed successfully" });
// };


// //========================================================================
// // CANCEL THE ORDER
// const cancelOrder = async (req, res) => {
//     const orderId = req.params.id;
//     const order = await Order.findById(orderId);
//     if (!order) {
//         return res
//             .status(404)
//             .json({ success: false, error: "Order not found" });
//     }
//     if (order.orderStatus !== "Placed") {
//         return res.status(400).json({
//             success: false,
//             error: "Order cannot be canceled",
//         });
//     }
//     const deliveryMan = await DeliveryMan.findByIdAndUpdate(
//         order.deliveryMan.id,
//         {
//             $push: { cancelledOrders: order._id },
//             $pull: { currentOrders: order._id },
//         }
//     );
//     if (!deliveryMan) {
//         return res.status(404).json({
//             success: false,
//             error: "No delivery man has picked your order",
//         });
//     }
//     const updatedRestaurant = await Restaurant.findByIdAndUpdate(
//         order.restaurant.id,
//         {
//             $push: { cancelledOrders: order._id },
//             $pull: { currentOrders: order._id },
//         }
//     );
//     if (!updatedRestaurant) {
//         return res
//             .status(404)
//             .json({ success: false, error: "Restaurant not found" });
//     }

//     const updatedCustomer = await Customer.findByIdAndUpdate(
//         order.customer.id,
//         {
//             $pull: { currentOrders: order._id },
//         }
//     );
//     if (!updatedCustomer) {
//         return res
//             .status(404)
//             .json({ success: false, error: "Customer not found" });
//     }

//     const deletedOrder = await Order.findByIdAndDelete(orderId);
//     if (!deletedOrder) {
//         return res
//             .status(404)
//             .json({ success: false, error: "Order not deleted" });
//     }

//     // Commit the transaction here after successful deletion
//     await session.commitTransaction();
//     //emit on delete order
//     await io.emit("orderStatusUpdate", "Canceled");
//     // Return success response after successful deletion
//     return res
//         .status(200)
//         .json({ success: true, message: "Order deleted successfully" });
// };


// //============================================================================================
// // GET ROLE WISE PAST ORDERS
// const getPastOrders = async (req, res) => {
//     const role = req.user.role;
//     const userId = req.user._id;

//     try {
//         let model, fieldName;

//         switch (role) {
//             case "Restaurant":
//                 model = Restaurant;
//                 fieldName = "user_id";
//                 break;
//             case "DeliveryMan":
//                 model = DeliveryMan;
//                 fieldName = "user_id";
//                 break;
//             case "Customer":
//                 model = Customer;
//                 fieldName = "user_id";
//                 break;
//             default:
//                 return res
//                     .status(400)
//                     .json({ success: false, error: "Invalid Role" });
//         }

//         const userInstance = await model.findOne({ [fieldName]: userId });
//         if (!userInstance) {
//             return res
//                 .status(404)
//                 .json({ success: false, error: `${role} Not Found ` });
//         }

//         const pastOrders = userInstance.pastOrders;

//         // Check if there are past orders before querying the Order model
//         if (!pastOrders || pastOrders.length === 0) {
//             return res.status(200).json({ success: true, data: [] });
//         }

//         const orders = await Order.find({ _id: { $in: pastOrders } });

//         return res.status(200).json({
//             success: true,
//             message: "Past Orders fetched Successfully",
//             data: orders,
//         });
//     } catch (error) {
//         return res
//             .status(500)
//             .json({ success: false, error: "Internal Server Error" });
//     }
// };


// //========================================================================================
// // GET ROLE WISE CURRENT ORDERS

// const getCurrentOrders = async (req, res) => {
//     const role = req.user.role;
//     const userId = req.user._id;
//     try {
//         let model;
//         switch (role) {
//             case "Restaurant":
//                 model = Restaurant;
//                 break;
//             case "DeliveryMan":
//                 model = DeliveryMan;
//                 break;
//             case "Customer":
//                 model = Customer;
//                 break;
//             default:
//                 return res
//                     .status(400)
//                     .json({ success: false, error: "Invalid Role" });
//         }

//         const userInstance = await model.findOne({ user_id: userId });

//         if (!userInstance) {
//             return res
//                 .status(404)
//                 .json({ success: false, error: `${role} Not Found ` });
//         }

//         const currentOrders = await Order.find({
//             _id: { $in: userInstance.currentOrders },
//         });

//         return res.status(200).json({
//             success: true,
//             message: "Current Orders fetched Successfully",
//             data: currentOrders,
//         });
//     } catch (error) {
//         return res
//             .status(500)
//             .json({ success: false, error: "Internal Server Error" });
//     }
// };


// //========================================================================


// const getPreparedOrders = async (req, res) => {
//     try {
//         const preparedOrders = await Order.find({ orderStatus: "Prepared" });
//         return res.status(200).json({
//             success: true,
//             message: "Prepared Orders fetched Successfully",
//             data: preparedOrders,
//         });
//     } catch (error) {
//         return res
//             .status(500)
//             .json({ success: false, error: "Internal Server Error" });
//     }
// };

// const getOrderDistance = async (req, res) => {
//     const orderLocation = req.body.orderLocation;
//     const customerLocation = req.body.customerLocation;
//     const kms = calculateDistance(
//         orderLocation.latitude,
//         orderLocation.longitude,
//         customerLocation.latitude,
//         customerLocation.longitude
//     );
//     console.log(kms);
//     return res.status(200).json({ success: true, data: kms });
// };


// //================================================================================================



// async function handleSuccessfulPayment(req, res) {
//     try {
//         const customer = await Customer.findOne({ user_id: req.user.id });
//         if (!customer) {
//             return res.status(404).json({ success: false, error: "User not found" });
//         }

//         const restaurantId = req.params.id;
//         const restaurant = await Restaurant.findById(restaurantId);
//         if (!restaurant) {
//             return res.status(404).json({ success: false, error: "Restaurant not found" });
//         }

//         const sessionId = req.query.sessionId;
//         const { items } = req.body;

//         if (!items || !Array.isArray(items) || items.length === 0) {
//             return res.status(400).json({ success: false, error: "Invalid order items" });
//         }

//         let orderTotal = 0;
//         items.forEach(item => {
//             orderTotal += item.quantity * item.price;
//         });

//         const stripeSession = await stripe.checkout.sessions.retrieve(sessionId);

//         if (stripeSession.payment_status !== "paid") {
//             return res.status(400).json({
//                 success: false,
//                 error: "Payment was not successful",
//             });
//         }

//         const coordinates = await getCoordinates(); // Should be defined elsewhere

//         const order = new Order({
//             customer: {
//                 id: customer._id,
//                 name: req.user.name,
//             },
//             restaurant: {
//                 id: restaurant._id,
//                 name: restaurant.restaurantName,
//             },
//             deliveryLocation: {
//                 latitude: coordinates.latitude,
//                 longitude: coordinates.longitude,
//             },
//             restaurantLocation: {
//                 latitude: restaurant.location.latitude,
//                 longitude: restaurant.location.longitude,
//             },
//             items,
//             orderTotal,
//             paymentStatus: "Paid",
//             placedAt: new Date(),
//         });

//         const savedOrder = await order.save();

//         await Restaurant.findByIdAndUpdate(restaurantId, {
//             $push: { currentOrders: savedOrder._id },
//         });

//         await Customer.findByIdAndUpdate(customer._id, {
//             $push: { currentOrders: savedOrder._id },
//         });

//         await io.emit("orderPlaced", {
//             userId: restaurant.user_id,
//             newOrder: savedOrder,
//         });

//         res.status(201).json({
//             success: true,
//             data: { order: savedOrder },
//             message: "Order Placed Successfully",
//         });

//     } catch (error) {
//         console.error("Error handling successful payment:", error.message);
//         return res.status(500).json({ success: false, error: error.message });
//     }
// }

// //====================================================================================================

// async function getPreparedOrderByDeliverymanId(req, res) {
//     const deliverymanId = req.params.id;
//     //   const deliverymanId = req.user._id;

//     try {
//         const deliveryman = await DeliveryMan.findOne({
//             user_id: deliverymanId,
//         });
//         if (!deliveryman) {
//             return res.status(404).json({ message: "Deliveryman not found" });
//         }
//         let prepredOrders = [];

//         // Iterate through each restaurant ID in the deliveryman's restaurant array
//         for (const restaurantObj of deliveryman.restaurants) {
//             const restaurantId = restaurantObj.id;
//             const restaurant = await Restaurant.findById(restaurantId);
//             if (!restaurant) {
//                 console.log(`Restaurant with ID ${restaurantId} not found`);
//                 continue;
//             }

//             const orderIds = restaurant.currentOrders;
//             const orders = await Order.find({
//                 _id: { $in: orderIds },
//                 orderStatus: "Prepared",
//             });
//             prepredOrders = prepredOrders.concat(orders);
//         }

//         res.status(200).json({
//             succcess: true,
//             message:
//                 "prepredOrders of delivery man fetched Fetched successfully",
//             data: prepredOrders,
//         });
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// }

// module.exports = {
//     createOrder,
//     updateOrderStatus,
//     pickOrder,
//     cancelOrder,
//     completeOrder,
//     getPastOrders,
//     getCurrentOrders,
//     getPreparedOrders,
//     getOrderDistance,
//     handleSuccessfulPayment,
//     getPreparedOrderByDeliverymanId,
// };


























// const Order = require("../models/Order");
// const User = require("../models/User");
// const Restaurant = require("../models/Restaurant");
// const DeliveryMan = require("../models/DeliveryMan");
// const Customer = require("../models/Customer");
// const { getCoordinates } = require("../helpers/utils/getCoordinates");
// const { calculateDistance } = require("../helpers/utils/calculateDistance");
// const { sendEmailToGmail } = require("../helpers/mailer/mailer");
// const fs = require("fs");
// const path = require("path");
// const {
//     STRIPE_TEST_SECRET_KEY,
//     PAYMENT_SUCCESS_URL,
//     PAYMENT_FAIL_URL,
// } = require("../config/appConfig");
// const stripe = require("stripe")(STRIPE_TEST_SECRET_KEY);
// const { io } = require("../startup/io");

// // PLACE NEW ORDER
// async function createOrder(req, res) {
//     try {
//         const { items } = req.body;
//         console.log("Items received:", items); // Debug log
//         if (!items || !Array.isArray(items) || items.length === 0) {
//             return res.status(400).json({ success: false, message: "No items to order" });
//         }

//         // Validate item prices and quantities
//         for (const item of items) {
//             if (!item.price || item.price <= 0) {
//                 return res.status(400).json({ success: false, message: "Invalid item price" });
//             }
//             if (!item.quantity || item.quantity <= 0) {
//                 return res.status(400).json({ success: false, message: "Invalid item quantity" });
//             }
//         }

//         let orderTotal = 0;
//         items.forEach(item => {
//             orderTotal += item.quantity * item.price;
//         });

//         const line_items = items.map(item => ({
//             price_data: {
//                 currency: "inr",
//                 product_data: {
//                     name: item.name,
//                 },
//                 unit_amount: Math.round(item.price * 100),
//             },
//             quantity: item.quantity,
//         }));

//         const stripeSession = await stripe.checkout.sessions.create({
//             payment_method_types: ["card"],
//             line_items,
//             mode: "payment",
//             success_url: `${PAYMENT_SUCCESS_URL}?sessionId={CHECKOUT_SESSION_ID}`,
//             cancel_url: PAYMENT_FAIL_URL,
//             billing_address_collection: "required",
//             shipping_address_collection: {
//                 allowed_countries: ["IN"],
//             },
//         });

//         console.log("Stripe Session Created:", stripeSession); // Debug log

//         res.status(201).json({
//             success: true,
//             data: {
//                 paymentSessionId: stripeSession.id,
//                 paymentUrl: stripeSession.url,
//             },
//             message: "Payment session created successfully",
//         });
//     } catch (error) {
//         console.error("Error creating payment session:", error.message);
//         return res.status(500).json({ success: false, error: error.message });
//     }
// }

// // UPDATE ORDER STATUS
// async function updateOrderStatus(req, res) {
//     const userId = req.user.id;
//     const user = await User.findById(userId);
//     if (!user) {
//         return res.status(404).json({ success: false, error: "Restaurant Not Found" });
//     }
//     const { orderStatus } = req.body;
//     const orderId = req.params.id;
//     const order = await Order.findById(orderId);
//     if (!order) {
//         return res.status(400).json({ success: false, error: "Order Not Found" });
//     }
//     if (order.orderStatus !== "Placed" && order.orderStatus !== "Preparing") {
//         return res.status(400).json({
//             success: false,
//             error: "Sorry 🙏🙏 after Prepared you can't change the order Status",
//         });
//     }
//     const allowedOrderStatuses = ["Prepared", "Preparing"];
//     const isValidOrderStatus = allowedOrderStatuses.includes(orderStatus);
//     if (!isValidOrderStatus) {
//         return res.status(400).json({
//             success: false,
//             error: "Invalid Order Status Value",
//         });
//     }
//     const updatedOrder = await Order.findByIdAndUpdate(
//         orderId,
//         { $set: { orderStatus } },
//         { new: true }
//     );

//     if (!updatedOrder) {
//         return res.status(404).json({ success: false, error: "Order Not Found" });
//     }

//     await io.emit("updateOrderStatus", { orderId, orderStatus });

//     if (updatedOrder.orderStatus === "Prepared") {
//         const restaurant = await Restaurant.findById(order.restaurant.id);
//         if (!restaurant) {
//             return res.status(404).json({ success: false, error: "Restaurant Not Found" });
//         }

//         restaurant.deliveryMen.forEach((deliveryman) => {
//             const userId = deliveryman.user_id;
//             io.emit("orderPrepared", {
//                 order: updatedOrder,
//                 userId: userId,
//             });
//         });
//     }

//     res.status(221).json({
//         success: true,
//         message: "Order Status Updated",
//         orderstatus: updatedOrder.orderStatus,
//     });
// }

// // PICK THE ORDER
// const pickOrder = async (req, res) => {
//     const user = req.user;
//     const id = req.params.id;

//     // Find the order
//     const order = await Order.findById(id);

//     // Check if the order exists
//     if (!order) {
//         return res.status(404).json({ success: false, error: "Order not found" });
//     }

//     // Check if the order status is not "Prepared"
//     if (order.orderStatus !== "Prepared") {
//         return res.status(400).json({ success: false, error: "Order is not prepared" });
//     }

//     // Find the delivery man
//     const deliveryMan = await DeliveryMan.findOne({ user_id: user.id });
//     if (!deliveryMan) {
//         return res.status(404).json({ success: false, error: "Delivery Man not found" });
//     }

//     // Check if the order status is "Prepared"
//     if (order.orderStatus === "Prepared") {
//         // Update the delivery man's currentOrders and the order's status
//         await DeliveryMan.updateOne(
//             { _id: deliveryMan.id },
//             {
//                 $push: {
//                     currentOrders: order._id,
//                 },
//             }
//         );
//         // Generate OTP
//         const OTP = await order.generateOTP();
//         order.deliveryManId = deliveryMan._id;
//         // Save the order
//         await order.save();

//         // Load HTML template for email
//         const htmlFilePath = path.join(__dirname, "../helpers/mailer/OTP_Code.html");
//         const otpTemplate = fs.readFileSync(htmlFilePath, "utf-8");

//         // Find the customer for email
//         const customer = await Customer.findById(order.customer.id);
//         if (!customer) {
//             return res.status(404).json({ success: false, error: "Customer not found" });
//         }

//         // Find the user for email
//         const user = await User.findById(customer.user_id);
//         if (!user) {
//             return res.status(404).json({ success: false, error: "User not found" });
//         }

//         // Send email to the customer
//         await sendEmailToGmail({
//             email: user.email,
//             subject: "OTP for Delivery Verification",
//             html: otpTemplate.replace("{{otp}}", OTP),
//         });

//         // Update order status
//         await Order.updateOne(
//             { _id: order._id },
//             { $set: { orderStatus: "Picked" } }
//         );

//         // Emit order status update
//         await io.emit("orderStatusUpdate", "Picked");
//     } else {
//         return res.status(400).json({
//             success: false,
//             error: "Order is not prepared for picking",
//         });
//     }

//     res.status(201).json({ success: true, message: "Order Picked" });
// };

// // COMPLETE / VERIFY THE ORDER
// const completeOrder = async (req, res) => {
//     const orderId = req.params.id;
//     const OTP = req.body.OTP;

//     // Find the order
//     const order = await Order.findById(orderId);

//     if (!order) {
//         return res.status(404).json({ success: false, error: "Order not found" });
//     }

//     // Verify OTP
//     const isOTPVerified = await order.verifyOTP(OTP);

//     if (!isOTPVerified) {
//         return res.status(400).json({ success: false, error: "Invalid OTP" });
//     }

//     // Update order status to "Completed"
//     order.orderStatus = "Completed";
//     order.OTP = undefined;
//     order.OTPExpiry = undefined;
//     await order.save();

//     // Move order from current orders to past orders for customer
//     const updatedCustomer = await Customer.findByIdAndUpdate(
//         order.customer.id,
//         {
//             $pull: { currentOrders: order._id },
//             $push: { pastOrders: order._id },
//         }
//     );
//     if (!updatedCustomer) {
//         return res.status(404).json({ success: false, error: "Customer not updated" });
//     }

//     // Move order from current orders to past orders for restaurant
//     const updatedRestaurant = await Restaurant.findByIdAndUpdate(
//         order.restaurant.id,
//         {
//             $pull: { currentOrders: order._id },
//             $push: { pastOrders: order._id },
//             $inc: { income: order.orderTotal - order.orderTotal / 10 },
//         }
//     );
//     if (!updatedRestaurant) {
//         return res.status(404).json({ success: false, error: "Restaurant not updated" });
//     }

//     // Move order from current orders to delivery history for delivery man
//     const updatedDeliveryMan = await DeliveryMan.findByIdAndUpdate(
//         order.deliveryManId,
//         {
//             $pull: { currentOrders: orderId },
//             $push: { pastOrders: orderId },
//         }
//     );
//     if (!updatedDeliveryMan) {
//         return res.status(404).json({ success: false, error: "Delivery Man not updated" });
//     }
//     await io.emit("orderStatusUpdate", "Completed");

//     // Return success response
//     return res.status(200).json({ success: true, message: "Order completed successfully" });
// };

// // CANCEL THE ORDER
// const cancelOrder = async (req, res) => {
//     const orderId = req.params.id;
//     const order = await Order.findById(orderId);
//     if (!order) {
//         return res.status(404).json({ success: false, error: "Order not found" });
//     }
//     if (order.orderStatus !== "Placed") {
//         return res.status(400).json({
//             success: false,
//             error: "Order cannot be canceled",
//         });
//     }
//     const deliveryMan = await DeliveryMan.findByIdAndUpdate(
//         order.deliveryManId, // Fixed: Use deliveryManId instead of deliveryMan.id
//         {
//             $push: { cancelledOrders: order._id },
//             $pull: { currentOrders: order._id },
//         }
//     );
//     if (!deliveryMan && order.deliveryManId) { // Check if deliveryManId exists before failing
//         return res.status(404).json({
//             success: false,
//             error: "Delivery man not found",
//         });
//     }
//     const updatedRestaurant = await Restaurant.findByIdAndUpdate(
//         order.restaurant.id,
//         {
//             $push: { cancelledOrders: order._id },
//             $pull: { currentOrders: order._id },
//         }
//     );
//     if (!updatedRestaurant) {
//         return res.status(404).json({ success: false, error: "Restaurant not found" });
//     }

//     const updatedCustomer = await Customer.findByIdAndUpdate(
//         order.customer.id,
//         {
//             $pull: { currentOrders: order._id },
//         }
//     );
//     if (!updatedCustomer) {
//         return res.status(404).json({ success: false, error: "Customer not found" });
//     }

//     const deletedOrder = await Order.findByIdAndDelete(orderId);
//     if (!deletedOrder) {
//         return res.status(404).json({ success: false, error: "Order not deleted" });
//     }

//     // Emit on delete order
//     await io.emit("orderStatusUpdate", "Canceled");

//     // Return success response after successful deletion
//     return res.status(200).json({ success: true, message: "Order deleted successfully" });
// };

// // GET ROLE WISE PAST ORDERS
// const getPastOrders = async (req, res) => {
//     const role = req.user.role;
//     const userId = req.user._id;

//     try {
//         let model, fieldName;

//         switch (role) {
//             case "Restaurant":
//                 model = Restaurant;
//                 fieldName = "user_id";
//                 break;
//             case "DeliveryMan":
//                 model = DeliveryMan;
//                 fieldName = "user_id";
//                 break;
//             case "Customer":
//                 model = Customer;
//                 fieldName = "user_id";
//                 break;
//             default:
//                 return res.status(400).json({ success: false, error: "Invalid Role" });
//         }

//         const userInstance = await model.findOne({ [fieldName]: userId });
//         if (!userInstance) {
//             return res.status(404).json({ success: false, error: `${role} Not Found` });
//         }

//         const pastOrders = userInstance.pastOrders;

//         // Check if there are past orders before querying the Order model
//         if (!pastOrders || pastOrders.length === 0) {
//             return res.status(200).json({ success: true, data: [] });
//         }

//         const orders = await Order.find({ _id: { $in: pastOrders } });

//         return res.status(200).json({
//             success: true,
//             message: "Past Orders fetched Successfully",
//             data: orders,
//         });
//     } catch (error) {
//         return res.status(500).json({ success: false, error: "Internal Server Error" });
//     }
// };

// // GET ROLE WISE CURRENT ORDERS
// const getCurrentOrders = async (req, res) => {
//     const role = req.user.role;
//     const userId = req.user._id;
//     try {
//         let model;
//         switch (role) {
//             case "Restaurant":
//                 model = Restaurant;
//                 break;
//             case "DeliveryMan":
//                 model = DeliveryMan;
//                 break;
//             case "Customer":
//                 model = Customer;
//                 break;
//             default:
//                 return res.status(400).json({ success: false, error: "Invalid Role" });
//         }

//         const userInstance = await model.findOne({ user_id: userId });

//         if (!userInstance) {
//             return res.status(404).json({ success: false, error: `${role} Not Found` });
//         }

//         const currentOrders = await Order.find({
//             _id: { $in: userInstance.currentOrders },
//         });

//         return res.status(200).json({
//             success: true,
//             message: "Current Orders fetched Successfully",
//             data: currentOrders,
//         });
//     } catch (error) {
//         return res.status(500).json({ success: false, error: "Internal Server Error" });
//     }
// };

// // GET PREPARED ORDERS
// const getPreparedOrders = async (req, res) => {
//     try {
//         const preparedOrders = await Order.find({ orderStatus: "Prepared" });
//         return res.status(200).json({
//             success: true,
//             message: "Prepared Orders fetched Successfully",
//             data: preparedOrders,
//         });
//     } catch (error) {
//         return res.status(500).json({ success: false, error: "Internal Server Error" });
//     }
// };

// // GET ORDER DISTANCE
// const getOrderDistance = async (req, res) => {
//     const orderLocation = req.body.orderLocation;
//     const customerLocation = req.body.customerLocation;
//     const kms = calculateDistance(
//         orderLocation.latitude,
//         orderLocation.longitude,
//         customerLocation.latitude,
//         customerLocation.longitude
//     );
//     console.log(kms);
//     return res.status(200).json({ success: true, data: kms });
// };

// // HANDLE SUCCESSFUL PAYMENT
// async function handleSuccessfulPayment(req, res) {
//     try {
//         const customer = await Customer.findOne({ user_id: req.user.id });
//         console.log("Customer:", customer); // Debug log
//         if (!customer) {
//             return res.status(404).json({ success: false, error: "User not found" });
//         }

//         const restaurantId = req.params.id;
//         const restaurant = await Restaurant.findById(restaurantId);
//         console.log("Restaurant:", restaurant); // Debug log
//         if (!restaurant) {
//             return res.status(404).json({ success: false, error: "Restaurant not found" });
//         }

//         const sessionId = req.query.sessionId;
//         const { items } = req.body;

//         console.log("Session ID:", sessionId); // Debug log
//         console.log("Items:", items); // Debug log

//         if (!items || !Array.isArray(items) || items.length === 0) {
//             return res.status(400).json({ success: false, error: "Invalid order items" });
//         }

//         let orderTotal = 0;
//         items.forEach(item => {
//             orderTotal += item.quantity * item.price;
//         });

//         const stripeSession = await stripe.checkout.sessions.retrieve(sessionId);
//         console.log("Retrieved Stripe Session:", stripeSession); // Debug log

//         if (stripeSession.payment_status !== "paid") {
//             return res.status(400).json({
//                 success: false,
//                 error: "Payment was not successful",
//             });
//         }

//         // Mock getCoordinates for debugging (replace with actual implementation)
//         const coordinates = { latitude: "0", longitude: "0" };
//         console.log("Coordinates:", coordinates); // Debug log

//         const order = new Order({
//             customer: {
//                 id: customer._id,
//                 name: req.user.name,
//             },
//             restaurant: {
//                 id: restaurant._id,
//                 name: restaurant.restaurantName,
//             },
//             deliveryLocation: {
//                 latitude: coordinates.latitude,
//                 longitude: coordinates.longitude,
//             },
//             restaurantLocation: {
//                 latitude: restaurant.location.latitude,
//                 longitude: restaurant.location.longitude,
//             },
//             items,
//             orderTotal,
//             paymentStatus: "Paid",
//             placedAt: new Date(),
//         });

//         const savedOrder = await order.save();
//         console.log("Saved Order:", savedOrder); // Debug log

//         await Restaurant.findByIdAndUpdate(restaurantId, {
//             $push: { currentOrders: savedOrder._id },
//         });

//         await Customer.findByIdAndUpdate(customer._id, {
//             $push: { currentOrders: savedOrder._id },
//         });

//         await io.emit("orderPlaced", {
//             userId: restaurant.user_id,
//             newOrder: savedOrder,
//         });

//         res.status(201).json({
//             success: true,
//             data: { order: savedOrder },
//             message: "Order Placed Successfully",
//         });
//     } catch (error) {
//         console.error("Error handling successful payment:", error.message);
//         return res.status(500).json({ success: false, error: error.message });
//     }
// }

// // GET PREPARED ORDERS BY DELIVERYMAN ID
// async function getPreparedOrderByDeliverymanId(req, res) {
//     const deliverymanId = req.params.id;

//     try {
//         const deliveryman = await DeliveryMan.findOne({
//             user_id: deliverymanId,
//         });
//         if (!deliveryman) {
//             return res.status(404).json({ message: "Deliveryman not found" });
//         }
//         let preparedOrders = [];

//         // Iterate through each restaurant ID in the deliveryman's restaurant array
//         for (const restaurantObj of deliveryman.restaurants) {
//             const restaurantId = restaurantObj.id;
//             const restaurant = await Restaurant.findById(restaurantId);
//             if (!restaurant) {
//                 console.log(`Restaurant with ID ${restaurantId} not found`);
//                 continue;
//             }

//             const orderIds = restaurant.currentOrders;
//             const orders = await Order.find({
//                 _id: { $in: orderIds },
//                 orderStatus: "Prepared",
//             });
//             preparedOrders = preparedOrders.concat(orders);
//         }

//         res.status(200).json({
//             success: true,
//             message: "Prepared Orders of delivery man fetched successfully",
//             data: preparedOrders,
//         });
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// }

// module.exports = {
//     createOrder,
//     updateOrderStatus,
//     pickOrder,
//     cancelOrder,
//     completeOrder,
//     getPastOrders,
//     getCurrentOrders,
//     getPreparedOrders,
//     getOrderDistance,
//     handleSuccessfulPayment,
//     getPreparedOrderByDeliverymanId,
// };























































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


























const Order = require("../models/Order");
const User = require("../models/User");
const Restaurant = require("../models/Restaurant");
const DeliveryMan = require("../models/DeliveryMan");
const Customer = require("../models/Customer");
const { getCoordinates } = require("../helpers/utils/getCoordinates");
const { calculateDistance } = require("../helpers/utils/calculateDistance");
const { sendEmailToGmail } = require("../helpers/mailer/mailer");
const fs = require("fs");
const path = require("path");
const {
    STRIPE_TEST_SECRET_KEY,
    PAYMENT_SUCCESS_URL,
    PAYMENT_FAIL_URL,
} = require("../config/appConfig");
const stripe = require("stripe")(STRIPE_TEST_SECRET_KEY);
const { io } = require("../startup/io");

// PLACE NEW ORDER
async function createOrder(req, res) {
    try {
        const { items } = req.body;
        console.log("Items received:", items); // Debug log
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ success: false, message: "No items to order" });
        }

        // Validate item prices and quantities
        for (const item of items) {
            if (!item.price || item.price <= 0) {
                return res.status(400).json({ success: false, message: "Invalid item price" });
            }
            if (!item.quantity || item.quantity <= 0) {
                return res.status(400).json({ success: false, message: "Invalid item quantity" });
            }
        }

        let orderTotal = 0;
        items.forEach(item => {
            orderTotal += item.quantity * item.price;
        });

        const line_items = items.map(item => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name,
                },
                unit_amount: Math.round(item.price * 100),
            },
            quantity: item.quantity,
        }));

        const stripeSession = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items,
            mode: "payment",
            success_url: `${PAYMENT_SUCCESS_URL}?sessionId={CHECKOUT_SESSION_ID}`,
            cancel_url: PAYMENT_FAIL_URL,
            billing_address_collection: "required",
            shipping_address_collection: {
                allowed_countries: ["IN"],
            },
        });

        console.log("Stripe Session Created:", stripeSession); // Debug log

        res.status(201).json({
            success: true,
            data: {
                paymentSessionId: stripeSession.id,
                paymentUrl: stripeSession.url,
            },
            message: "Payment session created successfully",
        });
    } catch (error) {
        console.error("Error creating payment session:", error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
}

// UPDATE ORDER STATUS
async function updateOrderStatus(req, res) {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, error: "Restaurant Not Found" });
        }
        const { orderStatus } = req.body;
        const orderId = req.params.id;
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(400).json({ success: false, error: "Order Not Found" });
        }
        if (order.orderStatus !== "Placed" && order.orderStatus !== "Preparing") {
            return res.status(400).json({
                success: false,
                error: "Sorry 🙏🙏 after Prepared you can't change the order Status",
            });
        }
        const allowedOrderStatuses = ["Prepared", "Preparing"];
        const isValidOrderStatus = allowedOrderStatuses.includes(orderStatus);
        if (!isValidOrderStatus) {
            return res.status(400).json({
                success: false,
                error: "Invalid Order Status Value",
            });
        }
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { $set: { orderStatus } },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ success: false, error: "Order Not Found" });
        }

        await io.emit("updateOrderStatus", { orderId, orderStatus });

        if (updatedOrder.orderStatus === "Prepared") {
            const restaurant = await Restaurant.findById(order.restaurant.id);
            if (!restaurant) {
                return res.status(404).json({ success: false, error: "Restaurant Not Found" });
            }

            restaurant.deliveryMen.forEach((deliveryman) => {
                const userId = deliveryman.user_id;
                io.emit("orderPrepared", {
                    order: updatedOrder,
                    userId: userId,
                });
            });
        }

        res.status(200).json({
            success: true,
            message: "Order Status Updated",
            orderstatus: updatedOrder.orderStatus,
        });
    } catch (error) {
        console.error("Error updating order status:", error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
}

// PICK THE ORDER
const pickOrder = async (req, res) => {
    try {
        const user = req.user;
        const id = req.params.id;

        // Find the order
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ success: false, error: "Order not found" });
        }

        // Check if the order status is not "Prepared"
        if (order.orderStatus !== "Prepared") {
            return res.status(400).json({ success: false, error: "Order is not prepared" });
        }

        // Find the delivery man
        const deliveryMan = await DeliveryMan.findOne({ user_id: user.id });
        if (!deliveryMan) {
            return res.status(404).json({ success: false, error: "Delivery Man not found" });
        }

        // Check if the order status is "Prepared"
        if (order.orderStatus === "Prepared") {
            // Update the delivery man's currentOrders
            await DeliveryMan.updateOne(
                { _id: deliveryMan.id },
                {
                    $push: {
                        currentOrders: order._id,
                    },
                }
            );
            // Generate OTP
            const OTP = await order.generateOTP();
            order.deliveryManId = deliveryMan._id;
            await order.save();

            // Load HTML template for email
            const htmlFilePath = path.join(__dirname, "../helpers/mailer/OTP_Code.html");
            const otpTemplate = fs.readFileSync(htmlFilePath, "utf-8");

            // Find the customer for email
            const customer = await Customer.findById(order.customer.id);
            if (!customer) {
                return res.status(404).json({ success: false, error: "Customer not found" });
            }

            // Find the user for email
            const user = await User.findById(customer.user_id);
            if (!user) {
                return res.status(404).json({ success: false, error: "User not found" });
            }

            // Send email to the customer
            await sendEmailToGmail({
                email: user.email,
                subject: "OTP for Delivery Verification",
                html: otpTemplate.replace("{{otp}}", OTP),
            });

            // Update order status
            await Order.updateOne(
                { _id: order._id },
                { $set: { orderStatus: "Picked" } }
            );

            // Emit order status update
            await io.emit("orderStatusUpdate", "Picked");
        } else {
            return res.status(400).json({
                success: false,
                error: "Order is not prepared for picking",
            });
        }

        res.status(201).json({ success: true, message: "Order Picked" });
    } catch (error) {
        console.error("Error picking order:", error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
};

// COMPLETE / VERIFY THE ORDER
const completeOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const OTP = req.body.OTP;

        // Find the order
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ success: false, error: "Order not found" });
        }

        // Verify OTP
        const isOTPVerified = await order.verifyOTP(OTP);
        if (!isOTPVerified) {
            return res.status(400).json({ success: false, error: "Invalid OTP" });
        }

        // Update order status to "Completed"
        order.orderStatus = "Completed";
        order.OTP = undefined;
        order.OTPExpiry = undefined;
        await order.save();

        // Move order from current orders to past orders for customer
        const updatedCustomer = await Customer.findByIdAndUpdate(
            order.customer.id,
            {
                $pull: { currentOrders: order._id },
                $push: { pastOrders: order._id },
            }
        );
        if (!updatedCustomer) {
            return res.status(404).json({ success: false, error: "Customer not updated" });
        }

        // Move order from current orders to past orders for restaurant
        const updatedRestaurant = await Restaurant.findByIdAndUpdate(
            order.restaurant.id,
            {
                $pull: { currentOrders: order._id },
                $push: { pastOrders: order._id },
                $inc: { income: order.orderTotal - order.orderTotal / 10 },
            }
        );
        if (!updatedRestaurant) {
            return res.status(404).json({ success: false, error: "Restaurant not updated" });
        }

        // Move order from current orders to delivery history for delivery man
        const updatedDeliveryMan = await DeliveryMan.findByIdAndUpdate(
            order.deliveryManId,
            {
                $pull: { currentOrders: orderId },
                $push: { pastOrders: orderId },
            }
        );
        if (!updatedDeliveryMan) {
            return res.status(404).json({ success: false, error: "Delivery Man not updated" });
        }

        await io.emit("orderStatusUpdate", "Completed");

        return res.status(200).json({ success: true, message: "Order completed successfully" });
    } catch (error) {
        console.error("Error completing order:", error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
};

// CANCEL THE ORDER
const cancelOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ success: false, error: "Order not found" });
        }
        if (order.orderStatus !== "Placed") {
            return res.status(400).json({
                success: false,
                error: "Order cannot be canceled",
            });
        }

        const deliveryMan = await DeliveryMan.findByIdAndUpdate(
            order.deliveryManId,
            {
                $push: { cancelledOrders: order._id },
                $pull: { currentOrders: order._id },
            }
        );
        if (!deliveryMan && order.deliveryManId) {
            return res.status(404).json({
                success: false,
                error: "Delivery man not found",
            });
        }

        const updatedRestaurant = await Restaurant.findByIdAndUpdate(
            order.restaurant.id,
            {
                $push: { cancelledOrders: order._id },
                $pull: { currentOrders: order._id },
            }
        );
        if (!updatedRestaurant) {
            return res.status(404).json({ success: false, error: "Restaurant not found" });
        }

        const updatedCustomer = await Customer.findByIdAndUpdate(
            order.customer.id,
            {
                $pull: { currentOrders: order._id },
            }
        );
        if (!updatedCustomer) {
            return res.status(404).json({ success: false, error: "Customer not found" });
        }

        const deletedOrder = await Order.findByIdAndDelete(orderId);
        if (!deletedOrder) {
            return res.status(404).json({ success: false, error: "Order not deleted" });
        }

        await io.emit("orderStatusUpdate", "Canceled");

        return res.status(200).json({ success: true, message: "Order deleted successfully" });
    } catch (error) {
        console.error("Error canceling order:", error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
};

// GET ROLE WISE PAST ORDERS
const getPastOrders = async (req, res) => {
    try {
        const role = req.user.role;
        const userId = req.user._id;

        let model, fieldName;

        switch (role) {
            case "Restaurant":
                model = Restaurant;
                fieldName = "user_id";
                break;
            case "DeliveryMan":
                model = DeliveryMan;
                fieldName = "user_id";
                break;
            case "Customer":
                model = Customer;
                fieldName = "user_id";
                break;
            default:
                return res.status(400).json({ success: false, error: "Invalid Role" });
        }

        const userInstance = await model.findOne({ [fieldName]: userId });
        if (!userInstance) {
            return res.status(404).json({ success: false, error: `${role} Not Found` });
        }

        const pastOrders = userInstance.pastOrders;

        if (!pastOrders || pastOrders.length === 0) {
            return res.status(200).json({ success: true, data: [] });
        }

        const orders = await Order.find({ _id: { $in: pastOrders } });

        return res.status(200).json({
            success: true,
            message: "Past Orders fetched Successfully",
            data: orders,
        });
    } catch (error) {
        console.error("Error fetching past orders:", error.message);
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

// GET ROLE WISE CURRENT ORDERS
const getCurrentOrders = async (req, res) => {
    try {
        const role = req.user.role;
        const userId = req.user._id;

        let model;
        switch (role) {
            case "Restaurant":
                model = Restaurant;
                break;
            case "DeliveryMan":
                model = DeliveryMan;
                break;
            case "Customer":
                model = Customer;
                break;
            default:
                return res.status(400).json({ success: false, error: "Invalid Role" });
        }

        const userInstance = await model.findOne({ user_id: userId });
        if (!userInstance) {
            return res.status(404).json({ success: false, error: `${role} Not Found` });
        }

        const currentOrders = await Order.find({
            _id: { $in: userInstance.currentOrders },
        });

        return res.status(200).json({
            success: true,
            message: "Current Orders fetched Successfully",
            data: currentOrders,
        });
    } catch (error) {
        console.error("Error fetching current orders:", error.message);
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

// GET PREPARED ORDERS
const getPreparedOrders = async (req, res) => {
    try {
        const preparedOrders = await Order.find({ orderStatus: "Prepared" });
        return res.status(200).json({
            success: true,
            message: "Prepared Orders fetched Successfully",
            data: preparedOrders,
        });
    } catch (error) {
        console.error("Error fetching prepared orders:", error.message);
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

// GET ORDER DISTANCE
const getOrderDistance = async (req, res) => {
    try {
        const { orderLocation, customerLocation } = req.body;
        if (!orderLocation || !customerLocation) {
            return res.status(400).json({ success: false, error: "Missing location data" });
        }

        const kms = calculateDistance(
            orderLocation.latitude,
            orderLocation.longitude,
            customerLocation.latitude,
            customerLocation.longitude
        );
        console.log("Distance calculated:", kms);
        return res.status(200).json({ success: true, data: kms });
    } catch (error) {
        console.error("Error calculating order distance:", error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
};

//==================================================================================================

// // HANDLE SUCCESSFUL PAYMENT
// async function handleSuccessfulPayment(req, res) {
//     try {
//         // Add debug log for req.user
//         console.log("req.user:", req.user);

//         // Verify the user exists in the User collection
//         const user = await User.findById(req.user.id);
//         if (!user) {
//             return res.status(404).json({ success: false, error: "User not found in User collection" });
//         }

//         // Try to find the customer
//         let customer = await Customer.findOne({ user_id: req.user.id });
//         console.log("Customer:", customer); // Debug log

//         // If customer doesn't exist, create one
//         if (!customer) {
//             console.log(`Customer not found for user_id: ${req.user.id}. Creating a new customer.`);
//             customer = new Customer({
//                 user_id: req.user.id,
//                 name: user.name || req.user.name, // Use user.name if available
//                 email: user.email, // Optional: Add email if your Customer schema supports it
//                 currentOrders: [],
//                 pastOrders: [],
//                 // Add other required fields as per your Customer schema
//             });
//             await customer.save();
//             console.log("New Customer Created:", customer); // Debug log
//         }

//         const restaurantId = req.params.id;
//         const restaurant = await Restaurant.findById(restaurantId);
//         console.log("Restaurant:", restaurant); // Debug log
//         if (!restaurant) {
//             return res.status(404).json({ success: false, error: "Restaurant not found" });
//         }

//         const sessionId = req.query.sessionId;
//         const { items } = req.body;

//         console.log("Session ID:", sessionId); // Debug log
//         console.log("Items:", items); // Debug log

//         if (!items || !Array.isArray(items) || items.length === 0) {
//             return res.status(400).json({ success: false, error: "Invalid order items" });
//         }

//         let orderTotal = 0;
//         items.forEach(item => {
//             orderTotal += item.quantity * item.price;
//         });

//         const stripeSession = await stripe.checkout.sessions.retrieve(sessionId);
//         console.log("Retrieved Stripe Session:", stripeSession); // Debug log

//         if (stripeSession.payment_status !== "paid") {
//             return res.status(400).json({
//                 success: false,
//                 error: "Payment was not successful",
//             });
//         }

//         // Mock getCoordinates for now (replace with actual implementation)
//         const coordinates = await getCoordinates().catch(err => {
//             console.error("Error getting coordinates:", err.message);
//             return { latitude: "0", longitude: "0" }; // Fallback to default
//         });
//         console.log("Coordinates:", coordinates); // Debug log

//         const order = new Order({
//             customer: {
//                 id: customer._id,
//                 name: req.user.name,
//             },
//             restaurant: {
//                 id: restaurant._id,
//                 name: restaurant.restaurantName,
//             },
//             deliveryLocation: {
//                 latitude: coordinates.latitude,
//                 longitude: coordinates.longitude,
//             },
//             restaurantLocation: {
//                 latitude: restaurant.location.latitude,
//                 longitude: restaurant.location.longitude,
//             },
//             items,
//             orderTotal,
//             paymentStatus: "Paid",
//             placedAt: new Date(),
//             orderStatus: "Placed", // Ensure initial status
//         });

//         const savedOrder = await order.save();
//         console.log("Saved Order:", savedOrder); // Debug log

//         await Restaurant.findByIdAndUpdate(restaurantId, {
//             $push: { currentOrders: savedOrder._id },
//         });

//         await Customer.findByIdAndUpdate(customer._id, {
//             $push: { currentOrders: savedOrder._id },
//         });

//         await io.emit("orderPlaced", {
//             userId: restaurant.user_id,
//             newOrder: savedOrder,
//         });

//         res.status(201).json({
//             success: true,
//             data: { order: savedOrder },
//             message: "Order Placed Successfully",
//         });
//     } catch (error) {
//         console.error("Error handling successful payment:", error.message);
//         return res.status(500).json({ success: false, error: error.message });
//     }
// }

async function handleSuccessfulPayment(req, res) {
  try {
    console.log("req.user:", req.user);
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        error: "User not found" 
      });
    }

    // Find or create customer
    let customer = await Customer.findOne({ user_id: req.user.id });
    if (!customer) {
      customer = new Customer({
        user_id: req.user.id,
        name: user.name,
        email: user.email,
        currentOrders: [],
        pastOrders: [],
      });
      await customer.save();
    }

    const restaurantId = req.params.id;
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ 
        success: false, 
        error: "Restaurant not found" 
      });
    }

    const sessionId = req.query.sessionId;
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ 
        success: false, 
        error: "Invalid order items" 
      });
    }

    const stripeSession = await stripe.checkout.sessions.retrieve(sessionId);
    
    if (stripeSession.payment_status !== "paid") {
      return res.status(400).json({ 
        success: false, 
        error: "Payment not successful" 
      });
    }

    // Get email from Stripe or authenticated user
    const customerEmail = stripeSession.customer_details?.email || user.email;

    const order = new Order({
      customer: {
        id: customer._id,
        name: customer.name,
      },
      restaurant: {
        id: restaurant._id,
        name: restaurant.restaurantName,
      },
      items: items.map(item => ({
        foodItem: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      orderTotal: items.reduce((total, item) => total + (item.price * item.quantity), 0),
      paymentStatus: "Paid",
      email: customerEmail, // Critical fix
      orderStatus: "Placed",
    });

    const savedOrder = await order.save();

    // Update restaurant
    await Restaurant.findByIdAndUpdate(
      restaurantId, 
      { $push: { currentOrders: savedOrder._id } }
    );

    // Update customer
    await Customer.findByIdAndUpdate(
      customer._id,
      { $push: { currentOrders: savedOrder._id } }
    );

    // Notify restaurant
    io.emit("orderPlaced", {
      userId: restaurant.user_id,
      newOrder: savedOrder
    });

    res.status(201).json({
      success: true,
      data: { order: savedOrder },
      message: "Order Placed Successfully"
    });
  } catch (error) {
    console.error("Error handling successful payment:", error.message);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}

//===============================================================================================
// GET PREPARED ORDERS BY DELIVERYMAN ID
async function getPreparedOrderByDeliverymanId(req, res) {
    try {
        const deliverymanId = req.params.id;
        const deliveryman = await DeliveryMan.findOne({ user_id: deliverymanId });
        if (!deliveryman) {
            return res.status(404).json({ success: false, message: "Deliveryman not found" });
        }

        let preparedOrders = [];
        for (const restaurantObj of deliveryman.restaurants) {
            const restaurantId = restaurantObj.id;
            const restaurant = await Restaurant.findById(restaurantId);
            if (!restaurant) {
                console.log(`Restaurant with ID ${restaurantId} not found`);
                continue;
            }

            const orderIds = restaurant.currentOrders;
            const orders = await Order.find({
                _id: { $in: orderIds },
                orderStatus: "Prepared",
            });
            preparedOrders = preparedOrders.concat(orders);
        }

        res.status(200).json({
            success: true,
            message: "Prepared Orders of delivery man fetched successfully",
            data: preparedOrders,
        });
    } catch (error) {
        console.error("Error fetching prepared orders by deliveryman ID:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

module.exports = {
    createOrder,
    updateOrderStatus,
    pickOrder,
    cancelOrder,
    completeOrder,
    getPastOrders,
    getCurrentOrders,
    getPreparedOrders,
    getOrderDistance,
    handleSuccessfulPayment,
    getPreparedOrderByDeliverymanId,
};