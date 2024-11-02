import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.debug("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export const pingDB = async () => {
  try {
    await mongoose.connection.db.admin().ping();
  } catch (error) {
    console.error("MongoDB ping error:", error);
    process.exit(1);
  }
};
