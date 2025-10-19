"use client";
import OrderEditor from "./OrderEditor";
import { use, useState } from "react";
import { Loader2 } from "lucide-react";

async function getOrder(id) {
   const [loading, setLoading] = useState(true);

    if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/orders/${id}`, { cache: "no-store" });
  
  if (!res.ok) throw new Error("Failed to fetch order");
  setLoading(false);
  return res.json();
}

export default async function OrderPage({ params }) {
  const { id } = await params;
  const order = await getOrder(id);

  return (
    <div className="container mx-auto p-6">
      <OrderEditor initialOrder={order} />
    </div>
  );
}
