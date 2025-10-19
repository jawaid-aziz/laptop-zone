import ProductEditor from "./ProductEditor";
import { Loader2 } from "lucide-react";
// ✅ Fetch product via API
async function getProduct(id) {
  const [loading, setLoading] = useState(true);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }
  const res = await fetch(`${baseUrl}/api/products/${id}`, { cache: "no-store" });

  if (!res.ok) throw new Error("Failed to fetch product");
  setLoading(false);
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

