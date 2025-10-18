"use client";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductCarousel({ title, queryType, queryValue }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", skipSnaps: false },
    [Autoplay({ delay: 3500, stopOnInteraction: false })]
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  // ✅ Fetch products dynamically
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        let url = "/api/products?";
        if (queryType === "brand") url += `brand=${queryValue}`;
        if (queryType === "category") url += `category=${queryValue}`;
        const res = await fetch(url);
        const data = await res.json();
        setProducts(data || []);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [queryType, queryValue]);

  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{title}</h2>
          <Button variant="link" className="text-primary p-0">
            View All
          </Button>
        </div>

        {/* Carousel */}
<div className="flex items-center gap-3">
  <Button size="icon" variant="outline" onClick={scrollPrev}>
    <ChevronLeft />
  </Button>

  {/* Embla viewport */}
  <div className="overflow-hidden w-full" ref={emblaRef}>
    {/* Embla track */}
    <div className="flex touch-pan-y touch-pinch-zoom">
      {products.map((product) => (
        <Link key={product._id} href={`/shop/${product._id}`}>
        <div
          key={product._id}
          className="flex-[0_0_80%] sm:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_25%] xl:flex-[0_0_20%] px-3 cursor-pointer"
        >
          <Card className="border hover:shadow-lg transition-shadow rounded-xl overflow-hidden">
            <div className="relative w-full h-56 bg-white flex items-center justify-center p-4">
              <Image
                src={product.images[0] || "/placeholder.png"}
                alt={product.name}
                width={240}
                height={180}
                className="object-contain max-h-[200px] transition-transform duration-300 hover:scale-105"
              />
            </div>
            <CardHeader className="pt-4">
              <CardTitle className="text-base line-clamp-1">
                {product.name}
              </CardTitle>
              <CardDescription>PKR {product.newPrice}</CardDescription>
            </CardHeader>
          </Card>
        </div>
        </Link>
      ))}
      
    </div>
  </div>

  <Button size="icon" variant="outline" onClick={scrollNext}>
    <ChevronRight />
  </Button>
</div>

      </div>
    </section>
  );
}
