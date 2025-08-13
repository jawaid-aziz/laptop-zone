import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative h-[80vh] flex items-center">
      {/* Background Image */}
      <Image
        src="/hero-laptop.webp"
        alt="Featured Laptop"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Overlay (optional for better text readability) */}
      <div className="absolute inset-0"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 right-1/2 transform translate-x-1/2">
        <div className="max-w-xl space-y-6 text-white">
          <span className="text-sm font-medium uppercase tracking-widest text-primary">
            New Arrivals
          </span>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-black">
            Get Your Dream Laptop with Easy Installments
          </h1>
          <p className="text-gray-800 max-w-lg">
            Prime Traders brings you the latest laptops, accessories, and gadgets — all at competitive prices, with flexible payment plans tailored for you.
          </p>
          <div className="flex gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
              Shop Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
