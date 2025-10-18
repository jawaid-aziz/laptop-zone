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
      <ProductCarousel title="HP" queryType="brand" queryValue="HP" />
      <ProductCarousel title="Dell" queryType="brand" queryValue="Dell" />
      <ProductCarousel title="Lenovo" queryType="brand" queryValue="Lenovo" />
      <ProductCarousel
        title="Laptop Accessories"
        queryType="category"
        queryValue="68cfc18523d21a3c625463de"
      />
      <ProductCarousel
        title="Laptop Bags"
        queryType="category"
        queryValue="68cfc18e23d21a3c625463e0"
      />
    </>
  );
}
