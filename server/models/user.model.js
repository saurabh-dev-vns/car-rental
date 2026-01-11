import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false, // 🔐 VERY IMPORTANT
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
