import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";

if (!DB_URI) {
  throw new Error(
    `Please define the DB_URI environment variable inside ${
      NODE_ENV ? `.env.${NODE_ENV}.local` : ".env.development.local"
    }`
  );
}

let cachedConnection = null;
let connectionPromise = null;

const connectDB = async () => {
  if (cachedConnection) {
    return cachedConnection;
  }

  if (!connectionPromise) {
    connectionPromise = mongoose
      .connect(DB_URI, {
        dbName: "subdub",
        serverSelectionTimeoutMS: 5000,
      })
      .then((mongooseInstance) => {
        console.log("___ MongoDB connected ___");
        return mongooseInstance;
      })
      .catch((error) => {
        connectionPromise = null;
        throw error;
      });
  }

  cachedConnection = await connectionPromise;
  return cachedConnection;
};

export default connectDB;
