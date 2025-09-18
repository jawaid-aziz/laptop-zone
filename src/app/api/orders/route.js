import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";
import Product from "@/models/Product";

// ✅ GET all orders
export async function GET() {
  try {
    await dbConnect();
    // no need to populate user since user model is removed
    const orders = await Order.find({}).populate(
      "products.product",
      "name newPrice images" // show only what you need
    );

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

// ✅ ADD new order
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    // explicitly construct order to prevent unwanted fields injection
    const newOrder = new Order({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      address: body.address,
      city: body.city,
      country: body.country,
      postalCode: body.postalCode,
      phone: body.phone,
      products: body.products, // [{ product: productId, quantity }]
      totalPrice: body.totalPrice,
      status: body.status || "pending",
    });

    await newOrder.save();

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
