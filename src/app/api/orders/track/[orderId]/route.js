// src/app/api/orders/track/[orderId]/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";

export async function GET(req, { params }) {
    try {
        await dbConnect();
        const { orderId } = params;

        const order = await Order.findOne({ orderId }).populate("items.product"); if (!order) {
            return NextResponse.json({ message: "Order not found" }, { status: 404 });
        }

        return NextResponse.json(order, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error fetching order", error }, { status: 500 });
    }
}
