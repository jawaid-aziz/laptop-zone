import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    title: "Branded Laptops",
    image: "/categories/laptops.webp",
    link: "/shop",
  },
  {
    title: "Accessories",
    image: "/categories/accessories.webp",
    link: "/shop",
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
          <Link key={i} href={`/shop`} passHref>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
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
          </Link>
        ))}
      </div>
    </section>
  );
}
