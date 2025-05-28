// const express = require("express");
// const router = express.Router();
// const asyncErrorHandler = require("../middlewares/asyncErrorHandler");
// const isLoggedIn = require("../middlewares/isLoggedIn");
// const orderController = require("../controllers/orderController");
// //place order
// router.post(
//     "/placeorder/:id",
//     isLoggedIn,
//     verifyRole("Customer"),
//     asyncErrorHandler(orderController.createOrder)
// );

// router.post(
//     "/handle-success-response/:id",
//     isLoggedIn,
//     verifyRole("Customer"),
//     asyncErrorHandler(orderController.handleSuccessfulPayment)
// );

// //update order status
// router.put(
//     "/update/:id",
//     isLoggedIn,
//     verifyRole("Restaurant"),
//     asyncErrorHandler(orderController.updateOrderStatus)
// );
// // # pick up order
// router.put(
//     "/pick/:id",
//     isLoggedIn,
//     verifyRole("DeliveryMan"),
//     asyncErrorHandler(orderController.pickOrder)
// );
// // # complete Order
// router.put(
//     "/verify/:id",
//     isLoggedIn,
//     verifyRole("DeliveryMan"),
//     asyncErrorHandler(orderController.completeOrder)
// );
// // # get past orders
// router.get(
//     "/past",
//     isLoggedIn,
//     verifyRole(["DeliveryMan", "Restaurant", "Customer"]),
//     asyncErrorHandler(orderController.getPastOrders)
// );
// // # get current orders
// router.get(
//     "/current",
//     isLoggedIn,
//     verifyRole(["DeliveryMan", "Restaurant", "Customer"]),
//     asyncErrorHandler(orderController.getCurrentOrders)
// );
// //get prepared orders
// router.get(
//     "/prepared",
//     isLoggedIn,
//     verifyRole("DeliveryMan"),
//     asyncErrorHandler(orderController.getPreparedOrders)
// );
// // cancel order
// router.put(
//     "/cancel/:id",
//     isLoggedIn,
//     verifyRole("Customer"),
//     asyncErrorHandler(orderController.cancelOrder)
// );
// // handle payment response
// router.put(
//     "/handle-payment-response/:id",
//     isLoggedIn,
//     verifyRole("Customer"),
//     asyncErrorHandler(orderController.handlePaymentResponse)
// );
// //get Order Distance
// router.get(
//     "/location",
//     isLoggedIn,
//     verifyRole(["Customer", "Restaurant", "DeliveryMan"]),
//     asyncErrorHandler(orderController.getOrderDistance)
// );

// // get delivery man's restaurant 's prepared orders
// router.get(
//     "/currentOrders/:id",
//     asyncErrorHandler(orderController.getPreparedOrderByDeliverymanId)
// );

// module.exports = router;













const express = require("express");
const router = express.Router();
const asyncErrorHandler = require("../middlewares/asyncErrorHandler");
const isLoggedIn = require("../middlewares/isLoggedIn");
const orderController = require("../controllers/orderController");

// Place order
router.post(
  "/placeorder/:id",
  isLoggedIn,
  verifyRole("Customer"),
  asyncErrorHandler(orderController.createOrder)
);

// Handle successful payment
router.post(
  "/handle-success-response/:id",
  isLoggedIn,
  verifyRole("Customer"),
  asyncErrorHandler(orderController.handleSuccessfulPayment)
);

// Handle failed payment (new route)
router.post(
  "/handle-fail-response",
  isLoggedIn,
  verifyRole("Customer"),
  asyncErrorHandler(async (req, res) => {
    const { sessionId } = req.body;
    console.log(`Payment failed for session: ${sessionId}`);
    res.status(200).json({ success: false, message: "Payment failure logged" });
  })
);

// Update order status
router.put(
  "/update/:id",
  isLoggedIn,
  verifyRole("Restaurant"),
  asyncErrorHandler(orderController.updateOrderStatus)
);

// Pick up order
router.put(
  "/pick/:id",
  isLoggedIn,
  verifyRole("DeliveryMan"),
  asyncErrorHandler(orderController.pickOrder)
);

// Complete order
router.put(
  "/verify/:id",
  isLoggedIn,
  verifyRole("DeliveryMan"),
  asyncErrorHandler(orderController.completeOrder)
);

// Get past orders
router.get(
  "/past",
  isLoggedIn,
  verifyRole(["DeliveryMan", "Restaurant", "Customer"]),
  asyncErrorHandler(orderController.getPastOrders)
);

// Get current orders
router.get(
  "/current",
  isLoggedIn,
  verifyRole(["DeliveryMan", "Restaurant", "Customer"]),
  asyncErrorHandler(orderController.getCurrentOrders)
);

// Get prepared orders
router.get(
  "/prepared",
  isLoggedIn,
  verifyRole("DeliveryMan"),
  asyncErrorHandler(orderController.getPreparedOrders)
);

// Cancel order
router.put(
  "/cancel/:id",
  isLoggedIn,
  verifyRole("Customer"),
  asyncErrorHandler(orderController.cancelOrder)
);

// Get order distance
router.get(
  "/location",
  isLoggedIn,
  verifyRole(["Customer", "Restaurant", "DeliveryMan"]),
  asyncErrorHandler(orderController.getOrderDistance)
);

// Get delivery man's restaurant's prepared orders
router.get(
  "/currentOrders/:id",
  asyncErrorHandler(orderController.getPreparedOrderByDeliverymanId)
);

module.exports = router;






