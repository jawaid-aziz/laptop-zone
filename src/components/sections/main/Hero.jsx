import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-8 items-center">
        
        {/* LEFT: Text Content */}
        <div className="space-y-6">
          <span className="text-sm font-medium text-primary uppercase tracking-widest">
            New Arrivals
          </span>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Get Your Dream Laptop with Easy Installments
          </h1>
          <p className="text-gray-600 max-w-lg">
            Prime Traders brings you the latest laptops, accessories, and gadgets — all at competitive prices, with flexible payment plans tailored for you.
          </p>
          <div className="flex gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Shop Now
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>

        {/* RIGHT: Hero Image */}
        <div className="relative flex justify-center md:justify-end">
          <Image
            src="/hero-laptop.png" // main laptop image
            alt="Featured Laptop"
            width={500}
            height={500}
            className="object-contain drop-shadow-lg"
            priority
          />
          {/* Optional floating badge */}
          <div className="absolute top-6 left-6 bg-primary text-white text-sm px-3 py-1 rounded-full shadow-lg">
            Best Seller
          </div>
        </div>

      </div>
    </section>
  );
}
