import express from "express";
import Env from "./env/env.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

/* =========================
   Middleware
========================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* =========================
   CORS (Cookie-based Auth)
========================= */
const allowedOrigin =
  Env.NODE_ENV === "production"
    ? Env.CORS_ORIGIN_PROD
    : Env.CORS_ORIGIN_DEV;

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true, // ⭐ VERY IMPORTANT
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

/* =========================
   Database Connection
========================= */
if (Env.MONGO_URI) {
  mongoose
    .connect(Env.MONGO_URI)
    .then(() => {
      console.log("✅ Connected to MongoDB");
    })
    .catch((error) => {
      console.error("❌ MongoDB connection error:", error);
    });
} else {
  console.warn("⚠️  MONGO_URI not provided, database connection skipped");
}

/* =========================
   Routes
========================= */
app.get("/", (req, res) => {
  res.json({
    message: "Car Rental API Server",
    status: "running",
    version: "1.0.0",
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
  });
});

// 🔐 Future secure routes
// app.use("/api/auth", authRoutes);

/* =========================
   404 Handler
========================= */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl,
  });
});

/* =========================
   Error Handler
========================= */
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    ...(Env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

export default app;
