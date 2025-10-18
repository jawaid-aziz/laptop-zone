import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";
import Category from "@/models/Category";
import cloudinary from "@/lib/cloudinary";

export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const minPrice = parseInt(searchParams.get("minPrice")) || 0;
    const maxPrice = parseInt(searchParams.get("maxPrice")) || 9999999;
    const brand = searchParams.get("brand");
    const sort = searchParams.get("sort");
    const search = searchParams.get("search");

    // base query
    const query = {
      newPrice: { $gte: minPrice, $lte: maxPrice },
    };

    // add search condition BEFORE creating productsQuery
    if (search && search.trim() !== "") {
      query.name = { $regex: search, $options: "i" }; // case-insensitive
    }

    if (category && category !== "all") {
      try {
        const categoryDoc = await Category.findById(category);
        if (categoryDoc) {
          query.category = categoryDoc._id;
        } else {
          console.warn(`No category found for id: ${category}`);
        }
      } catch {
        // if category is not an ObjectId, skip
      }
    }

    if (brand && brand !== "all") query.brand = brand;

    // now apply query
    let productsQuery = Product.find(query).populate("category");

    // sorting
    if (sort === "priceLowHigh") productsQuery = productsQuery.sort({ newPrice: 1 });
    if (sort === "priceHighLow") productsQuery = productsQuery.sort({ newPrice: -1 });

    const products = await productsQuery.exec();

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
    console.log(formData);
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

    console.log("✅ Parsed Variants (final):", JSON.stringify(variants, null, 2));


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
    const productData = new Product({
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
    });

    console.log("🧠 Final product data before save:", JSON.stringify(productData, null, 2));

    const newProduct = new Product(productData);

    newProduct.markModified("keyFeatures");
    newProduct.markModified("variants");
    newProduct.markModified("variants.0.options");

    await newProduct.save();

    console.log("✅ Product saved:", newProduct);

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Error uploading product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
