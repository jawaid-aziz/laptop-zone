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

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    // Destructure incoming order data
    const { firstName, lastName, email, address, city, country, postalCode, phone, products, totalPrice, status } = body;

    if (!products || products.length === 0) {
      return NextResponse.json({ error: "No products in order" }, { status: 400 });
    }

    // ✅ Ensure all product fields are preserved and validated
    const orderProducts = products.map((item) => ({
      product: item.product,
      quantity: item.quantity || 1,
      basePrice: Number(item.basePrice) || 0,
      finalPrice: Number(item.finalPrice) || 0,
      selectedVariants: item.selectedVariants || [],
    }));

    const newOrder = new Order({
      firstName,
      lastName,
      email,
      address,
      city,
      country,
      postalCode,
      phone,
      products: orderProducts,
      totalPrice,
      status: status || "pending",
    });

    await newOrder.save();

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}