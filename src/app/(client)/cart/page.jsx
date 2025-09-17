"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Trash2, Plus, Minus } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, addToCart, decreaseQuantity } = useCart();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.newPrice * item.quantity,
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-10">Your Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-gray-500 text-lg">🛒 Your cart is empty</p>
          <Link href="/shop">
          <Button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white">
            Continue Shopping
          </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <Card
                key={item._id}
                className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-5 shadow-sm"
              >
                {/* Product Image */}
                <div className="relative w-28 h-28 shrink-0">
                  <Image
                    src={item.images?.[0] || "/placeholder.png"}
                    alt={item.name}
                    fill
                    className="object-contain rounded-md"
                  />
                </div>

                {/* Product Info + Controls */}
                <div className="flex flex-1 flex-col sm:flex-row sm:items-center justify-between w-full gap-4">
                  {/* Info */}
                  <div>
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-gray-500 text-sm">
                      {item.brand || "Unbranded"}
                    </p>
                    <p className="text-blue-600 font-bold mt-1">
                      Rs{item.newPrice}
                    </p>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center gap-4">
                    {/* Quantity */}
                    <div className="flex items-center gap-2 border rounded-md px-2 py-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => decreaseQuantity(item._id)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-6 text-center font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => addToCart(item)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Remove */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => removeFromCart(item._id)}
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Summary */}
          <Card className="p-6 h-fit sticky top-20 shadow-md">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <Separator className="mb-4" />
            <div className="flex justify-between mb-2 text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">Rs{subtotal}</span>
            </div>
            <div className="flex justify-between mb-6 text-sm">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium">Free</span>
            </div>
            <Separator className="mb-6" />
            <div className="flex justify-between text-lg font-bold mb-6">
              <span>Total</span>
              <span>Rs{subtotal}</span>
            </div>
            <Link href="/checkout">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Proceed to Checkout
            </Button>
            </Link>
          </Card>
        </div>
      )}
    </div>
  );
}
