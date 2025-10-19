import ProductEditor from "./ProductEditor";

// ✅ Fetch product via API
async function getProduct(id) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/products/${id}`, { cache: "no-store" });

  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

  return (
    <div className="container mx-auto p-6">
      <ProductEditor initialProduct={product} />
    </div>
  );
}

