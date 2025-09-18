import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";
import path from "path";
import fs from "fs";

// GET single product
export async function GET(req, { params }) {
  try {
    await dbConnect();
    
    const { id } = await params; // 👈 must await
    const product = await Product.findById(id).populate("category");
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}

// UPDATE product (with optional image update)
export async function PUT(req, { params }) {
  try {
    await dbConnect();

    const formData = await req.formData();

    // Basic fields
    const name = formData.get("name");
    const brand = formData.get("brand");
    const stock = formData.get("stock");
    const overview = formData.get("overview");
    const category = formData.get("category");
    const oldPrice = formData.get("oldPrice");
    const newPrice = formData.get("newPrice");

    // Tags
    let tags = [];
    const tagsRaw = formData.get("tags");
    if (tagsRaw) {
      try {
        tags = JSON.parse(tagsRaw);
      } catch {
        console.warn("Invalid tags format");
      }
    }

    // Specifications
    let specifications = [];
    const specificationsRaw = formData.get("specifications");
    if (specificationsRaw) {
      try {
        specifications = JSON.parse(specificationsRaw);
      } catch {
        console.warn("Invalid specifications format");
      }
    }

    // Key Features (JSON object, dynamic)
    let keyFeatures = {};
    const keyFeaturesRaw = formData.get("keyFeatures");
    if (keyFeaturesRaw) {
      try {
        keyFeatures = JSON.parse(keyFeaturesRaw);
      } catch {
        console.warn("Invalid keyFeatures format");
      }
    }

    // File handling (new images)
    const files = formData.getAll("images");
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

    // Prepare update data
    const updateData = {
      name,
      brand,
      stock,
      overview,
      category,
      oldPrice,
      newPrice,
      tags,
      specifications,
      keyFeatures,
    };
    updateData.markModified("keyFeatures");
    // Only set images if new ones are uploaded
    if (imageUrls.length > 0) {
      updateData.images = imageUrls;
    }

    // Update product
    const updated = await Product.findByIdAndUpdate(params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

// DELETE product
export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const deleted = await Product.findByIdAndDelete(params.id);

    if (!deleted) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
