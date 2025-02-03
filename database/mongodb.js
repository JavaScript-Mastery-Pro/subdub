import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";

if (!DB_URI) {
  throw new Error(
    `Please define the DB_URI environment variable inside ${
      NODE_ENV ? `.env.${NODE_ENV}.local` : ".env.development.local"
    }`
  );
}

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI, {
      dbName: "subdub",
    });
    console.log("___ MongoDB connected ___");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
