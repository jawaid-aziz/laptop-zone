import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";
import formidable from "formidable";
import path from "path";
import fs from "fs";

// Disable Next.js body parsing (important for formidable to work)
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper to parse form-data with formidable
async function parseForm(req) {
  return new Promise((resolve, reject) => {
    const uploadDir = path.join(process.cwd(), "/public/uploads");

    // Make sure uploads folder exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const form = formidable({
      uploadDir,
      keepExtensions: true, // keeps .jpg/.png extensions
      filename: (name, ext, part) => {
        // Custom filename (timestamp + original name)
        return `${Date.now()}_${part.originalFilename}`;
      },
    });

    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
}

// GET all products
export async function GET() {
  try {
    await dbConnect();
    const products = await Product.find({}).populate("category");
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

// ADD new product with image
export async function POST(req) {
  try {
    await dbConnect();

    // Parse form data
    const { fields, files } = await parseForm(req);

    // Get image path
    const imageFile = files.image[0]; // assuming client sends field name "image"
    const imageUrl = `/uploads/${path.basename(imageFile.filepath)}`;

    // Create product in DB
    const newProduct = new Product({
      name: fields.name[0],
      price: fields.price[0],
      category: fields.category[0],
      image: imageUrl, // store URL instead of binary
    });

    await newProduct.save();

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
