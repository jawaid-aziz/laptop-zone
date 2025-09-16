import Header from "@/components/layouts/main-layout/header";
import {Footer} from "@/components/layouts/main-layout/footer";

export default function ClientLayout({ children }) {
  return (
    <div>
      
      <Header />
      {children}
      <Footer />
    </div>
  );
}
