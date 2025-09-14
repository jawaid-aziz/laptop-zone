import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: String,
    stock: { type: Number, default: 0 },
    overview: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    oldPrice: { type: Number },
    newPrice: { type: Number, required: true },
    images: [String],

    tags: [String],

    specifications: [
      {
        key: { type: String },   // e.g. "Weight"
        value: { type: String }, // e.g. "1.2kg"
      },
    ],

    // 4) Key features (limited structured fields)
    keyFeatures: {
      processor: { type: String },
      memory: { type: String },
      storage: { type: String },
      display: { type: String },
      graphics: { type: String },
      buildAndDesign: { type: String },
      connectivity: { type: String },
      securityFeatures: { type: String },
      battery: { type: String },
      operatingSystem: { type: String },
      keyboardAndUsability: { type: String },
      additionalFeatures: { type: String },
      warrantyAndSupport: { type: String },
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
