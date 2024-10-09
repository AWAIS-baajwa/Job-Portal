import mongoose, { Schema } from "mongoose";
import { User } from "./userModel.js";

const jobSchema = new Schema(
  {
    employer_id: {
      type: mongoose.Types.ObjectId,
      ref: User,
      required: [true, "User id is required"],
    },
    title: {
      type: String,
      required: [true, "Title of job is required"],
      trim: true,
      min: 3,
      max: 100,
    },
    description: {
      type: String,
      required: [true, "Responsiblities and description of job"],
      min: 3,
      max: 500,
      trim: true,
    },
    type: {
      type: String,
      required: [true, "Type of job is required"], //full-time,part-time,internship
      trim: true,
    },
    companyName: {
      type: String,
      trim: true,
      min: 3,
      max: 100,
    },
    companyDescription: {
      type: String,
      trim: true,
      min: 3,
      max: 255,
    },
    location: {
      type: String,
      required: [true, "Location of job is required"],
      trim: true,
      min: 3,
      max: 150,
    },
    salary: {
      type: Number,
      required: [true, "Starting salary is required"],
    },
    experience: {
      type: String,
      trim: true,
    },
    skills: {
      type: [String],
      required: [true, "Skills are required"],
    },
    education: {
      type: String,
      required: [true, "Bachlor degree required"],
    },
    deadLine: {
      type: Date,
      required: [true, "Last date for application submission"],
    },
    email: {
      type: String,
      required: [
        true,
        "Link to apply for job or email where the application should be sent",
      ],
      trim: true,
      min: 3,
      max: 150,
    },
  },
  {
    timestamps: true,
  }
);

export const Job = new mongoose.model("Job", jobSchema);
