import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";
import Category from "@/models/Category";
import cloudinary from "@/lib/cloudinary";

export async function GET() {
  try {
    await dbConnect();
    const products = await Product.find({}).populate("category");
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}


export async function POST(req) {
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


    // Specifications (JSON string)
    const specificationsRaw = formData.get("specifications");
    let specifications = [];
    if (specificationsRaw) {
      try {
        specifications = JSON.parse(specificationsRaw);
      } catch {
        console.warn("Invalid specifications format");
      }
    }

    // Key Features (JSON string)
    const keyFeaturesRaw = formData.get("keyFeatures");
    let keyFeatures = {};
    if (keyFeaturesRaw) {
      try {
        keyFeatures = JSON.parse(keyFeaturesRaw);
      } catch {
        console.warn("Invalid keyFeatures format");
      }
    }

    // **Cloudinary image upload**
    const files = formData.getAll("images");
    const imageUrls = [];

    for (const file of files) {
      if (file && file.name) {
        const arrayBuffer = await file.arrayBuffer();
        const base64 = Buffer.from(arrayBuffer).toString("base64");

        // Cloudinary accepts data URLs like "data:<mime>;base64,<data>"
        const dataUrl = `data:${file.type};base64,${base64}`;

        const uploadResult = await cloudinary.uploader.upload(dataUrl, {
          folder: "laptop-zone",
        });

        imageUrls.push(uploadResult.secure_url);
      }
    }


    // Save product
    const newProduct = new Product({
      name,
      brand,
      stock,
      overview,
      category,
      oldPrice,
      newPrice,
      images: imageUrls,
      tags,
      specifications,
      keyFeatures,
    });

    newProduct.markModified("keyFeatures");
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
