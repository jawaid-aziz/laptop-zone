"use client";

import useSWR from "swr";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useToast } from "@/components/ui/use-toast";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Dashboard() {
  const { data, error } = useSWR("/api/dashboard/overview", fetcher);
  const { toast } = useToast();

  if (error) {
    toast({
      title: "❌ Error",
      description: "Failed to load dashboard data.",
      variant: "destructive",
    });
    return <div className="p-6">Failed to load</div>;
  }
  if (!data)
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );

  return (
    <div className="p-6 space-y-6">
      {/* --- Stats Cards --- */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Products</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{data.stats.products}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{data.stats.orders}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{data.stats.categories}</p>
          </CardContent>
        </Card>
      </div>

      {/* --- Revenue Trend --- */}
<Card>
  <CardHeader>
    <CardTitle>Revenue Trend</CardTitle>
  </CardHeader>
  <CardContent className="h-80">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data.revenueByMonth}>
        <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis
          dataKey="_id"
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          tick={{ fontSize: 12 }}
          tickFormatter={(val) => `${val.toLocaleString()}`}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          formatter={(value) => [`${value.toLocaleString()}`, "Revenue"]}
          contentStyle={{
            backgroundColor: "white",
            borderRadius: "0.5rem",
            border: "1px solid #e5e7eb",
          }}
        />
        <Line
          type="monotone"
          dataKey="totalSales"
          stroke="#2563eb"
          strokeWidth={3}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
          fillOpacity={1}
          fill="url(#colorRevenue)"
        />
      </LineChart>
    </ResponsiveContainer>
  </CardContent>
</Card>

          <Card>
  <CardHeader>
    <CardTitle>Products by Category</CardTitle>
  </CardHeader>
  <CardContent className="h-80">
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Tooltip
          formatter={(val, name) => [`${val} Products`, name]}
          contentStyle={{
            backgroundColor: "white",
            borderRadius: "0.5rem",
            border: "1px solid #e5e7eb",
          }}
        />
        <Pie
          data={data.productsByCategory}
          dataKey="count"
          nameKey="category"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label={(entry) => entry.category}
          fill="#2563eb"
        >
          {data.productsByCategory.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={[
                "#2563eb",
                "#10b981",
                "#f59e0b",
                "#ef4444",
                "#8b5cf6",
              ][index % 5]}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  </CardContent>
</Card>


      {/* --- Recent Orders --- */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.recentOrders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order.orderId}</TableCell>
                  <TableCell>
                    {order.firstName} {order.lastName}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        order.status === "delivered"
                          ? "default"
                          : order.status === "pending"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.totalPrice}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* --- Low Stock --- */}
      <Card>
        <CardHeader>
          <CardTitle>Low Stock Products</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Stock</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.lowStock.map((p) => (
                <TableRow key={p._id}>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>{p.brand || "-"}</TableCell>
                  <TableCell>{p.stock}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
