import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, required: true },
    },
  ],
  totalPrice: Number,
  status: { type: String, enum: ["pending", "shipped", "delivered"], default: "pending" },
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
