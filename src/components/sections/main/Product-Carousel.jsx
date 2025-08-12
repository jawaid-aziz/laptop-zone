"use client";

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback } from "react";

const products = [
  {
    title: "HP EliteBook 840 G3",
    price: "PKR 45,000",
    image: "/products/laptop1.jpg",
  },
  {
    title: "Dell Latitude 5490",
    price: "PKR 52,000",
    image: "/products/laptop2.jpg",
  },
  {
    title: "Lenovo ThinkPad T480",
    price: "PKR 48,500",
    image: "/products/laptop3.jpg",
  },
  {
    title: "MacBook Pro 2019",
    price: "PKR 145,000",
    image: "/products/laptop4.jpg",
  },
];

export default function ProductCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  const scrollPrev = useCallback(() => {
    emblaApi && emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi && emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <div className="flex gap-2">
            <Button size="icon" variant="outline" onClick={scrollPrev}>
              <ChevronLeft />
            </Button>
            <Button size="icon" variant="outline" onClick={scrollNext}>
              <ChevronRight />
            </Button>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {products.map((product, i) => (
              <Card key={i} className="min-w-[250px] max-w-[250px] flex-shrink-0">
                <div className="relative w-full h-48">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{product.title}</CardTitle>
                  <CardDescription>{product.price}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
