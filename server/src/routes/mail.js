import express from "express";
import { sendWelcomeMail } from "../utils/sendMail.js";

const router = express.Router();

router.post("/welcome", async (req, res) => {
  const { email, name } = req.body;

  try {
    await sendWelcomeMail(email, name);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false });
  }
});

export default router;
