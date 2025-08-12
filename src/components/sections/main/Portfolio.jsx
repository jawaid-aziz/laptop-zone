import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const portfolioItems = [
  {
    title: "Laptop Repair",
    image: "/portfolio/repair.jpg",
  },
  {
    title: "Corporate Supply",
    image: "/portfolio/corporate.jpg",
  },
  {
    title: "IT Infrastructure",
    image: "/portfolio/infrastructure.jpg",
  },
  {
    title: "Networking Solutions",
    image: "/portfolio/networking.jpg",
  },
  {
    title: "On-Site Support",
    image: "/portfolio/support.jpg",
  },
  {
    title: "Custom Builds",
    image: "/portfolio/custom.jpg",
  },
];

export default function Portfolio() {
  return (
    <section className="bg-white border-t border-b">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-8 text-center">Our Portfolio</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {portfolioItems.map((item, i) => (
            <Card
              key={i}
              className="overflow-hidden group hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="relative w-full h-48">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader className="text-center">
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
