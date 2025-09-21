"use client";

import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User, Search } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Facebook, Instagram, Twitter, Mail, HelpCircle } from "lucide-react";

export default function Header() {
  const { cart } = useCart();
  return (
    <header className="w-full border-b">
      {/* Top Bar */}
    <div className="bg-gray-800 text-gray-200 text-sm py-2 px-6 flex items-center justify-between">
      {/* Left Section */}
      <div className="flex items-center gap-2">
        <span className="animate-bounce">🚚</span>
        <span>
          Free Shipping in <span className="font-semibold text-white">Nawabshah</span>
        </span>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <Link
          href="/faq"
          className="hover:text-gray-400 flex items-center gap-1 transition-colors"
        >
          <HelpCircle size={14} /> FAQ
        </Link>
        <Link
          href="/contact-us"
          className="hover:text-gray-400 flex items-center gap-1 transition-colors"
        >
          <Mail size={14} /> Contact Us
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="#"
            target="_blank"
            className="hover:text-blue-500 transition-colors"
          >
            <Facebook size={16} />
          </Link>
          <Link
            href="#"
            target="_blank"
            className="hover:text-pink-500 transition-colors"
          >
            <Instagram size={16} />
          </Link>
          <Link
            href="#"
            target="_blank"
            className="hover:text-sky-400 transition-colors"
          >
            <Twitter size={16} />
          </Link>
        </div>
      </div>
    </div>


      {/* Main Nav */}
      <div className="flex items-center justify-between px-4 md:px-10 py-4">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/logo_boldText.png" // Replace with your downloaded logo path
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
          <Link href="/shop" className="hover:text-primary transition">
            Shop
          </Link>
          <Link href="/about-us" className="hover:text-primary transition">
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
          {/* <Button variant="ghost" size="icon">
            <User className="w-5 h-5" />
          </Button> */}

          {/* Cart Icon */}
          <Link href="/cart">
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="w-5 h-5" />
            {/* Cart badge */}
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
                {cart.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
          </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
