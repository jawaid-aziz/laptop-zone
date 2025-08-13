"use client";

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback } from "react";

const hpProducts = [
  {
    title: "HP EliteBook 840 G3",
    price: "PKR 45,000",
    image: "/hp-products/laptop1.jpg",
  },
  {
    title: "HP ProBook 450 G5",
    price: "PKR 58,000",
    image: "/hp-products/laptop2.webp",
  },
  {
    title: "HP ZBook 15 G3",
    price: "PKR 125,000",
    image: "/hp-products/laptop3.jpg",
  },
  {
    title: "HP Elite x2 1012 G2",
    price: "PKR 85,000",
    image: "/hp-products/laptop4.jpg",
  },
];

export default function ProductCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start", skipSnaps: false });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Brand header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            {/* <Image
              src="/brands/hp.png"
              alt="HP Logo"
              width={50}
              height={50}
              className="object-contain"
            /> */}
            <h2 className="text-2xl font-bold">HP</h2>
          </div>
          <Button variant="link" className="text-primary p-0">View All</Button>
        </div>

        {/* Carousel */}
        <div className="flex items-center gap-3">
          <Button size="icon" variant="outline" onClick={scrollPrev}>
            <ChevronLeft />
          </Button>

          <div className="overflow-hidden w-full" ref={emblaRef}>
            <div className="flex gap-6">
              {hpProducts.map((product, i) => (
                <Card
                  key={i}
                  className="min-w-[280px] max-w-[280px] flex-shrink-0 border hover:shadow-lg transition-shadow"
                >
                  <div className="relative w-full h-56 bg-white flex items-center justify-center p-4">
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={240}
                      height={180}
                      className="object-contain"
                    />
                  </div>
                  <CardHeader className="pt-4">
                    <CardTitle className="text-base">{product.title}</CardTitle>
                    <CardDescription>{product.price}</CardDescription>
                  </CardHeader>
                </Card>
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
