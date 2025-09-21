import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const promoBanners = [
  {
    title: "The Power You Need as a Student",
    subtitle: "Get the best deals on laptops designed for learning.",
    image: "/banners/student.webp",
    buttonText: "Shop Now",
    align: "left", // controls text alignment
    link: "/shop"
  },
  {
    title: "Laptop Repair & Maintenance",
    subtitle: "Fast, reliable, and affordable laptop repairs.",
    image: "/banners/repair.webp",
    buttonText: "Book Service",
    align: "left",
    link: "#"
  },
];

export default function Portfolio() {
  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-6 grid gap-6 sm:grid-cols-2">
        {promoBanners.map((banner, i) => (
          <Link key={i} href={banner.link} passHref>
          <Card
            key={i}
            className="relative overflow-hidden group cursor-pointer rounded-xl border-0 h-64"
          >
            {/* Background Image */}
            <Image
              src={banner.image}
              alt={banner.title}
              fill
              className=" group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0  group-hover:bg-black/30 transition-colors"></div>

            {/* Content Overlay */}
            <div
              className={`relative z-10 flex flex-col justify-center h-full px-8 text-white ${
                banner.align === "right" ? "items-end text-right" : "items-start text-left"
              }`}
            >
              <h3 className="text-2xl font-bold mb-2 text-black">{banner.title}</h3>
              <p className="mb-4 text-sm text-gray-800 max-w-xs">{banner.subtitle}</p>
              <Button
                variant="secondary"
                className="bg-white text-black hover:bg-gray-200"
              >
                {banner.buttonText}
              </Button>
            </div>
          </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
