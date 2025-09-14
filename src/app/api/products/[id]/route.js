import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";
import formidable from "formidable";
import path from "path";
import fs from "fs";

// Disable body parsing for PUT too
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper (reuse from products route)
async function parseForm(req) {
  return new Promise((resolve, reject) => {
    const uploadDir = path.join(process.cwd(), "/public/uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const form = formidable({
      uploadDir,
      keepExtensions: true,
      filename: (name, ext, part) => `${Date.now()}_${part.originalFilename}`,
    });

    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
}

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

    const { fields, files } = await parseForm(req);

    const updateData = {
      name: fields.name?.[0],
      price: fields.price?.[0],
      category: fields.category?.[0],
    };

    if (files.image) {
      const imageFile = files.image[0];
      updateData.image = `/uploads/${path.basename(imageFile.filepath)}`;
    }

    const updated = await Product.findByIdAndUpdate(params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
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
