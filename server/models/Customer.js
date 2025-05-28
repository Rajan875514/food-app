// const mongoose = require("mongoose");

// const customerSchema = new mongoose.Schema({
//     user_id: {
//         type: mongoose.SchemaTypes.ObjectId,
//         ref: "User",
//         required: [true, "User Not Registered"]
//     },
//     currentOrders: [
//         {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "Order"
//         }
//     ],
//     pastOrders: [
//         {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "Order"
//         }
//     ],
//     location: {
//         latitude: String,
//         longitude: String
//     }
// }, { versionKey: false });

// customerSchema.path("currentOrders").default([]);
// customerSchema.path("pastOrders").default([]);

// const Customer = mongoose.model("Customer", customerSchema);
// module.exports = Customer;














const mongoose = require("mongoose");
const customerSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User Not Registered"]
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  currentOrders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order"
    }
  ],
  pastOrders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order"
    }
  ],
  location: {
    latitude: String,
    longitude: String
  }
}, { versionKey: false });


customerSchema.path("currentOrders").default([]);
customerSchema.path("pastOrders").default([]);

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
















