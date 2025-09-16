"use client";

import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User, Search } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { cart } = useCart();
  return (
    <header className="w-full border-b">
      {/* Top Bar */}
      <div className="bg-black text-white text-sm py-2 px-4 text-center">
        Free Shipping in Nawabshah 🚚
      </div>

      {/* Main Nav */}
      <div className="flex items-center justify-between px-4 md:px-10 py-4">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/logo.png" // Replace with your downloaded logo path
            alt="Prime Traders"
            width={150}
            height={40}
            priority
          />
        </Link>

        {/* Navigation Menu */}
        <nav className="hidden md:flex gap-8 font-medium">
          <Link href="/" className="hover:text-primary transition">
            Home
          </Link>
          <Link href="/" className="hover:text-primary transition">
            Shop
          </Link>
          <Link href="/" className="hover:text-primary transition">
            About Us
          </Link>
        </nav>

        {/* Search + Icons */}
        <div className="flex items-center gap-4">
          {/* Search Input */}
          <div className="relative hidden md:block">
            <Input
              type="text"
              placeholder="Search products..."
              className="pl-10 w-[220px]"
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-500"
              size={18}
            />
          </div>

          {/* User Icon */}
          <Button variant="ghost" size="icon">
            <User className="w-5 h-5" />
          </Button>

          {/* Cart Icon */}
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="w-5 h-5" />
            {/* Cart badge */}
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
                {cart.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
