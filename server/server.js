import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import path from "path";
import userRoutes from "./routes/userRoutes.js";
import productRoute from "./routes/productRoutes.js";

import orderRoute from "./routes/orderRoutes.js";
const __dirname = path.resolve();
dotenv.config();

connectDB();

const app = express();
app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api/users", userRoutes);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in  mode on port ${PORT}`));
