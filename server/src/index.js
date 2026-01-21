// import app from "./server.js";
// import Env from "./env/env.js";
// import mongoose from "mongoose";

// const PORT = Env.PORT || 5000;

// // Start server
// const server = app.listen(PORT, () => {
//   console.log(`🚀 Server is running on port ${PORT}`);
//   console.log(`📡 Environment: ${Env.NODE_ENV || "development"}`);
//   console.log(`📍 URL: http://localhost:${PORT}`);
// });

// // Graceful shutdown
// const shutdown = async (signal) => {
//   console.log(`${signal} received: shutting down gracefully`);

//   server.close(async () => {
//     console.log("🛑 HTTP server closed");

//     try {
//       await mongoose.connection.close();
//       console.log("🛑 MongoDB connection closed");
//       process.exit(0);
//     } catch (err) {
//       console.error("❌ Error closing MongoDB connection", err);
//       process.exit(1);
//     }
//   });
// };

// process.on("SIGINT", shutdown);
// process.on("SIGTERM", shutdown);
import dotenv from "dotenv";

dotenv.config();

import app from "./server.js";
import mongoose from "mongoose";
import Env from "./env/env.js";

console.log("MONGO_URI:", Env.MONGO_URI);

const connectDB = async () => {
  if (!Env.MONGO_URI) {
    console.warn("⚠️ MONGO_URI not provided, database connection skipped");
    return;
  }

  await mongoose.connect(Env.MONGO_URI);
  console.log("✅ MongoDB connected");
};

await connectDB();

const server = app.listen(Env.PORT, () => {
  console.log(`🚀 Server running on port ${Env.PORT}`);
});
