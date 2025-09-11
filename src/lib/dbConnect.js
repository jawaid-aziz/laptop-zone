import mongoose from "mongoose";

let isConnected = false; // Track the connection state

async function dbConnect() {
  if (isConnected) {
    // If already connected, use existing connection
    return;
  }

  try {
    // Replace with your local MongoDB URL
    const mongoURI = "mongodb://127.0.0.1:27017/laptop-zone";

    const db = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = db.connections[0].readyState;
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
}

export default dbConnect;
