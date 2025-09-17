"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function PaymentPage() {
  const router = useRouter();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("checkoutDetails");
    if (stored) setDetails(JSON.parse(stored));
  }, []);

  const handlePlaceOrder = () => {
    // Here you’d normally send order + payment info to API
    localStorage.removeItem("checkoutDetails");
    alert("Order placed successfully!");
    router.push("/");
  };

  return (
    <div className="flex justify-center items-center p-6">
      <Card className="w-full max-w-lg shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle>Payment Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Card Number</Label>
            <Input placeholder="1234 5678 9012 3456" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Expiry Date</Label>
              <Input placeholder="MM/YY" />
            </div>
            <div>
              <Label>CVC</Label>
              <Input placeholder="123" />
            </div>
          </div>
          <Button className="w-full mt-4" onClick={handlePlaceOrder}>
            Place Order
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
