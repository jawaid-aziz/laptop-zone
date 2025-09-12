import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";

export async function GET() {
  try {
    await dbConnect();
    const products = await Product.find({}).populate("category");
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();

    const formData = await req.formData();

    // fields
    const name = formData.get("name");
    const brand = formData.get("brand");
    const stock = formData.get("stock");
    const description = formData.get("description");
    const category = formData.get("category");
    const oldPrice = formData.get("oldPrice");
    const newPrice = formData.get("newPrice");

    // images
    const files = formData.getAll("images"); // supports multiple files
    const uploadDir = path.join(process.cwd(), "public/uploads");

    await fs.mkdir(uploadDir, { recursive: true });

    const imageUrls = [];

    for (const file of files) {
      if (file && file.name) {
        const filePath = path.join(uploadDir, file.name);
        const arrayBuffer = await file.arrayBuffer();
        await fs.writeFile(filePath, Buffer.from(arrayBuffer));
        imageUrls.push(`/uploads/${file.name}`);
      }
    }

    // Save product
    const newProduct = new Product({
      name,
      brand,
      stock,
      description,
      category,
      oldPrice,
      newPrice,
      images: imageUrls,
    });

    await newProduct.save();

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Error uploading product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
