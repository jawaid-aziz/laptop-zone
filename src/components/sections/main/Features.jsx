import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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
    description: "In Nawabshah only",
  },
  {
    icon: Award,
    title: "Trusted Name",
    description: "In Laptops",
  },
];

export default function Features() {
  return (
    <section className="bg-white ">
      <div className="max-w-7xl mx-auto px-6 py-10 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
        {features.map((feature, i) => (
          <Card
            key={i}
            className="flex flex-row items-center justify-center text-center p-6 hover:shadow-md transition-shadow"
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/8 text-primary mb-">
              <feature.icon size={20} />
            </div>
            <div>
              <CardTitle className="text-lg">{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
