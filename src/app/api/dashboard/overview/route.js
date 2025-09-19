import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";
import Order from "@/models/Order";
import Category from "@/models/Category";

export async function GET() {
  await dbConnect();

  const products = await Product.countDocuments();
  const orders = await Order.countDocuments();
  const categories = await Category.countDocuments();

  const recentOrders = await Order.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();

  const lowStock = await Product.find({ stock: { $lt: 5 } })
    .sort({ stock: 1 })
    .limit(5)
    .lean();

    const revenueByMonth = await Order.aggregate([
  {
    $group: {
      _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } }, // group by year-month
      totalSales: { $sum: "$totalPrice" },
    },
  },
  { $sort: { _id: 1 } },
]);

    const productsByCategory = await Product.aggregate([
  {
    $group: {
      _id: "$category",
      count: { $sum: 1 },
    },
  },
  {
    $lookup: {
      from: "categories",
      localField: "_id",
      foreignField: "_id",
      as: "categoryDetails",
    },
  },
  { $unwind: "$categoryDetails" },
  {
    $project: {
      _id: 0,
      category: "$categoryDetails.name",
      count: 1,
    },
  },
]);
    

  return Response.json({
    stats: { products, orders, categories },
    recentOrders,
    lowStock,
    revenueByMonth,
    productsByCategory
  });
}
