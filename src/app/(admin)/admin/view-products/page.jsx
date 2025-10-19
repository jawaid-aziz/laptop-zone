"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast({
          variant: "destructive",
          title: "❌ Failed to fetch products",
          description: error.message,
        });
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-6 bg-[#f5f7fa]">
      {products.map((product) => (
        <Link
          key={product._id}
          href={`/admin/view-products/${product._id}`} // 👈 dynamic route
          className="block hover:scale-[1.02] transition-transform"
        >
          <Card
            key={product._id}
            className="shadow-lg rounded-2xl border border-gray-200"
          >
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3">
                {product.images?.[0] && (
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    width={60}
                    height={60}
                    className="rounded-lg object-cover"
                  />
                )}
                <div>
                  <h3 className="text-lg font-semibold text-navy-900">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {product.category?.name || "Uncategorized"}
                  </p>
                </div>
              </CardTitle>
              <Badge className="bg-black text-white">
                ₨ {product.newPrice}
              </Badge>
            </CardHeader>

            <Separator className="my-3" />

            <CardContent>
              <div className="text-sm text-gray-600 flex justify-between">
                <span className="font-medium">Stock</span>
                <span>{product.stock}</span>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
