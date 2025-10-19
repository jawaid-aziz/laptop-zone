"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      try {
        const res = await fetch("/api/orders");
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        toast({
          variant: "destructive",
          title: "❌ Failed to fetch orders",
          description: err.message,
        });
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

    if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  if (!orders.length) {
    return <p className="p-6 text-center">No orders found.</p>;
  }

  return (
    <ScrollArea className="h-screen p-6">
      <div className="space-y-6">
        {orders.map((order) => (
          <Link
            key={order._id}
            href={`/admin/show-orders/${order._id}`} // 👈 dynamic route
            className="block hover:scale-[1.01] transition-transform"
          >
            <Card key={order._id} className="shadow-md">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-bold">
                    {order.orderId}
                  </CardTitle>
                  <Badge
                    variant={
                      order.status === "delivered"
                        ? "success"
                        : order.status === "shipped"
                        ? "secondary"
                        : order.status === "cancelled"
                        ? "destructive"
                        : "outline"
                    }
                  >
                    {order.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {order.firstName} {order.lastName} • {order.email}
                </p>
                <p className="text-sm text-muted-foreground">
                  {order.address}, {order.city}, {order.country} -{" "}
                  {order.postalCode}
                </p>
                <p className="text-sm text-muted-foreground">
                  📞 {order.phone}
                </p>
              </CardHeader>

              <Separator />

              <CardContent className="mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {order.products.map((item, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{item.product?.name || "N/A"}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>
                          {item.product?.newPrice
                            ? `${item.product.newPrice}`
                            : "N/A"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="flex justify-end mt-4">
                  <p className="font-semibold text-lg">
                    Total: {order.totalPrice}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </ScrollArea>
  );
}
