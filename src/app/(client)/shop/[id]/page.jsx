
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

// ✅ Fetch product using your API
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
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Breadcrumbs */}
      <div className="text-sm text-gray-500 mb-4">
        Home <span className="mx-2">›</span> Shop{" "}
        <span className="mx-2">›</span> {product.name}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left: Image */}
        <div className="relative">
          {product.stock === 0 && (
            <Badge className="absolute top-2 left-2 bg-gray-800 text-white">
              SOLD OUT
            </Badge>
          )}
          <Image
            src={product.images?.[0] || "/placeholder.png"}
            alt={product.name}
            width={600}
            height={400}
            className="rounded-lg object-contain w-full h-auto"
          />
        </div>

        {/* Right: Info */}
        <div>
          <h2 className="text-sm uppercase text-gray-500">{product.brand}</h2>
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>

          {/* Price */}
          <div className="flex items-center gap-3 mb-3">
            {product.oldPrice && (
              <span className="line-through text-gray-400 text-lg">
                Rs{product.oldPrice}
              </span>
            )}
            <span className="text-blue-600 font-bold text-2xl">
              Rs{product.newPrice}
            </span>
            {product.stock === 0 && (
              <span className="text-sm text-gray-500">(Out of stock)</span>
            )}
          </div>

          {/* Add to Cart Button */}
          <div className="mb-4">
            <Button
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition"
              disabled={product.stock === 0}
            >
              {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </Button>
          </div>

          {/* Tags */}

          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 mb-4">
            {product.tags?.length > 0 ? (
              product.tags.map((tag, i) => <li key={i}>{tag}</li>)
            ) : (
              <li className="text-gray-500">No tags available</li>
            )}
          </ul>

          <p className="text-sm text-gray-700 mb-2">
            <strong>Category:</strong>{" "}
            {product.category?.name || "Uncategorized"}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="description" className="w-full">
          <TabsList>
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="reviews">Reviews (0)</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="pt-6">
            {/* Specifications Table */}
            {product.specifications?.length > 0 && (
              <table className="w-full border text-sm text-left mb-8">
                <tbody>
                  {product.specifications.map((spec, i) => (
                    <tr key={i} className="border">
                      <td className="p-2 font-medium">{spec.key}</td>
                      <td className="p-2">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* Overview */}
            {product.overview && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Overview</h3>
                <p className="text-gray-700">{product.overview}</p>
              </div>
            )}

            {/* Key Features */}
            {product.keyFeatures &&
              Object.values(product.keyFeatures).some((val) => val) && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">Key Features</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {Object.entries(product.keyFeatures).map(
                      ([key, value]) =>
                        value && (
                          <li key={key}>
                            <span className="font-medium capitalize">
                              {key.replace(/([A-Z])/g, " $1")}:
                            </span>{" "}
                            {value}
                          </li>
                        )
                    )}
                  </ul>
                </div>
              )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
