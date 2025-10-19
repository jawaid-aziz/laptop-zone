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
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: "all",
    brand: "all",
    minPrice: 0,
    maxPrice: 500000,
    sort: "default",
  });
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  async function fetchProducts() {
    try {
      setLoading(true);
      const query = new URLSearchParams({
        category: filters.category,
        brand: filters.brand,
        minPrice: filters.minPrice.toString(),
        maxPrice: filters.maxPrice.toString(),
        sort: filters.sort,
      });

      const res = await fetch(`/api/products?${query.toString()}`);
      const data = await res.json();

      if (Array.isArray(data)) {
        setProducts(data);
        setDisplayedProducts(data);
      } else {
        setProducts([]);
        toast({
          title: "❌ Error",
          description: "Unexpected response format.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "❌ Error",
        description: "Failed to load products.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSortChange = (value) => {
    setFilters((f) => ({ ...f, sort: value }));

    if (value === "default") {
      setDisplayedProducts(products);
      return;
    }

    let sorted = [...products];
    if (value === "priceLowHigh") sorted.sort((a, b) => a.newPrice - b.newPrice);
    else if (value === "priceHighLow") sorted.sort((a, b) => b.newPrice - a.newPrice);

    setDisplayedProducts(sorted);
  };

  const handleReset = () => {
    setFilters({
      category: "all",
      brand: "all",
      minPrice: 0,
      maxPrice: 500000,
      sort: "default",
    });
  };

  // 🔹 Skeleton Loader Component
  const ProductSkeleton = () => (
    <div className="animate-pulse">
      <div className="w-full h-48 bg-gray-200 rounded-t-lg mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-6 py-2 text-sm text-gray-500">
        Home <span className="mx-2">›</span> Shop
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-center py-8">Shop</h1>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <aside className="md:col-span-1 space-y-6 sticky top-20 self-start">
          <Accordion type="single" collapsible>
            <AccordionItem value="category">
              <AccordionTrigger>Category</AccordionTrigger>
              <AccordionContent>
                {[
                  { label: "All", value: "all" },
                  { label: "Laptops", value: "68cfc17823d21a3c625463dc" },
                  { label: "Laptop Accessories", value: "68cfc18523d21a3c625463de" },
                  { label: "Laptop Bags", value: "68cfc18e23d21a3c625463e0" },
                ].map((cat) => (
                  <Button
                    key={cat.value}
                    variant={filters.category === cat.value ? "default" : "outline"}
                    className="w-full mb-2"
                    onClick={() => setFilters((f) => ({ ...f, category: cat.value }))}
                  >
                    {cat.label}
                  </Button>
                ))}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="brand">
              <AccordionTrigger>Brand</AccordionTrigger>
              <AccordionContent>
                {["all", "HP", "Dell", "Lenovo", "Apple"].map((br) => (
                  <Button
                    key={br}
                    variant={filters.brand === br ? "default" : "outline"}
                    className="w-full mb-2"
                    onClick={() => setFilters((f) => ({ ...f, brand: br }))}
                  >
                    {br}
                  </Button>
                ))}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="price">
              <AccordionTrigger>Price Range (Rs)</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 text-sm">
                  <p>{filters.minPrice} - {filters.maxPrice}</p>
                  <input
                    type="range"
                    min="20000"
                    max="150000"
                    step="5000"
                    value={filters.maxPrice}
                    onChange={(e) =>
                      setFilters((f) => ({
                        ...f,
                        maxPrice: Number(e.target.value),
                      }))
                    }
                    className="w-full accent-blue-600"
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="flex gap-2 flex-col">
            <Button variant="default" onClick={fetchProducts} className="w-full" disabled={loading}>
              {loading ? "Loading..." : "Apply Filter"}
            </Button>
            <Button variant="outline" className="w-full" onClick={handleReset}>
              Reset Filter
            </Button>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="md:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-gray-600">
              {loading ? "Loading products..." : `Showing ${products.length} products`}
            </p>
            <Select value={filters.sort} onValueChange={handleSortChange}>
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

          {/* Skeleton Loader */}
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i}>
                  <ProductSkeleton />
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <p className="text-center text-gray-500 py-10">No products found.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {displayedProducts.map((product) => (
                <Link key={product._id} href={`/shop/${product._id}`}>
                  <Card className="relative group cursor-pointer hover:shadow-lg transition border border-gray-200">
                    <div className="relative w-full h-48 bg-gray-50 flex items-center justify-center rounded-t-lg overflow-hidden">
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
                        className="object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
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
                        <span className="font-semibold text-blue-700">
                          Rs{product.newPrice}
                        </span>
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <Separator className="my-10 max-w-7xl mx-auto" />
    </div>
  );
}
