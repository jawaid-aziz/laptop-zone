import OrderEditor from "./OrderEditor";

// ✅ Fetch order via API
async function getOrder(id) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/orders/${id}`, { cache: "no-store" });
  
  if (!res.ok) throw new Error("Failed to fetch order");
  return res.json();
}

export default async function OrderPage({ params }) {
  const order = await getOrder(params.id);
  console.log(order)

  return (
    <div className="container mx-auto p-6">
      <OrderEditor initialOrder={order} />
    </div>
  );
}
