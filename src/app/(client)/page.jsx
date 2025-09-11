import Hero from "@/components/sections/main/Hero";
import Features from "@/components/sections/main/Features";
import CategoryCards from "@/components/sections/main/Category-Cards";
import ProductCarousel from "@/components/sections/main/Product-Carousel";
import Portfolio from "@/components/sections/main/Portfolio";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <CategoryCards />
      <Portfolio />
      <ProductCarousel />
    </>
  );
}
