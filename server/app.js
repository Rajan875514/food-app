


require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");
const cloudinary = require("cloudinary").v2;






const {
  DB_CONNECTION_STRING,
  PORT,
  LOCALHOST_ORIGIN,
  CLOUDINARY_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = require("./config/appConfig");
require("dotenv").config();
const config = require("./config/appConfig.js");
// ... rest of your server setup

// Routes
const authRoutes = require("./routes/Auths");
const restaurantsRoutes = require("./routes/Restaurants");
const deliveryManRoutes = require("./routes/DeliveryMen");
const customerRoutes = require("./routes/Customers");
const orderRoutes = require("./routes/Orders");

// Initialize Express app
const app = express();
const server = require("http").createServer(app); // Create HTTP server for Socket.IO
const io = require("socket.io")(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket", "polling"],
});

// Connect to MongoDB
mongoose
  .connect(DB_CONNECTION_STRING, { useUnifiedTopology: true })
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.error("Error connecting to database:", err.message));

// Cloudinary Configuration
cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.set("trust proxy", true);

// EJS Setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/restaurants", restaurantsRoutes);
app.use("/api/v1/deliveryman", deliveryManRoutes);
app.use("/api/v1/customer", customerRoutes);
app.use("/api/v1/order", orderRoutes);

// Test EJS Routes
app.get("/resboard", (req, res) => res.render("resupdate"));
app.get("/cusboard", (req, res) => res.render("cusview"));
app.get("/api/auth/signup", (req, res) => res.render("signupForm"));
app.get("/test", (req, res) => res.render("test"));

// Socket.IO Setup
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

// Start Server
server.listen(PORT, () => {
  console.log(`Server running at port: ${PORT}`);
});

module.exports = { io, app, server, express, cloudinary };






























// require("dotenv").config();

// const express = require("express");
// const mongoose = require("mongoose");
// const cookieParser = require("cookie-parser");
// const cors = require("cors");
// const fileUpload = require("express-fileupload");
// const path = require("path");
// const cloudinary = require("cloudinary").v2;

// const {
//   DB_CONNECTION_STRING,
//   PORT,
//   LOCALHOST_ORIGIN,
//   CLOUDINARY_NAME,
//   CLOUDINARY_API_KEY,
//   CLOUDINARY_API_SECRET,
// } = require("./config/appConfig");

// // Routes
// const authRoutes = require("./routes/Auths");
// const restaurantsRoutes = require("./routes/Restaurants");
// const deliveryManRoutes = require("./routes/DeliveryMen");
// const customerRoutes = require("./routes/Customers");
// const orderRoutes = require("./routes/Orders");

// // Initialize Express app
// const app = express();
// const server = require("http").createServer(app);
// const io = require("socket.io")(server, {
//   cors: {
//     origin: ["http://localhost:5173", "http://localhost:5174"],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   },
//   transports: ["websocket", "polling"],
// });

// // Connect to MongoDB
// mongoose
//   .connect(DB_CONNECTION_STRING, { useUnifiedTopology: true })
//   .then(() => console.log("Connected to Database"))
//   .catch((err) => console.error("Error connecting to database:", err.message));

// // Cloudinary Configuration
// cloudinary.config({
//   cloud_name: CLOUDINARY_NAME,
//   api_key: CLOUDINARY_API_KEY,
//   api_secret: CLOUDINARY_API_SECRET,
// });

// // console.log("Cloudinary Name from config:", CLOUDINARY_NAME);
// // console.log("Cloudinary API Key from config:", CLOUDINARY_API_KEY);
// // console.log("Cloudinary API Secret from config:", CLOUDINARY_API_SECRET);

// // Middlewares
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(
//   cors({
//     origin: ["http://localhost:5173", "http://localhost:5174"],
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//   })
// );
// app.use(cookieParser());
// app.use(
//   fileUpload({
//     useTempFiles: true,
//     tempFileDir: "/tmp/",
//   })
// );
// app.set("trust proxy", true);

// // EJS Setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");

// // Routes
// app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/restaurants", restaurantsRoutes);
// app.use("/api/v1/deliveryman", deliveryManRoutes);
// app.use("/api/v1/customer", customerRoutes);
// app.use("/api/v1/order", orderRoutes);

// // Test EJS Routes
// app.get("/resboard", (req, res) => res.render("resupdate"));
// app.get("/cusboard", (req, res) => res.render("cusview"));
// app.get("/api/auth/signup", (req, res) => res.render("signupForm"));
// app.get("/test", (req, res) => res.render("test"));

// // Handle 404 for unhandled API routes
// app.use("/api/*", (req, res) => {
//   res.status(404).json({ success: false, error: "API Route Not Found" });
// });

// // Socket.IO Setup
// io.on("connection", (socket) => {
//   console.log("A user connected:", socket.id);
//   socket.on("disconnect", () => {
//     console.log("A user disconnected:", socket.id);
//   });
// });

// // Start Server
// server.listen(PORT, () => {
//   console.log(`Server running at port: ${PORT}`);
// });

// module.exports = { io, app, server, express, cloudinary };