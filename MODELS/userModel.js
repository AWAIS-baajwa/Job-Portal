import mongoose, { Schema } from "mongoose";
import isEmail from "validator/lib/isEmail.js";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      min: 3,
      max: 50,
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      min: 3,
      max: 50,
      trim: true,
    },
    userName: {
      type: String,
      required: [true, "Username is required"],
      min: 3,
      max: 50,
      unique: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      min: 12,
      max: 100,
      unique: true,
      lowercase: true,
      validator: isEmail,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    coverImage: {
      type: String,
      required: [true, "Cover Image is required"],
    },
    category: {
      type: String,
      enum: ["employee", "employer"],
      required: [true, "Choose employee or employer"],
      lowercase: true,
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const User = new mongoose.model("User", userSchema);
