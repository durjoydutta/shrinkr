import { MONGO_URI } from "../config/env.config.js";
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB disconnected");
    });
    mongoose.connection.on("error", (error) => {
      console.error("DATABASE CONNECTION ERROR:", error.message);
    });
    const res = await mongoose.connection.db.admin().command({ ping: 1 });
    if (res.ok) console.log("Pinged the deployment. Successfully connected to MongoDB!");
    else throw new Error("Failed to ping MongoDB deployment");
  } catch (error) {
    console.error("DATABASE CONNECTION ERROR:", error.message);
    throw error;
  }
};

export default connectDB;
