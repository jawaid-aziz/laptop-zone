"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        toast({
          title: "❌ Error",
          description: "Failed to load products.",
          variant: "destructive",
        });
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="bg-white">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-6 py-2 text-sm text-gray-500">
        Home <span className="mx-2">›</span> Shop
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-center py-8">Shop</h1>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <aside className="md:col-span-1 space-y-6">
          <Accordion type="single" collapsible>
            <AccordionItem value="category">
              <AccordionTrigger>Category</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 text-sm">
                  <li>Laptops</li>
                  <li>Accessories</li>
                  <li>Bags</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="price">
              <AccordionTrigger>Price</AccordionTrigger>
              <AccordionContent>
                <input
                  type="range"
                  min="20000"
                  max="150000"
                  className="w-full"
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="flex gap-2 flex-col">
            <Button className="w-full">Filter</Button>
            <Button variant="outline" className="w-full">
              Reset Filter
            </Button>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="md:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-gray-600">
              Showing {products.length} products
            </p>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Default sorting" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default sorting</SelectItem>
                <SelectItem value="priceLowHigh">Price: Low → High</SelectItem>
                <SelectItem value="priceHighLow">Price: High → Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link key={product._id} href={`/shop/${product._id}`}>
                <Card className="relative group cursor-pointer hover:shadow-lg transition">
                  {/* Image wrapper */}
                  <div className="relative w-full h-48 bg-gray-100 flex items-center justify-center rounded-t-lg overflow-hidden">
                    {product.stock === 0 && (
                      <Badge className="absolute top-2 left-2 bg-gray-800 text-white">
                        SOLD OUT
                      </Badge>
                    )}

                    <Image
                      src={product.images?.[0] || "/placeholder.png"}
                      alt={product.name}
                      width={200}
                      height={200}
                      className="object-contain"
                    />
                  </div>

                  {/* Product Info */}
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm font-medium line-clamp-2">
                      {product.name}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {product.oldPrice && (
                        <span className="line-through mr-2 text-gray-400">
                          Rs{product.oldPrice}
                        </span>
                      )}
                      Rs{product.newPrice}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>

          {/* Load More */}
          <div className="flex justify-center py-10">
            <Button variant="outline">Load More</Button>
          </div>
        </div>
      </div>

      <Separator className="my-10 max-w-7xl mx-auto" />
    </div>
  );
}
