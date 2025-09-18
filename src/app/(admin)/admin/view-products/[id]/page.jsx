// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";

// export default async function ProductPage({ params }) {
//   const router = useRouter();
//   const [product, setProduct] = useState(null);
//   const [editedProduct, setEditedProduct] = useState(null);
//   const [isChanged, setIsChanged] = useState(false);

//   const { id } = await params;

//   useEffect(() => {
//     const fetchProduct = async () => {
//       const baseUrl =
//         process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
//       const res = await fetch(`${baseUrl}/api/products/${id}`, {
//         cache: "no-store",
//       });
//       const data = await res.json();
//       setProduct(data);
//       setEditedProduct(data);
//     };
//     fetchProduct();
//   }, [id]);

//   // handle input changes
//   const handleChange = (field, value) => {
//     setEditedProduct((prev) => {
//       const updated = { ...prev, [field]: value };
//       setIsChanged(JSON.stringify(product) !== JSON.stringify(updated));
//       return updated;
//     });
//   };

//   const handleNestedChange = (section, key, value) => {
//     setEditedProduct((prev) => {
//       const updated = {
//         ...prev,
//         [section]: { ...prev[section], [key]: value },
//       };
//       setIsChanged(JSON.stringify(product) !== JSON.stringify(updated));
//       return updated;
//     });
//   };

//   const handleSave = async () => {
//     const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
//     const res = await fetch(`${baseUrl}/api/products/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(editedProduct),
//     });
//     if (res.ok) {
//       const updated = await res.json();
//       setProduct(updated);
//       setEditedProduct(updated);
//       setIsChanged(false);
//     }
//   };

//   const handleDelete = async () => {
//     const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
//     const res = await fetch(`${baseUrl}/api/products/${id}`, {
//       method: "DELETE",
//     });
//     if (res.ok) {
//       router.push("/admin/view-products");
//     }
//   };

//   if (!editedProduct) return <p className="p-6">Loading...</p>;

//   return (
//     <div className="container mx-auto p-6">
//       <Card className="shadow-lg">
//         <CardHeader>
//           <CardTitle className="text-2xl">Edit Product</CardTitle>
//           <p className="text-muted-foreground">Make changes and save</p>
//         </CardHeader>

//         <CardContent className="space-y-6">
//           {/* Name + Brand */}
//           <Input
//             value={editedProduct.name || ""}
//             onChange={(e) => handleChange("name", e.target.value)}
//             placeholder="Product Name"
//             className="mb-2"
//           />
//           <Input
//             value={editedProduct.brand || ""}
//             onChange={(e) => handleChange("brand", e.target.value)}
//             placeholder="Brand"
//           />

//           <Separator />

//           {/* Images */}
//           {editedProduct.images?.length > 0 && (
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//               {editedProduct.images.map((src, i) => (
//                 <Image
//                   key={i}
//                   src={src}
//                   alt={editedProduct.name}
//                   width={300}
//                   height={200}
//                   className="rounded-xl object-cover"
//                 />
//               ))}
//             </div>
//           )}

//           <Separator />

//           {/* Prices */}
//           <div className="flex gap-4">
//             <Input
//               type="number"
//               value={editedProduct.oldPrice || ""}
//               onChange={(e) => handleChange("oldPrice", e.target.value)}
//               placeholder="Old Price"
//             />
//             <Input
//               type="number"
//               value={editedProduct.newPrice || ""}
//               onChange={(e) => handleChange("newPrice", e.target.value)}
//               placeholder="New Price"
//             />
//           </div>

//           {/* Overview */}
//           <Textarea
//             value={editedProduct.overview || ""}
//             onChange={(e) => handleChange("overview", e.target.value)}
//             placeholder="Overview"
//           />

//           {/* Tags */}
//           {editedProduct.tags?.length > 0 && (
//             <div className="flex flex-wrap gap-2">
//               {editedProduct.tags.map((tag, i) => (
//                 <Badge key={i} variant="secondary">
//                   {tag}
//                 </Badge>
//               ))}
//             </div>
//           )}

//           <Separator />

//           {/* Specifications */}
//           {editedProduct.specifications?.length > 0 && (
//             <div>
//               <h3 className="font-semibold mb-2">Specifications</h3>
//               <Table>
//                 <TableBody>
//                   {editedProduct.specifications.map((spec, i) => (
//                     <TableRow key={i}>
//                       <TableCell>
//                         <Input
//                           value={spec.key}
//                           onChange={(e) =>
//                             handleNestedChange("specifications", i, {
//                               ...spec,
//                               key: e.target.value,
//                             })
//                           }
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <Input
//                           value={spec.value}
//                           onChange={(e) =>
//                             handleNestedChange("specifications", i, {
//                               ...spec,
//                               value: e.target.value,
//                             })
//                           }
//                         />
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </div>
//           )}

//           <Separator />

//           {/* Key Features */}
//           {/* Key Features */}
//           {editedProduct.keyFeatures && (
//             <div>
//               <h3 className="font-semibold mb-2 text-lg">Key Features</h3>
//               <div className="space-y-4">
//                 {Object.entries(editedProduct.keyFeatures).map(
//                   ([key, value], i) =>
//                     value ? (
//                       <div key={i} className="flex flex-col space-y-2">
//                         <label className="capitalize font-medium text-sm text-muted-foreground">
//                           {key.replace(/([A-Z])/g, " $1")}
//                         </label>
//                         <textarea
//                           defaultValue={value}
//                           className="w-full min-h-[100px] resize-y rounded-lg border border-gray-300 p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                           onChange={() => setIsEdited(true)} // this will enable Save button
//                         />
//                       </div>
//                     ) : null
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Action Buttons */}
//           <div className="flex justify-end gap-4">
//             <Button variant="destructive" onClick={handleDelete}>
//               Delete
//             </Button>
//             <Button onClick={handleSave} disabled={!isChanged}>
//               Save
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
import ProductEditor from "./ProductEditor";

// ✅ Fetch product via API
async function getProduct(id) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/products/${id}`, { cache: "no-store" });

  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

  return (
    <div className="container mx-auto p-6">
      <ProductEditor initialProduct={product} />
    </div>
  );
}

