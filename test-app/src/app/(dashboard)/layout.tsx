import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { TopHeader } from "@/components/layout/top-header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="flex h-svh flex-col overflow-hidden">
      <TopHeader />
      <div className="flex min-h-0 flex-1">
        <AppSidebar />
        <SidebarInset>
          <div className="flex min-h-0 flex-1 flex-col overflow-auto p-4 sm:p-6">
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
