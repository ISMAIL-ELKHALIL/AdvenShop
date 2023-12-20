// Import necessary modules and initialize environment variables
import express, { urlencoded, json } from "express";
import { config } from "dotenv";
config();

// Connect to MongoDB Atlas
import connectDB from "./config/db.js";
connectDB();

// Import route handlers and error middleware
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";

// Import additional middleware for logging, parsing, and handling cookies
import morgan from "morgan";
import cookieParser from "cookie-parser";

// Define the port for the server
const port = process.env.PORT || 4000;

// Initialize the Express app
const app = express();

// Logging Middleware
app.use(morgan("dev"));

// Body parser Middlewares
app.use(json());
app.use(urlencoded({ extended: true }));

// Cookie Parser Middleware
app.use(cookieParser());

// API Routes
app.get("/", (req, res) => {
  res.status(200).send("API is running");
});

// PayPal API
app.get("/api/config/paypal", (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});

// Route handlers for products, users, and orders
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/categories", categoryRoutes);

// Error handling Middleware
app.use(notFound, errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
