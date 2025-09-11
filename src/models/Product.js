import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: String,
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  description: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  oldPrice: Number,
  newPrice: Number,
  images: [String],
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);