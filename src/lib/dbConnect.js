import mongoose from "mongoose";

let isConnected = false; // Track the connection state

async function dbConnect() {
  if (isConnected) return;

  if (mongoose.connection.readyState >= 1) {
    isConnected = true;
    return;
  }

  try {
    // ✅ Use environment variable instead of hardcoding
    const mongoURI = "mongodb+srv://mangoManMongo:secret-hai@cluster0.m9e0vmr.mongodb.net/laptop-zone?retryWrites=true&w=majority&appName=Cluster0";

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
