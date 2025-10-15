"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";

export default function ProductEditor({ initialProduct }) {
  const [product, setProduct] = useState(initialProduct);
  const [editedProduct, setEditedProduct] = useState(initialProduct);
  const [isDirty, setIsDirty] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  // ✅ Show toast if initialProduct is missing
  useEffect(() => {
    if (!initialProduct) {
      toast({
        title: "❌ Error",
        description: "Product not found or failed to load.",
        variant: "destructive",
      });
    }
  }, [initialProduct, toast]);

  if (!initialProduct) {
    return (
      <div className="p-6 text-red-500">
        Could not load product. Please try again later.
      </div>
    );
  }

  // Track changes
  useEffect(() => {
    setIsDirty(JSON.stringify(product) !== JSON.stringify(editedProduct));
  }, [editedProduct, product]);

  const handleChange = (field, value) => {
    setEditedProduct((prev) => ({ ...prev, [field]: value }));
  };

  const handleKeyFeatureChange = (key, value) => {
    setEditedProduct((prev) => ({
      ...prev,
      keyFeatures: { ...prev.keyFeatures, [key]: value },
    }));
  };

  const handleSpecChange = (index, key, value) => {
    const newSpecs = [...editedProduct.specifications];
    newSpecs[index][key] = value;
    setEditedProduct((prev) => ({ ...prev, specifications: newSpecs }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", editedProduct.name);
      formData.append("brand", editedProduct.brand);
      formData.append("stock", editedProduct.stock);
      formData.append("overview", editedProduct.overview);
      formData.append("category", editedProduct.category._id);

      formData.append("oldPrice", editedProduct.oldPrice);
      formData.append("newPrice", editedProduct.newPrice);

      formData.append("tags", JSON.stringify(editedProduct.tags || []));
      formData.append(
        "specifications",
        JSON.stringify(editedProduct.specifications || [])
      );
      formData.append(
        "keyFeatures",
        JSON.stringify(editedProduct.keyFeatures || {})
      );
      
      formData.append("variants", JSON.stringify(editedProduct.variants || []));

      // Append images if user selected new ones
      if (editedProduct.newImages && editedProduct.newImages.length > 0) {
        for (const file of editedProduct.newImages) {
          formData.append("images", file);
        }
      }

      const res = await fetch(`/api/products/${product._id}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to save product");

      const updated = await res.json();
      setProduct(updated);
      setEditedProduct(updated);
      setIsDirty(false);
      toast({
        title: "✅ Product Updated",
        description: "The product has been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "❌ Error",
        description:
          error.message || "Something went wrong while updating the product.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/products/${product._id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete product");

      const result = await res.json();
      router.push("/admin/view-products");

      // optional: redirect or clear state
      setProduct(null);
      toast({
        title: "✅ Product Deleted",
        description: "The product has been deleted successfully.",
      });
    } catch (error) {
      toast({
        title: "❌ Error",
        description:
          error.message || "Something went wrong while deleting the product.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!product) {
    return <p className="text-red-500">This product has been deleted.</p>;
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>
          <input
            type="text"
            value={editedProduct.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="text-2xl font-bold border-none focus:outline-none bg-transparent w-full"
          />
        </CardTitle>
        <input
          type="text"
          value={editedProduct.brand}
          onChange={(e) => handleChange("brand", e.target.value)}
          className="text-muted-foreground border-none focus:outline-none bg-transparent w-full"
        />
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Stock */}
        <div>
          <label className="font-medium">Stock:</label>
          <input
            type="number"
            value={editedProduct.stock}
            onChange={(e) => handleChange("stock", Number(e.target.value))}
            className="ml-2 border p-1 rounded w-24"
          />
        </div>

        {/* Images */}
        {editedProduct.images?.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {editedProduct.images.map((src, i) => (
              <Image
                key={i}
                src={src}
                alt={editedProduct.name}
                width={300}
                height={200}
                className="rounded-xl object-cover"
              />
            ))}
          </div>
        )}
        {/* Optional: input for adding new images */}
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) =>
            setEditedProduct((prev) => ({
              ...prev,
              newImages: Array.from(e.target.files),
            }))
          }
        />

        <Separator />

        {/* Prices */}
        <div className="flex items-center gap-4">
          <input
            type="number"
            value={editedProduct.oldPrice || ""}
            onChange={(e) => handleChange("oldPrice", e.target.value)}
            placeholder="Old Price"
            className="line-through text-muted-foreground border px-2 py-1 rounded"
          />
          <input
            type="number"
            value={editedProduct.newPrice || ""}
            onChange={(e) => handleChange("newPrice", e.target.value)}
            placeholder="New Price"
            className="text-xl font-bold text-green-600 border px-2 py-1 rounded"
          />
        </div>

        <Separator />

        {/* Variants */}
{/* Variants */}
{editedProduct.variants && (
  <div>
    <h3 className="font-semibold mb-3">Variants</h3>

    {editedProduct.variants.map((variant, vIndex) => (
      <Card key={vIndex} className="p-4 mb-4 border rounded-lg shadow-sm">
        {/* Variant Header */}
        <div className="flex items-center justify-between mb-3">
          <input
            type="text"
            value={variant.name}
            onChange={(e) => {
              const newVariants = structuredClone(editedProduct.variants);
              newVariants[vIndex].name = e.target.value;
              setEditedProduct((prev) => ({
                ...prev,
                variants: newVariants,
              }));
            }}
            placeholder="Variant name (e.g. RAM, Storage)"
            className="border px-3 py-1 rounded w-full max-w-xs"
          />

          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Required</label>
            <Switch
              checked={variant.isRequired}
              onCheckedChange={(checked) => {
                const newVariants = structuredClone(editedProduct.variants);
                newVariants[vIndex].isRequired = checked;
                setEditedProduct((prev) => ({
                  ...prev,
                  variants: newVariants,
                }));
              }}
            />
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                const newVariants = structuredClone(editedProduct.variants);
                newVariants.splice(vIndex, 1);
                setEditedProduct((prev) => ({
                  ...prev,
                  variants: newVariants,
                }));
              }}
            >
              Remove
            </Button>
          </div>
        </div>

        {/* Variant Options */}
        <div className="space-y-3">
          {variant.options?.map((option, oIndex) => (
            <div key={oIndex} className="flex items-center gap-3">
              <Input
                placeholder="Option label (e.g. 8GB, 256GB)"
                value={option.label}
                onChange={(e) => {
                  const newVariants = structuredClone(editedProduct.variants);
                  newVariants[vIndex].options[oIndex].label = e.target.value;
                  setEditedProduct((prev) => ({
                    ...prev,
                    variants: newVariants,
                  }));
                }}
                className="w-1/2"
              />
<Input
  type="number"
  placeholder="Price Difference"
  value={
    option.priceDifference === 0
      ? "" // Show empty instead of 0
      : option.priceDifference
  }
  onChange={(e) => {
    const newVariants = structuredClone(editedProduct.variants);
    const value = e.target.value;

    newVariants[vIndex].options[oIndex].priceDifference =
      value === "" ? 0 : Number(value);

    setEditedProduct((prev) => ({
      ...prev,
      variants: newVariants,
    }));
  }}
  className="w-1/3"
/>

              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const newVariants = structuredClone(editedProduct.variants);
                  newVariants[vIndex].options.splice(oIndex, 1);
                  setEditedProduct((prev) => ({
                    ...prev,
                    variants: newVariants,
                  }));
                }}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>

        {/* Add Option Button */}
        <Button
          onClick={() => {
            const newVariants = structuredClone(editedProduct.variants);
            newVariants[vIndex].options.push({
              label: "",
              priceDifference: 0,
            });
            setEditedProduct((prev) => ({
              ...prev,
              variants: newVariants,
            }));
          }}
          className="mt-3"
          variant="secondary"
        >
          + Add Option
        </Button>
      </Card>
    ))}

    {/* Add Variant Button */}
    <Button
      onClick={() => {
        const newVariants = structuredClone(editedProduct.variants || []);
        newVariants.push({ name: "", isRequired: false, options: [] });
        setEditedProduct((prev) => ({
          ...prev,
          variants: newVariants,
        }));
      }}
      variant="default"
    >
      + Add Variant
    </Button>
  </div>
)}


        <Separator />

        {/* Overview */}
        <textarea
          value={editedProduct.overview || ""}
          onChange={(e) => handleChange("overview", e.target.value)}
          placeholder="Product overview..."
          className="w-full border p-2 rounded"
        />

        <Separator />

        {/* Specifications */}
        {editedProduct.specifications?.length > 0 && (
          <div>
            <h3 className="font-semibold mb-2">Specifications</h3>
            <Table>
              <TableBody>
                {editedProduct.specifications.map((spec, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <input
                        type="text"
                        value={spec.key}
                        onChange={(e) =>
                          handleSpecChange(i, "key", e.target.value)
                        }
                        className="border p-1 rounded w-full"
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="text"
                        value={spec.value}
                        onChange={(e) =>
                          handleSpecChange(i, "value", e.target.value)
                        }
                        className="border p-1 rounded w-full"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        <Separator />

        {/* Key Features */}
        {editedProduct.keyFeatures && (
          <div>
            <h3 className="font-semibold mb-2">Key Features</h3>
            {Object.entries(editedProduct.keyFeatures).map(([key, value]) => (
              <div key={key} className="mb-2">
                <label className="capitalize font-medium block">
                  {key.replace(/([A-Z])/g, " $1")}
                </label>
                <textarea
                  value={value || ""}
                  onChange={(e) => handleKeyFeatureChange(key, e.target.value)}
                  className="w-full border p-2 rounded"
                />
              </div>
            ))}
          </div>
        )}

        {/* Tags */}
        {editedProduct.tags?.length > 0 && (
          <div>
            <h3 className="font-semibold mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {editedProduct.tags.map((tag, i) => (
                <span key={i} className="px-2 py-1 border rounded bg-gray-100">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <Separator />

        {/* Save/Delete */}
        <div className="flex justify-end gap-4 pt-4">
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
          <Button disabled={!isDirty || loading} onClick={handleSave}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
