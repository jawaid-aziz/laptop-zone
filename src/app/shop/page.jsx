"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

const products = [
  {
    title: "Apple MacBook Air 2015 Ci5 4th Gen",
    price: "Rs45,000",
    image: "/products/mac1.webp",
    soldOut: true,
  },
  {
    title: "Dell Latitude 3400 Ci3 8th Gen",
    price: "Rs42,000",
    oldPrice: "Rs46,000",
    image: "/products/dell1.webp",
    soldOut: false,
  },
  {
    title: "Dell Latitude 5410 Ci5 10th Gen",
    price: "Rs55,000",
    image: "/products/dell2.webp",
    soldOut: false,
  },
  {
    title: "Dell Latitude 5470 Ci5 6th Gen",
    price: "Rs36,000",
    image: "/products/dell3.webp",
    soldOut: false,
  },
  // add more...
];

export default function Shop() {
  return (
    <div className="bg-white">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-6 py-2 text-sm text-gray-500">
        Home <span className="mx-2">›</span> Shop
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-center py-8">Shop</h1>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <aside className="md:col-span-1 space-y-6">
          <Accordion type="single" collapsible>
            <AccordionItem value="category">
              <AccordionTrigger>Category</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 text-sm">
                  <li>Laptops</li>
                  <li>Accessories</li>
                  <li>Bags</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="price">
              <AccordionTrigger>Price</AccordionTrigger>
              <AccordionContent>
                <input
                  type="range"
                  min="20000"
                  max="150000"
                  className="w-full"
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="flex gap-2 flex-col">
            <Button className="w-full">Filter</Button>
            <Button variant="outline" className="w-full">
              Reset Filter
            </Button>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="md:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-gray-600">
              Showing 16 of 79 products
            </p>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Default sorting" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default sorting</SelectItem>
                <SelectItem value="priceLowHigh">Price: Low → High</SelectItem>
                <SelectItem value="priceHighLow">Price: High → Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product, i) => (
<Card key={i} className="relative group">
  {/* Image wrapper */}
  <div className="relative w-full h-48 bg-gray-100 flex items-center justify-center rounded-t-lg overflow-hidden">
    {/* Sold Out Badge */}
    {product.soldOut && (
      <Badge className="absolute top-2 left-2 bg-gray-800 text-white">
        SOLD OUT
      </Badge>
    )}

    <Image
      src={product.image}
      alt={product.title}
      width={200}
      height={200}
      className="object-contain"
    />
  </div>

  {/* Product Info */}
  <CardHeader className="p-4">
    <CardTitle className="text-sm font-medium line-clamp-2">
      {product.title}
    </CardTitle>
    <CardDescription className="mt-1">
      {product.oldPrice && (
        <span className="line-through mr-2 text-gray-400">
          {product.oldPrice}
        </span>
      )}
      {product.price}
    </CardDescription>
  </CardHeader>
</Card>

            ))}
          </div>

          {/* Load More */}
          <div className="flex justify-center py-10">
            <Button variant="outline">Load More</Button>
          </div>
        </div>
      </div>

      <Separator className="my-10 max-w-7xl mx-auto" />

      {/* SEO Text Section */}
      <div className="max-w-5xl mx-auto px-6 text-center space-y-4 pb-16">
        <h2 className="text-2xl font-bold">
          Discover Top-Quality Used Laptops at Competitive Prices in Pakistan
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          Welcome to the premier marketplace for used laptop prices in Pakistan.
          Whether you are a student, a working professional, or a gadget lover,
          our extensive selection of second-hand laptops in Pakistan ensures you
          find the best possible device that fits your budget and needs.
        </p>
        <p className="text-gray-600 text-sm leading-relaxed">
          Looking for the most reliable used laptops in Pakistan? You’ve come to
          the right place. Our inventory includes a wide range of laptops from
          leading brands, all available at an affordable price.
        </p>
      </div>
    </div>
  );
}
