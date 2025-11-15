import Header from "@/components/layouts/main-layout/header";
import {Footer} from "@/components/layouts/main-layout/footer";
import { WhatsAppIcon } from "@/components/layouts/main-layout/WhatsAppIcon";
export default function ClientLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
      <WhatsAppIcon />
    </div>
  );
}
