import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { TopNav } from "@/components/layout/top-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="max-h-svh overflow-hidden">
      <AppSidebar />
      <SidebarInset>
        <TopNav />
        <div className="flex min-h-0 flex-1 flex-col overflow-auto p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
