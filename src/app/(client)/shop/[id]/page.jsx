import ProductDetails from "./ProductDetails";

async function getProduct(id) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"; // or your deployed URL
  const res = await fetch(`${baseUrl}/api/products/${id}`, {
    cache: "no-store", // important for fresh data
  });

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
