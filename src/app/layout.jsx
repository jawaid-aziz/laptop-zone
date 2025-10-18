import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Toaster from "@/components/ui/toaster";

export const metadata = {
  title: "Laptop Zone",
  description: "Branded laptops – quality and savings in one place",
  icons: {
    icon: "/logo.png",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <Toaster>
      <CartProvider>
        {children}
      </CartProvider>
      </Toaster>
      </body>
    </html>
  );
}
