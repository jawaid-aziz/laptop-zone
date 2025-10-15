"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

export default function OrderEditor({ initialOrder }) {
  const [order, setOrder] = useState(initialOrder);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // ✅ Show toast if initialOrder is missing
  useEffect(() => {
    if (!initialOrder) {
      toast({
        title: "❌ Error",
        description: "Order not found or failed to load.",
        variant: "destructive",
      });
    }
  }, [initialOrder, toast]);

  if (!initialOrder) {
    return (
      <div className="p-6 text-red-500">
        Could not load order. Please try again later.
      </div>
    );
  }

  // ✅ Update product quantity and recalc total
  const handleQuantityChange = (index, value) => {
    const updatedProducts = [...order.products];
    updatedProducts[index].quantity = Number(value);

    // Recalculate finalPrice for that product
    const item = updatedProducts[index];
    updatedProducts[index].finalPrice = item.basePrice * item.quantity;

    setOrder({ ...order, products: updatedProducts, totalPrice: item.finalPrice });
  };

  // ✅ Handle direct price edits (optional for admin flexibility)
  const handleBasePriceChange = (index, value) => {
    const updatedProducts = [...order.products];
    updatedProducts[index].basePrice = Number(value);
    handleQuantityChange(index, updatedProducts[index].quantity); // recalc
  };

  async function handleSave(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/orders/${order._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });

      if (!res.ok) throw new Error("Failed to update order");

      toast({
        title: "✅ Order Updated",
        description: "The order has been saved successfully.",
      });
    } catch (err) {
      toast({
        title: "❌ Error",
        description:
          err.message || "Something went wrong while updating the order.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Details – {order.orderId}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSave} className="space-y-8">
          {/* CUSTOMER INFORMATION */}
          <div className="space-y-3">
            <h2 className="font-semibold text-lg">Customer Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>First Name</Label>
                <Input
                  value={order.firstName}
                  onChange={(e) =>
                    setOrder({ ...order, firstName: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Last Name</Label>
                <Input
                  value={order.lastName}
                  onChange={(e) =>
                    setOrder({ ...order, lastName: e.target.value })
                  }
                />
              </div>
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={order.email}
                onChange={(e) =>
                  setOrder({ ...order, email: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Phone</Label>
              <Input
                value={order.phone}
                onChange={(e) =>
                  setOrder({ ...order, phone: e.target.value })
                }
              />
            </div>
          </div>

          {/* SHIPPING ADDRESS */}
          <div className="space-y-3">
            <h2 className="font-semibold text-lg">Shipping Address</h2>
            <div>
              <Label>Address</Label>
              <Input
                value={order.address}
                onChange={(e) =>
                  setOrder({ ...order, address: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>City</Label>
                <Input
                  value={order.city}
                  onChange={(e) =>
                    setOrder({ ...order, city: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Country</Label>
                <Input
                  value={order.country}
                  onChange={(e) =>
                    setOrder({ ...order, country: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Postal Code</Label>
                <Input
                  value={order.postalCode}
                  onChange={(e) =>
                    setOrder({ ...order, postalCode: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          {/* PRODUCTS */}
          <div className="space-y-3">
            <h2 className="font-semibold text-lg">Products</h2>
            {order.products.map((item, index) => (
              <Card key={index} className="p-3 space-y-3">
                <div className="flex items-center gap-4">
                  {/* Product Image */}
                  <img
                    src={item.product?.images?.[0]}
                    alt={item.product?.name}
                    className="w-16 h-16 rounded object-cover border"
                  />
                  {/* Product Info */}
                  <div className="flex-1">
                    <p className="font-medium">{item.product?.name}</p>
                    <p className="text-sm text-gray-500">
                      Base Price: Rs {item.basePrice?.toLocaleString()}
                    </p>
                  </div>
                  {/* Editable Quantity */}
                  <div>
                    <Label>Quantity</Label>
                    <Input
                      type="number"
                      value={item.quantity}
                      min={1}
                      onChange={(e) =>
                        handleQuantityChange(index, e.target.value)
                      }
                      className="w-20"
                    />
                  </div>
                </div>

                {/* ✅ Variant details */}
                {item.selectedVariants?.length > 0 && (
                  <div className="ml-20 space-y-1">
                    <h4 className="text-sm font-semibold">Selected Variants:</h4>
                    {item.selectedVariants.map((variant, i) => (
                      <div
                        key={i}
                        className="text-sm text-gray-600 flex justify-between"
                      >
                        <span>
                          {variant.name}: {variant.value}
                        </span>
                        {variant.extraCost > 0 && (
                          <span className="text-gray-500">
                            +Rs {variant.extraCost}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Editable Base & Final Price */}
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div>
                    <Label>Base Price</Label>
                    <Input
                      type="number"
                      value={item.basePrice}
                      onChange={(e) =>
                        handleBasePriceChange(index, e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label>Final Price</Label>
                    <Input type="number" value={item.finalPrice} readOnly />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* ORDER STATUS */}
          <div>
            <h2 className="font-semibold text-lg">Order Status</h2>
            <Select
              value={order.status}
              onValueChange={(value) => setOrder({ ...order, status: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* ORDER SUMMARY */}
          <div className="space-y-2">
            <h2 className="font-semibold text-lg">Order Summary</h2>
            <p>
              <span className="font-medium">Total Price: </span>
              Rs {order.totalPrice?.toLocaleString()}
            </p>
          </div>

          {/* SAVE BUTTON */}
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
