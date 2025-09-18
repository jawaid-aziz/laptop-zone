// components/footer.tsx
import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#0a1435] text-gray-300">
      <div className="container mx-auto px-6 py-14 grid gap-12 md:grid-cols-5">
        
        {/* Logo & Socials */}
        <div className="space-y-2">
          <Image src="/logo.png" alt="Laptop Zone" width={180} height={70} />
          <div className="flex gap-5">
            <Link href="#" aria-label="Facebook">
              <Facebook size={18} className="hover:text-white transition-colors" />
            </Link>
            <Link href="#" aria-label="LinkedIn">
              <Linkedin size={18} className="hover:text-white transition-colors" />
            </Link>
            <Link href="#" aria-label="Instagram">
              <Instagram size={18} className="hover:text-white transition-colors" />
            </Link>
            <Link href="#" aria-label="YouTube">
              <Youtube size={18} className="hover:text-white transition-colors" />
            </Link>
          </div>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold mb-5 text-sm tracking-wide uppercase text-white">Support</h3>
          <ul className="space-y-3 text-sm">
            <li><Link href="/contact-us" className="hover:text-white">Contact Us</Link></li>
            <li><Link href="/faq" className="hover:text-white">FAQs</Link></li>
            <li><Link href="/store-locator" className="hover:text-white">Store Locator</Link></li>
            <li><Link href="/shipping" className="hover:text-white">Shipping</Link></li>
          </ul>
        </div>

        {/* Shop */}
        <div>
          <h3 className="font-semibold mb-5 text-sm tracking-wide uppercase text-white">Shop</h3>
          <ul className="space-y-3 text-sm">
            <li><Link href="#" className="hover:text-white">Branded Laptops</Link></li>
            <li><Link href="#" className="hover:text-white">Laptop Accessories</Link></li>
            <li><Link href="#" className="hover:text-white">Laptop Bags</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold mb-5 text-sm tracking-wide uppercase text-white">Company</h3>
          <ul className="space-y-3 text-sm">
            <li><Link href="about-us" className="hover:text-white">About Us</Link></li>
            <li><Link href="#" className="hover:text-white">Laptop Repair Service</Link></li>
            <li><Link href="#" className="hover:text-white">Laptop Rental</Link></li>
            <li><Link href="#" className="hover:text-white">Blog</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-5 text-sm tracking-wide uppercase text-white">Contact</h3>
          <p className="text-sm">+92 300 3219047</p>
          <p className="text-sm">support@laptopzone.pk</p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700 mt-6 py-5 px-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
        <p>© 2024 Laptop Zone. All rights reserved.</p>
        <div className="flex gap-6 mt-3 md:mt-0">
          <Link href="/terms" className="hover:text-white">Terms & Conditions</Link>
          <Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  )
}
