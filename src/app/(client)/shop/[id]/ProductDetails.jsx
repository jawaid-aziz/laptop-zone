"use client";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Check, Loader2 } from "lucide-react"; // ✅ Add icons

export default function ProductDetails({ product }) {
  const { addToCart } = useCart();

  // State
  const [selectedVariants, setSelectedVariants] = useState({});
  const [displayPrice, setDisplayPrice] = useState(Number(product.newPrice));
  const [isAdding, setIsAdding] = useState(false); // ✅ show spinner while adding
  const [added, setAdded] = useState(false); // ✅ show confirmation
  // ✅ Handle variant selection
  const handleVariantChange = (variantName, selectedOption) => {
    const updatedVariants = {
      ...selectedVariants,
      [variantName]: selectedOption,
    };

    setSelectedVariants(updatedVariants);

    // Calculate total price difference
    const totalDiff = Object.values(updatedVariants).reduce(
      (sum, opt) => sum + (Number(opt?.priceDifference) || 0),
      0
    );

    setDisplayPrice(Number(product.newPrice) + totalDiff);
  };

  // ✅ Prepare item for cart (matches Order model)
  const handleAddToCart = async () => {
    console.log("Selected Variants:", selectedVariants);
    setIsAdding(true);
    setAdded(false);
    // Map to match Order model's `selectedVariants`
    const variantList = Object.entries(selectedVariants).map(
      ([name, option]) => ({
        name,
        value: option?.label || "",
        extraCost: Number(option?.priceDifference) || 0,
        wasRequired: option?.wasRequired || false,
      })
    );

    const itemToAdd = {
      ...product,
      selectedVariants: variantList,
      basePrice: Number(product.newPrice),
      finalPrice: displayPrice,
      newPrice: displayPrice, // for backward compatibility with your CartContext
    };
    console.log(itemToAdd);

    // Simulate short delay for spinner (optional)
    await new Promise((r) => setTimeout(r, 800));
    addToCart(itemToAdd);
    setIsAdding(false);
    setAdded(true);
    
    // Reset confirmation after 2 seconds
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Breadcrumbs */}
      <div className="text-sm text-gray-500 mb-4">
        Home <span className="mx-2">›</span> Shop{" "}
        <span className="mx-2">›</span> {product.name}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left: Image */}
        <div className="relative">
          {product.stock === 0 && (
            <Badge className="absolute top-2 left-2 bg-gray-800 text-white">
              SOLD OUT
            </Badge>
          )}
          <Image
            src={product.images?.[0] || "/placeholder.png"}
            alt={product.name}
            width={600}
            height={400}
            className="rounded-lg object-contain w-full h-auto"
          />
        </div>

        {/* Right: Info */}
        <div>
          <h2 className="text-sm uppercase text-gray-500">{product.brand}</h2>
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>

          {/* Price */}
          <div className="flex items-center gap-3 mb-3">
            {product.oldPrice && (
              <span className="line-through text-gray-400 text-lg">
                Rs{product.oldPrice}
              </span>
            )}
            <span className="text-blue-600 font-bold text-2xl">
              Rs{displayPrice}
            </span>
            {product.stock === 0 && (
              <span className="text-sm text-gray-500">(Out of stock)</span>
            )}
          </div>

          {/* ✅ Variants Section */}
          {product.variants?.length > 0 && product.variants[0].name !== "" && (
            <div className="mb-4 space-y-4">
              {product.variants.map((variant, vIndex) => (
                <div key={vIndex}>
                  <h3 className="text-md font-semibold mb-2">{variant.name}</h3>

                  <RadioGroup
                    onValueChange={(value) => {
                      const selectedOption = variant.options.find(
                        (opt) => opt.label === value
                      );
                      handleVariantChange(variant.name, selectedOption);
                    }}
                    className="space-y-2"
                  >
                    {variant.options?.length > 0 ? (
                      variant.options.map((option, oIndex) => (
                        <div
                          key={oIndex}
                          className="flex items-center space-x-2 border rounded-lg p-2 hover:bg-gray-50"
                        >
                          <RadioGroupItem
                            value={option.label}
                            id={`variant-${vIndex}-${oIndex}`}
                          />
                          <Label
                            htmlFor={`variant-${vIndex}-${oIndex}`}
                            className="cursor-pointer"
                          >
                            {option.label}
                            {option.priceDifference > 0 && (
                              <span className="text-gray-500 text-sm ml-1">
                                (+Rs{option.priceDifference})
                              </span>
                            )}
                            {option.priceDifference < 0 && (
                              <span className="text-gray-500 text-sm ml-1">
                                (−Rs{Math.abs(option.priceDifference)})
                              </span>
                            )}
                          </Label>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm ml-2">
                        No options available
                      </p>
                    )}
                  </RadioGroup>
                </div>
              ))}
            </div>
          )}


          {/* ✅ Add to Cart Button with Feedback */}
          <div className="mb-4">
            <Button
              className={`w-full md:w-auto font-semibold rounded-lg shadow-md transition flex items-center justify-center gap-2 ${
                added
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
              disabled={isAdding || product.stock === 0}
              onClick={handleAddToCart}
            >
              {isAdding ? (
                <>
                  <Loader2 className="animate-spin w-4 h-4" />
                  Adding...
                </>
              ) : added ? (
                <>
                  <Check className="w-4 h-4" />
                  Added!
                </>
              ) : product.stock === 0 ? (
                "Out of Stock"
              ) : (
                "Add to Cart"
              )}
            </Button>
          </div>

          {/* Tags */}
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 mb-4">
            {product.tags?.length > 0 ? (
              product.tags.map((tag, i) => <li key={i}>{tag}</li>)
            ) : (
              <li className="text-gray-500">No tags available</li>
            )}
          </ul>

          <p className="text-sm text-gray-700 mb-2">
            <strong>Category:</strong>{" "}
            {product.category?.name || "Uncategorized"}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="description" className="w-full">
          <TabsList>
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="reviews">Reviews (0)</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="pt-6">
            {/* Specifications */}
            {product.specifications?.length > 0 && (
              <table className="w-full border text-sm text-left mb-8">
                <tbody>
                  {product.specifications.map((spec, i) => (
                    <tr key={i} className="border">
                      <td className="p-2 font-medium">{spec.key}</td>
                      <td className="p-2">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* Overview */}
            {product.overview && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Overview</h3>
                <p className="text-gray-700">{product.overview}</p>
              </div>
            )}

            {/* Key Features */}
            {product.keyFeatures &&
              Object.values(product.keyFeatures).some((val) => val) && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">Key Features</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {Object.entries(product.keyFeatures).map(
                      ([key, value]) =>
                        value && (
                          <li key={key}>
                            <span className="font-medium capitalize">
                              {key.replace(/([A-Z])/g, " $1")}:
                            </span>{" "}
                            {value}
                          </li>
                        )
                    )}
                  </ul>
                </div>
              )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
