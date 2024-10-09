import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

export async function dbConnection() {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
  } catch (error) {
    console.log("Error in dbConnection file", error);
    process.exit(1);
  }
}
