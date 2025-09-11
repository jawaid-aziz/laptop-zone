"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

export default function AddProductPage() {
  
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [form, setForm] = useState({
    name: "",
    brand: "",
    price: "",
    stock: "",
    description: "",
    category: "",
    oldPrice: "",
    newPrice: "",
  });

  // Fetch categories
  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    }
    fetchCategories();
  }, []);

  // Handle input
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // Handle category select
  function handleCategoryChange() {
    setForm((prev) => ({ ...prev, category: value }));
  }

  // Handle file upload
  function handleFileChange() {
    if (e.target.files) {
      setImages([...images, ...Array.from(e.target.files)]);
    }
  }

  // Remove image
  function removeImage() {
    setImages(images.filter((_, i) => i !== index));
  }

  // Submit
  async function handleSubmit() {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => formData.append(key, value));
      images.forEach((img) => formData.append("images", img));

      const res = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed");
      const data = await res.json();

      alert("Product added successfully");

      setForm({ name: "", brand: "", price: "", stock: "", description: "", category: "", oldPrice: "", newPrice: "" });
      setImages([]);
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="min-h-screen bg-white p-8 flex items-center justify-center">
      <Card className="w-full max-w-6xl border-navy-700 shadow-lg rounded-2xl">
        <CardHeader className="bg-navy-700 text-white rounded-t-2xl">
          <CardTitle className="text-xl">Add Product</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* LEFT COLUMN */}
            <div className="space-y-4">
              <div>
                <Label>Product Name</Label>
                <Input name="name" value={form.name} onChange={handleChange} required />
              </div>

              <div>
                <Label>Description</Label>
                <Textarea name="description" value={form.description} onChange={handleChange} />
              </div>

              <div>
                <Label>Category</Label>
                <Select value={form.category} onValueChange={handleCategoryChange}>
                  <SelectTrigger className="border-navy-700">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat._id} value={cat._id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Brand Name</Label>
                <Input name="brand" value={form.brand} onChange={handleChange} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Stock Quantity</Label>
                  <Input type="number" name="stock" value={form.stock} onChange={handleChange} />
                </div>
                <div>
                  <Label>Price</Label>
                  <Input type="number" name="price" value={form.price} onChange={handleChange} required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Old Price</Label>
                  <Input type="number" name="oldPrice" value={form.oldPrice} onChange={handleChange} />
                </div>
                <div>
                  <Label>New Price</Label>
                  <Input type="number" name="newPrice" value={form.newPrice} onChange={handleChange} />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-4">
              <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
                Product Preview
              </div>

              <div>
                <Label>Product Gallery</Label>
                <div className="border-2 border-dashed border-navy-700 rounded-lg p-6 text-center text-sm text-gray-500">
                  <Input type="file" accept="image/*" multiple onChange={handleFileChange} className="hidden" id="fileUpload" />
                  <label htmlFor="fileUpload" className="cursor-pointer">Click or drag images here</label>
                </div>
              </div>

              <div className="space-y-2 max-h-40 overflow-y-auto">
                {images.map((img, i) => (
                  <div key={i} className="flex items-center justify-between p-2 border rounded-lg">
                    <span className="text-sm">{img.name}</span>
                    <Button variant="destructive" size="sm" onClick={() => removeImage(i)}>Remove</Button>
                  </div>
                ))}
              </div>
            </div>

            {/* ACTIONS */}
            <div className="col-span-2 flex justify-end gap-3 pt-4">
              <Button type="submit" className="bg-navy-700 text-white hover:bg-navy-800">Save</Button>
              <Button type="button" variant="destructive">Delete</Button>
              <Button type="button" variant="outline">Cancel</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
