import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";

// ✅ GET single order
export async function GET(req, { params }) {
  try {
    await dbConnect();
    const order = await Order.findById(params.id).populate(
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

// ✅ UPDATE order (recalculate totalPrice when quantities change)
export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const body = await req.json();

    // Recalculate total price based on product prices × quantities
    let totalPrice = 0;

    if (body.products && Array.isArray(body.products)) {
      for (const item of body.products) {
        const unitPrice =
          item.product?.newPrice || item.newPrice || 0; // unit price from populated product or body
        const quantity = item.quantity || 1;
        totalPrice += unitPrice * quantity;
      }
    }

    body.totalPrice = totalPrice;

    const updated = await Order.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    }).populate("products.product", "name newPrice images");

    if (!updated) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
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
    const deleted = await Order.findByIdAndDelete(params.id);

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

// PATCH: Update order status (e.g., "pending" → "shipped" → "delivered")
export async function PATCH(req, { params }) {
  try {
    await dbConnect();
    const { status } = await req.json();

    if (!status) {
      return NextResponse.json(
        { error: "Status is required" },
        { status: 400 }
      );
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      params.id,
      { status },
      { new: true, runValidators: true }
    ).populate("products.product", "name newPrice images");

    if (!updatedOrder) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedOrder, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update order status" },
      { status: 500 }
    );
  }
}
