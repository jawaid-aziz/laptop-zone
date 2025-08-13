import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Shield, RotateCcw, Truck, Award } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "1 Month",
    description: "Checking Warranty",
  },
  {
    icon: RotateCcw,
    title: "14 Days Return",
    description: "T&C's Apply",
  },
  {
    icon: Truck,
    title: "Free Shipping",
    description: "In Karachi Only",
  },
  {
    icon: Award,
    title: "Trusted Name",
    description: "In Laptops",
  },
];

export default function Features() {
  return (
    <section className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 py-10 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
        {features.map((feature, i) => (
          <Card
            key={i}
            className="flex flex-col items-center justify-center text-center p-6 hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
              <feature.icon size={24} />
            </div>
            <CardTitle className="text-lg">{feature.title}</CardTitle>
            <CardDescription>{feature.description}</CardDescription>
          </Card>
        ))}
      </div>
    </section>
  );
}
