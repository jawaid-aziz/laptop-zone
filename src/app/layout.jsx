import "./globals.css";

export const metadata = {
  title: "Laptop Zone",
  description: "Branded laptops – quality and savings in one place",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children} 
      </body>
    </html>
  );
}
