import ProductDetails from "./ProductDetails";

async function getProduct(id) {
  
const [loading, setLoading] = useState(true);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"; // or your deployed URL
    if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  const res = await fetch(`${baseUrl}/api/products/${id}`, {
    cache: "no-store", // important for fresh data
  });
  setLoading(false);
  return res.json();
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

  return (
    <>
      <ProductDetails product={product} />
    </>
  );
}
