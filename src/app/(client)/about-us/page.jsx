// app/about/page.jsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Package, Truck, ShieldCheck, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-extrabold mb-4">About Laptop Zone</h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-200">
          Your trusted destination for premium branded laptops. We combine{" "}
          <span className="font-semibold">quality, trust, and speed</span> to
          deliver an unmatched shopping experience.
        </p>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-6 bg-muted/30">
        <h2 className="text-3xl font-bold text-center mb-10">
          Why Choose Laptop Zone?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="p-6 flex flex-col items-center text-center">
            <Package className="h-10 w-10 mb-4 text-primary" />
            <h3 className="font-semibold mb-2">Premium Laptops</h3>
            <p className="text-sm text-muted-foreground">
              Only the best brands with warranty.
            </p>
          </Card>

          <Card className="p-6 flex flex-col items-center text-center">
            <ShieldCheck className="h-10 w-10 mb-4 text-primary" />
            <h3 className="font-semibold mb-2">Secure Packaging</h3>
            <p className="text-sm text-muted-foreground">
              Extra care to keep your laptop safe.
            </p>
          </Card>

          <Card className="p-6 flex flex-col items-center text-center">
            <Truck className="h-10 w-10 mb-4 text-primary" />
            <h3 className="font-semibold mb-2">Fast Shipping</h3>
            <p className="text-sm text-muted-foreground">
              Delivered in 3–5 business days.
            </p>
          </Card>

          <Card className="p-6 flex flex-col items-center text-center">
            <CheckCircle2 className="h-10 w-10 mb-4 text-primary" />
            <h3 className="font-semibold mb-2">Money-Back Guarantee</h3>
            <p className="text-sm text-muted-foreground">
              14-day return policy for peace of mind.
            </p>
          </Card>

          <Card className="p-6 flex flex-col items-center text-center">
            <Users className="h-10 w-10 mb-4 text-primary" />
            <h3 className="font-semibold mb-2">Customer First</h3>
            <p className="text-sm text-muted-foreground">
              Friendly support that actually listens.
            </p>
          </Card>
        </div>
      </section>

      {/* Vision */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
        <p className="max-w-3xl mx-auto text-lg text-muted-foreground leading-relaxed">
          At <span className="font-semibold">Laptop Zone</span>, our vision is
          to make premium technology accessible to everyone. We believe that
          laptops aren’t just devices—they’re tools of empowerment that fuel{" "}
          <span className="italic">innovation, education, and opportunity</span>.
          We aim to build long-term trust through quality, reliability, and
          transparency.
        </p>
      </section>

      <Separator />

      {/* Customer Reviews */}
      <section className="py-16 px-6 bg-muted/40">
        <h2 className="text-3xl font-bold text-center mb-10">
          What Our Customers Say
        </h2>
        <Carousel className="w-full max-w-2xl mx-auto">
          <CarouselContent>
            <CarouselItem>
              <Card className="rounded-2xl shadow-md">
                <CardContent className="p-6 text-center">
                  <p className="italic text-lg">
                    “Laptop Zone delivered my laptop in 3 days, perfectly
                    packed. Amazing service!”
                  </p>
                  <p className="mt-4 font-semibold">– Ahmed R.</p>
                </CardContent>
              </Card>
            </CarouselItem>
            <CarouselItem>
              <Card className="rounded-2xl shadow-md">
                <CardContent className="p-6 text-center">
                  <p className="italic text-lg">
                    “I love the 14-day money-back policy. Gave me peace of mind
                    when ordering online.”
                  </p>
                  <p className="mt-4 font-semibold">– Sara K.</p>
                </CardContent>
              </Card>
            </CarouselItem>
            <CarouselItem>
              <Card className="rounded-2xl shadow-md">
                <CardContent className="p-6 text-center">
                  <p className="italic text-lg">
                    “Best prices for branded laptops, and their support team is
                    super helpful.”
                  </p>
                  <p className="mt-4 font-semibold">– Bilal H.</p>
                </CardContent>
              </Card>
            </CarouselItem>
          </CarouselContent>
          <div className="flex justify-center gap-4 mt-6">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </section>
    </div>
  );
}
