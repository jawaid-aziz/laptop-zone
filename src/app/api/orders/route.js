import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";

// GET all orders
export async function GET() {
  try {
    await dbConnect();
    const orders = await Order.find({})
      .populate("user", "name email")   // populate user details
      .populate("products.product", "name price"); // populate product details
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

// ADD new order
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    const newOrder = new Order(body);
    await newOrder.save();

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
