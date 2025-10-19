"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

export default function AddProductPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState([]);
  const [specs, setSpecs] = useState([{ key: "", value: "" }]);
    const [variants, setVariants] = useState([
    { name: "", isRequired: false, options: [{ label: "", priceDifference: 0 }] },
  ]);
  const [form, setForm] = useState({
    name: "",
    brand: "",
    stock: "",
    overview: "",
    category: "",
    oldPrice: "",
    newPrice: "",
    keyFeatures: {},
  });

  const keyFeaturesMap = {
    Laptops: {
      processor: "",
      memory: "",
      storage: "",
      display: "",
      graphics: "",
      buildAndDesign: "",
      connectivity: "",
      securityFeatures: "",
      battery: "",
      operatingSystem: "",
      keyboardAndUsability: "",
      additionalFeatures: "",
      warrantyAndSupport: "",
    },
    "Laptop Accessories": {
      choiceOfCapacities: "",
      unmatchedSpeed: "",
      compactFormFactor: "",
      versatileCompatibility: "",
      reliableStorage: "",
      formFactorsAndInterfaces: "",
      idealApplications: "",
    },
    "Laptop Bags": {
      multipleZipperedCompartments: "",
      waterBottlePocket: "",
      paddedLaptopSleeve: "",
      paddedShoulderStraps: "",
      airFlowBackPadding: "",
      heavyDutyCarryHandle: "",
      audioInterface: "",
      model: "",
      dimensions: "",
      colors: "",
    },
  };

  // Fetch categories
  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    }
    fetchCategories();
  }, []);

  const handleCategoryChange = (value) => {
    if (value === "__new__") {
      setOpen(true);
    } else {
      const selected = categories.find((c) => c._id === value);

      const newKeyFeatures = keyFeaturesMap[selected?.name] || {}; // default empty if unknown category

      setForm((prev) => ({
        ...prev,
        category: value,
        keyFeatures: newKeyFeatures,
      }));
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    setLoading(true);
    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newCategory }),
    });

    if (res.ok) {
      setLoading(false);
      const created = await res.json();
      setCategories((prev) => [...prev, created]);
      setForm({ ...form, category: created._id });
      setNewCategory("");
      setOpen(false);
    }
  };

  // Input handlers
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  const handleKeyFeatureChange = (key, value) => {
    setForm((prev) => ({
      ...prev,
      keyFeatures: {
        ...prev.keyFeatures,
        [key]: value,
      },
    }));
  };

  // Tags
  function handleTagAdd(e) {
    if (e.key === "Enter" && e.target.value.trim()) {
      setTags([...tags, e.target.value.trim()]);
      e.target.value = "";
    }
  }
  function removeTag(index) {
    setTags(tags.filter((_, i) => i !== index));
  }

  // Specifications
  function handleSpecChange(index, field, value) {
    const updated = [...specs];
    updated[index][field] = value;
    setSpecs(updated);
  }
  function addSpec() {
    setSpecs([...specs, { key: "", value: "" }]);
  }
  function removeSpec(index) {
    setSpecs(specs.filter((_, i) => i !== index));
  }

  // File upload
  function handleFileChange(e) {
    if (e.target.files) {
      setImages([...images, ...Array.from(e.target.files)]);
    }
  }
  function removeImage(index) {
    setImages(images.filter((_, i) => i !== index));
  }

  // Variants
  const handleVariantChange = (index, field, value) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
  };

  const handleOptionChange = (vIndex, oIndex, field, value) => {
    const updated = [...variants];
    updated[vIndex].options[oIndex][field] = value;
    setVariants(updated);
  };

  const addVariant = () => {
    setVariants([...variants, { name: "", isRequired: false, options: [{ label: "", priceDifference: 0 }] }]);
  };

  const removeVariant = (index) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const addOption = (vIndex) => {
    const updated = [...variants];
    updated[vIndex].options.push({ label: "", priceDifference: 0 });
    setVariants(updated);
  };

  const removeOption = (vIndex, oIndex) => {
    const updated = [...variants];
    updated[vIndex].options = updated[vIndex].options.filter((_, i) => i !== oIndex);
    setVariants(updated);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();

      // Basic fields
      Object.entries(form).forEach(([key, value]) => {
        if (key !== "keyFeatures") {
          formData.append(key, value);
        }
      });

      // ✅ serialize tags into JSON
      formData.append("tags", JSON.stringify(tags));

      // ✅ serialize specs into JSON
      formData.append("specifications", JSON.stringify(specs));

      // ✅ serialize keyFeatures into JSON
      formData.append("keyFeatures", JSON.stringify(form.keyFeatures));

      // ✅ serialize variants into JSON
      formData.append("variants", JSON.stringify(variants));

      // Images
      images.forEach((img) => formData.append("images", img));

      const res = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to save");
      setLoading(false);
      toast({
        title: "✅ Product added successfully!",
        description: "Your product has been saved to the database.",
      });
      setForm({
        name: "",
        brand: "",
        stock: "",
        overview: "",
        category: "",
        oldPrice: "",
        newPrice: "",
        keyFeatures: {},
      });
      setTags([]);
      setSpecs([{ key: "", value: "" }]);
      setVariants([{ name: "", isRequired: false, options: [{ label: "", priceDifference: 0 }] }]);
      setImages([]);
    } catch (err) {
      setLoading(false);
      toast({
        variant: "destructive",
        title: "❌ Failed to save product",
        description: err.message,
      });
    }
  }

    if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex">
      {/* LEFT: Form */}
      <form onSubmit={handleSubmit} className="flex-1 space-y-6 pr-8 max-w-3xl">
        <Card className="border-navy-700 shadow">
          <CardHeader className="bg-navy-700 text-white rounded-t-lg">
            <CardTitle>Add Product</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div>
              <Label>Product Name*</Label>
              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label>Overview</Label>
              <Textarea
                name="overview"
                value={form.overview}
                onChange={handleChange}
                className="w-full border rounded-md p-2 h-40"
                placeholder="Write a detailed product overview..."
              />
            </div>

            <div>
              <Label>Category*</Label>
              <Select
                value={form.category}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat._id} value={cat._id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                  <SelectItem value="__new__">+ Add New Category</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Brand</Label>
              <Input name="brand" value={form.brand} onChange={handleChange} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Stock</Label>
                <Input
                  type="number"
                  name="stock"
                  value={form.stock}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label>New Price*</Label>
                <Input
                  type="number"
                  name="newPrice"
                  value={form.newPrice}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label>Old Price</Label>
                <Input
                  type="number"
                  name="oldPrice"
                  value={form.oldPrice}
                  onChange={handleChange}
                />
              </div>
            </div>

            <Separator />

            {/* Tags */}
            <div>
              <Label>Tags</Label>
              <Input
                placeholder="Type and press Enter"
                onKeyDown={handleTagAdd}
              />
              <div className="flex gap-2 mt-2 flex-wrap">
                {tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-black text-white px-3 py-1 rounded-lg flex items-center gap-2"
                  >
                    {tag}
                    <button type="button" onClick={() => removeTag(i)}>
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Specifications */}
            <Accordion type="single" collapsible>
              <AccordionItem value="specs">
                <AccordionTrigger>Specifications</AccordionTrigger>
                <AccordionContent>
                  {specs.map((s, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                      <Input
                        placeholder="Key"
                        value={s.key}
                        onChange={(e) =>
                          handleSpecChange(i, "key", e.target.value)
                        }
                      />
                      <Input
                        placeholder="Value"
                        value={s.value}
                        onChange={(e) =>
                          handleSpecChange(i, "value", e.target.value)
                        }
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => removeSpec(i)}
                      >
                        ✕
                      </Button>
                    </div>
                  ))}
                  <Button type="button" onClick={addSpec}>
                    + Add Specification
                  </Button>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Key Features */}
            {form.category && (
              <div>
                <h3 className="text-lg font-semibold">Key Features</h3>
                <div className="space-y-4 mt-2">
                  {Object.keys(form.keyFeatures).map((key) => (
                    <div key={key}>
                      <label className="block text-sm font-medium capitalize">
                        {key.replace(/([A-Z])/g, " $1")}
                      </label>
                      <textarea
                        value={form.keyFeatures[key]}
                        onChange={(e) =>
                          handleKeyFeatureChange(key, e.target.value)
                        }
                        className="w-full border rounded-md p-2 h-25"
                        placeholder={`Enter ${key} details...`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
                        {/* Variants */}
            <Accordion type="multiple">
              <AccordionItem value="variants">
                <AccordionTrigger>Variants</AccordionTrigger>
                <AccordionContent>
                  {variants.map((variant, vIndex) => (
                    <div key={vIndex} className="border p-3 rounded-lg mb-4">
                      <div className="flex justify-between items-center">
                        <Input
                          placeholder="Variant name (e.g. RAM, Storage)"
                          value={variant.name}
                          onChange={(e) =>
                            handleVariantChange(vIndex, "name", e.target.value)
                          }
                        />
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removeVariant(vIndex)}
                        >
                          ✕
                        </Button>
                      </div>
                      <div className="flex items-center mt-2 gap-2">
                        <Checkbox
                          checked={variant.isRequired}
                          onCheckedChange={(checked) =>
                            handleVariantChange(vIndex, "isRequired", checked)
                          }
                        />
                        <Label>This option is required</Label>
                      </div>

                      <div className="mt-4">
                        {variant.options.map((opt, oIndex) => (
                          <div key={oIndex} className="flex gap-2 mb-2">
                            <Input
                              placeholder="Option label (e.g. 8GB)"
                              value={opt.label}
                              onChange={(e) =>
                                handleOptionChange(vIndex, oIndex, "label", e.target.value)
                              }
                            />
                            <Input
                              type="number"
                              placeholder="Price difference"
                              value={opt.priceDifference}
                              onChange={(e) =>
                                handleOptionChange(
                                  vIndex,
                                  oIndex,
                                  "priceDifference",
                                  e.target.value
                                )
                              }
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              onClick={() => removeOption(vIndex, oIndex)}
                            >
                              ✕
                            </Button>
                          </div>
                        ))}
                        <Button
                          type="button"
                          onClick={() => addOption(vIndex)}
                          variant="secondary"
                        >
                          + Add Option
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button type="button" onClick={addVariant}>
                    + Add Variant
                  </Button>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </form>

      {/* RIGHT: Images + Save */}
      <div className="w-80 space-y-6">
        <Card className="sticky top-8 border-navy-700 shadow">
          <CardHeader className="bg-navy-700 text-white rounded-t-lg">
            <CardTitle>Images</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="border-2 border-dashed border-navy-700 rounded-lg p-6 text-center text-sm text-gray-500">
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="hidden"
                id="fileUpload"
              />
              <label htmlFor="fileUpload" className="cursor-pointer">
                Click or drag images here
              </label>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto">
              {images.map((img, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2 border rounded-lg"
                >
                  <span className="text-sm truncate">{img.name}</span>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeImage(i)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>

            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-navy-800"
              onClick={handleSubmit}
            >
              Save Product
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Add Category Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Enter category name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <DialogFooter>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddCategory}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
