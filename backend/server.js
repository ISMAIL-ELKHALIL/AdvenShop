import express, { urlencoded, json } from "express";
import { config } from "dotenv";
config();
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";
const port = process.env.PORT ?? 4000;
connectDB(); //! connect to Mongodb atlas
const app = express();
// Logging Middleware
app.use(morgan("dev"));
// Body parser Middlewares
app.use(json());
app.use(urlencoded({ extended: true }));
// Cookie Parser Middleware
app.use(cookieParser());
//API Routes
app.get("/", (req, res) => {
  res.status(200).send("API is running ");
});
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
// Error handling Middleware
app.use(notFound, errorHandler);
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
