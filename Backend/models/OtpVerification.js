const mongoose = require("mongoose");

const OtpVerificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, required: true },
  expiresAt: { type: Date, required: true },
});

module.exports = mongoose.model("OtpVerification", OtpVerificationSchema);
