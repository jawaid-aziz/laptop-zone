import { AppSidebar } from "@/components/layouts/admin-layout/AppSidebar";
import { Header } from "@/components/layouts/admin-layout/Header";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <div className="flex">
            {/* Sidebar */}
            <AppSidebar />
          </div>

          <div className="flex flex-col w-full">
            {/* Header */}
            <div>
              <Header />
            </div>

            {/* Page Content */}
            <div>
              {children}
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
