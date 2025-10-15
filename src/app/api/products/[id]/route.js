import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";
import cloudinary from "@/lib/cloudinary";

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
    const { id } = await params;
    const formData = await req.formData();

    // Basic fields
    const name = formData.get("name");
    const brand = formData.get("brand");
    const stock = formData.get("stock");
    const overview = formData.get("overview");

    const oldPriceRaw = formData.get("oldPrice");
    const oldPrice = oldPriceRaw && oldPriceRaw !== "null" ? Number(oldPriceRaw) : undefined;

    const newPriceRaw = formData.get("newPrice");
    const newPrice = newPriceRaw && newPriceRaw !== "null" ? Number(newPriceRaw) : undefined;

    let category = formData.get("category");

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

    // ✅ Variants Parsing (safe and guaranteed)
    let variants = [];
    const variantsRaw = formData.get("variants");

    if (variantsRaw) {
      try {
        const parsed = typeof variantsRaw === "string" ? JSON.parse(variantsRaw) : variantsRaw;
        if (Array.isArray(parsed)) {
          variants = parsed;
        } else {
          console.warn("❌ Variants not an array:", parsed);
        }
      } catch (err) {
        console.error("❌ Failed to parse variants:", err.message);
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

    // Prepare update data
    const updateData = {
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
      variants,
    };

    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined || updateData[key] === "undefined"
        ? delete updateData[key]
        : null
    );


    // Update product
    const updated = await Product.findByIdAndUpdate(id, updateData, {
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
    const { id } = await params;
    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
