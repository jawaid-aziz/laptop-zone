import "./globals.css";
import Header from "@/components/layouts/main-layout/header";
import { Footer } from "@/components/layouts/main-layout/footer";
export const metadata = {
  title: "Laptop Zone",
  description: "Branded laptops – quality and savings in one place",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
