

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import Env from "./env/env.js";
import mailRoutes from "./routes/mail.js";

dotenv.config();

const app = express();

/* =========================
    CORS — MUST BE FIRST
========================= */

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Preflight
app.options("*", cors());

/* =========================
   Middlewares
========================= */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =========================
   Routes
========================= */

app.use("/api/mail", mailRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

/* =========================
   DB (optional)
========================= */

if (Env.MONGO_URI) {
  mongoose
    .connect(Env.MONGO_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB error:", err));
}

/* =========================
   Error handling
========================= */

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;
