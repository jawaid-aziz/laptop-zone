"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";

export default function OrderConfirmationPage({params}) {
  const { id } = params;
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const res = await fetch(`/api/orders/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch order");
        }
        const data = await res.json();
        console.log(data)
        setOrder(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <span className="ml-2">Loading your order...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 font-semibold mt-12">
        {error}
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center text-muted-foreground mt-12">
        Order not found.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">
        🎉 Order Confirmation
      </h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Order Details</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="space-y-3 pt-6">
          <p>
            <span className="font-semibold">Order ID:</span> {order.orderId}
          </p>
          <p>
            <span className="font-semibold">Customer:</span>{" "}
            {order.firstName} {order.lastName}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {order.email}
          </p>
          <p>
            <span className="font-semibold">Address:</span>{" "}
            {order.address}, {order.city}, {order.country},{" "}
            {order.postalCode}
          </p>
          <p>
            <span className="font-semibold">Status:</span>{" "}
            <span className="capitalize">{order.status}</span>
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6 space-y-6">
          {order.products.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between border-b pb-4 last:border-none"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.product.images?.[0]}
                  alt={item.product.name}
                  className="h-16 w-16 rounded-md object-cover"
                />
                <div>
                  <p className="font-semibold">{item.product.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Quantity: {item.quantity}
                  </p>
                </div>
              </div>
              <p className="font-semibold">Rs. {order.totalPrice}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="text-center mt-10 text-lg font-semibold">
        ✅ Thank you for shopping with{" "}
        <span className="text-primary">Laptop Zone</span>!
      </div>
    </div>
  );
}
