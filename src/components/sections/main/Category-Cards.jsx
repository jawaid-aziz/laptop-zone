import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const categories = [
  {
    title: "Branded Laptops",
    image: "/categories/laptops.webp",
  },
  {
    title: "Accessories",
    image: "/categories/accessories.webp",
  },
  {
    title: "Laptops on Rent",
    image: "/categories/rent.webp",
  },
];

export default function CategoryCards() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {categories.map((category, i) => (
          <Card
            key={i}
            className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
          >
            <div className="relative w-full h-50">
              <Image
                src={category.image}
                alt={category.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <CardHeader className="text-center">
              <CardTitle>{category.title}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}
