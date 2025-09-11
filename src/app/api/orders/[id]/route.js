import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";

// GET single order
export async function GET(req, { params }) {
  try {
    await dbConnect();
    const order = await Order.findById(params.id)
      .populate("user", "name email")
      .populate("products.product", "name price");
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 });
  }
}

// UPDATE order (e.g., change status)
export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const body = await req.json();

    const updated = await Order.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    })
      .populate("user", "name email")
      .populate("products.product", "name price");

    if (!updated) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}

// DELETE order
export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const deleted = await Order.findByIdAndDelete(params.id);

    if (!deleted) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Order deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete order" }, { status: 500 });
  }
}
