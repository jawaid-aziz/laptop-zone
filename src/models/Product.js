import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: String,
  stock: { type: Number, default: 0 },
  description: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  oldPrice: { type: Number, required: false },
  newPrice: { type: Number, required: true },
  images: [String],
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);