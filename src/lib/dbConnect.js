import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
let isConnected = false; // Track the connection state

async function dbConnect() {
  if (isConnected) return;

  if (mongoose.connection.readyState >= 1) {
    isConnected = true;
    return;
  }

  try {
    // ✅ Use environment variable instead of hardcoding
    const mongoURI = process.env.MONGO_URL;

    if (!mongoURI) {
      throw new Error("❌ MONGODB_URI is not defined in .env.local");
    }

    const db = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = db.connections[0].readyState;
    console.log("✅ MongoDB connected online");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
}

export default dbConnect;
