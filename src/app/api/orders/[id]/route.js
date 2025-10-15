import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";
import Product from "@/models/Product";

// ✅ GET single order
export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const order = await Order.findById(id).populate(
      "products.product",
      "name newPrice images"
    );

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 });
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
      selectedVariants: item.selectedVariants || [], // ✅ preserve variant list
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


// ✅ UPDATE order (recalculate totalPrice when quantities change)
export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await req.json();

    const existingOrder = await Order.findById(id).populate("products.product");
    if (!existingOrder) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const updated = await Order.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }).populate("products.product", "name newPrice images");

    if (
      body.status === "cancelled" &&
      existingOrder.status !== "cancelled" &&
      updated.products
    ) {
      for (const item of updated.products) {
        const product = await Product.findById(item.product._id);
        if (product) {
          product.stock += item.quantity;
          await product.save();
        }
      }
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}

// ✅ DELETE order
export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const deleted = await Order.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Order deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting order:", error);
    return NextResponse.json({ error: "Failed to delete order" }, { status: 500 });
  }
}

// ✅ PATCH: Update order status
export async function PATCH(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const { status } = await req.json();

    if (!status) {
      return NextResponse.json({ error: "Status is required" }, { status: 400 });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    ).populate("products.product", "name newPrice images");

    if (!updatedOrder) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(updatedOrder, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update order status" },
      { status: 500 }
    );
  }
}
