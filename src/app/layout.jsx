import "./globals.css";
import { CartProvider } from "@/context/CartContext";

export const metadata = {
  title: "Laptop Zone",
  description: "Branded laptops – quality and savings in one place",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <CartProvider>
        {children}
      </CartProvider>
      </body>
    </html>
  );
}
