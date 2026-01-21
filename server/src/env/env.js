// import "dotenv/config"

// const Env = {
//     "NODE_ENV": process.env.NODE_ENV || "development",
//     "PORT": process.env.PORT || "5000",
//     "MONGO_URI": process.env.MONGO_URI || "",
//     "JWT_SECRET": process.env.JWT_SECRET || "your-secret-key-change-in-production",
//     "CORS_ORIGIN_DEV": process.env.CORS_ORIGIN_DEV || "http://localhost:5173",
//     "CORS_ORIGIN_PROD": process.env.CORS_ORIGIN_PROD || "https://car-rental-eight-eta.vercel.app",
// }

// export default Env;
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// ESM compatible __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

// DEBUG LOGS (REMOVE LATER IF YOU WANT)



// Centralized Env Object
const Env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
};

export default Env;
