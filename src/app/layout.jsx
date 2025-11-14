import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Toaster from "@/components/ui/toaster";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Laptop Zone",
  description: "Branded laptops – quality and savings in one place",
  icons: {
    icon: "/logo.png",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
      <Toaster>
      <CartProvider>
        {children}
      </CartProvider>
      </Toaster>
      </body>
    </html>
  );
}
