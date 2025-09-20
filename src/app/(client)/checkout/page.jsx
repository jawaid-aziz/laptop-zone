  "use client";

  import { useState } from "react";
  import { useRouter } from "next/navigation";
  import Image from "next/image";
  import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import { Textarea } from "@/components/ui/textarea";
  import { Button } from "@/components/ui/button";
  import { useCart } from "@/context/CartContext";
  import { useToast } from "@/components/ui/use-toast";

  export default function CheckoutPage() {
    const { cart, total, clearCart } = useCart();
    const { toast } = useToast();
    const router = useRouter();
    const [form, setForm] = useState({
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      city: "",
      country: "",
      postalCode: "",
      phone: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      toast({
        title: "❌ Error",
        description: "Your cart is empty.",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          address: form.address,
          city: form.city,
          country: form.country,
          postalCode: form.postalCode,
          phone: form.phone,
          products: cart.map((item) => ({
            product: item._id,
            quantity: item.quantity,
          })),
          totalPrice: total,
          status: "pending", // default
        }),
      });

      if (!res.ok) throw new Error("Failed to place order");

      const data = await res.json();

      clearCart();
      router.push(`/order-confirmation/${data._id}`);
      toast({
        title: "✅ Success",
        description: "Order placed successfully!",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "❌ Error",
        description: "Something went wrong placing your order!",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };


    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {/* Shipping Details */}
        <Card className="md:col-span-2 shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle>Shipping Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>First Name</Label>
                <Input name="firstName" value={form.firstName} onChange={handleChange} />
              </div>
              <div>
                <Label>Last Name</Label>
                <Input name="lastName" value={form.lastName} onChange={handleChange} />
              </div>
            </div>
            <div>
              <Label>Email</Label>
              <Input type="email" name="email" value={form.email} onChange={handleChange} />
            </div>
            <div>
              <Label>Address</Label>
              <Textarea name="address" value={form.address} onChange={handleChange} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>City</Label>
                <Input name="city" value={form.city} onChange={handleChange} />
              </div>
              <div>
                <Label>Country</Label>
                <Input name="country" value={form.country} onChange={handleChange} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Postal Code</Label>
                <Input name="postalCode" value={form.postalCode} onChange={handleChange} />
              </div>
              <div>
                <Label>Phone</Label>
                <Input name="phone" value={form.phone} onChange={handleChange} />
              </div>
            </div>
            <Button className="w-full mt-4" onClick={handlePlaceOrder} disabled={loading}>
              {loading ? "Placing Order..." : "Place Order"}
            </Button>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card className="shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {cart.length === 0 ? (
              <p className="text-muted-foreground">Your cart is empty.</p>
            ) : (
              cart.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-4 border-b pb-2"
                >
                  {/* Image */}
                  <div className="w-16 h-16 relative flex-shrink-0">
                    <Image
                      src={item.images?.[0] || "/placeholder.png"}
                      alt={item.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>

                  {/* Name + Quantity */}
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="text-sm font-semibold">
                    {(item.newPrice * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))
            )}
            <div className="flex justify-between font-semibold pt-3">
              <span>Total</span>
              <span>{total.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
