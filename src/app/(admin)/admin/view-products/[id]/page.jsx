import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import Image from "next/image";

// ✅ Fetch product via API
async function getProduct(id) {
    const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"; // fallback for dev
  const res = await fetch(`${baseUrl}/api/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
}

export default async function ProductPage({ params }) {
  const { id } = await params;

  const product = await getProduct(id);

  return (
    <div className="container mx-auto p-6">
      <Card className="shadow-lg">
        {/* Product Header */}
        <CardHeader>
          <CardTitle className="text-2xl">{product.name}</CardTitle>
          <p className="text-muted-foreground">{product.brand}</p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Images */}
          {product.images?.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {product.images.map((src, i) => (
                <Image
                  key={i}
                  src={src}
                  alt={product.name}
                  width={300}
                  height={200}
                  className="rounded-xl object-cover"
                />
              ))}
            </div>
          )}

          <Separator />

          {/* Prices */}
          <div className="flex items-center gap-4">
            {product.oldPrice && (
              <span className="line-through text-muted-foreground">
                ${product.oldPrice}
              </span>
            )}
            <span className="text-xl font-bold text-green-600">
              ${product.newPrice}
            </span>
          </div>

          {/* Overview */}
          {product.overview && (
            <p className="text-sm leading-relaxed">{product.overview}</p>
          )}

          {/* Tags */}
          {product.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag, i) => (
                <Badge key={i} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <Separator />

          {/* Specifications */}
          {product.specifications?.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Specifications</h3>
              <Table>
                <TableBody>
                  {product.specifications.map((spec, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{spec.key}</TableCell>
                      <TableCell>{spec.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          <Separator />

          {/* Key Features */}
          {product.keyFeatures && (
            <div>
              <h3 className="font-semibold mb-2">Key Features</h3>
              <Table>
                <TableBody>
                  {Object.entries(product.keyFeatures).map(
                    ([key, value], i) =>
                      value && (
                        <TableRow key={i}>
                          <TableCell className="capitalize font-medium">
                            {key.replace(/([A-Z])/g, " $1")}
                          </TableCell>
                          <TableCell>{value}</TableCell>
                        </TableRow>
                      )
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
