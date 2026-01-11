import jwt from "jsonwebtoken";
import Env from "../env/env.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  // TODO: Replace with real user validation
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  const token = jwt.sign(
    { id: "demo-user-id" },
    Env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: Env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    success: true,
    message: "Login successful",
  });
};

export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
  });

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};
