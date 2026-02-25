"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Settings,
  ChevronUp,
  LogOut,
} from "lucide-react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { ROLE_LABELS } from "@/lib/constants/roles";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";

interface NavItem {
  title: string;
  href: string;
}

const MAIN_NAV: NavItem[] = [
  { title: "Home", href: "/" },
  { title: "Sites", href: "/sites" },
  { title: "Brand Libraries", href: "/libraries" },
  { title: "Custom Templates", href: "#" },
  { title: "Custom Apps", href: "#" },
  { title: "Media", href: "#" },
  { title: "CMS", href: "#" },
  { title: "Approvals", href: "#" },
];

const MANAGEMENT_NAV: NavItem[] = [
  { title: "Domains", href: "#" },
  { title: "Routing", href: "#" },
  { title: "Analytics & Monitoring", href: "#" },
  { title: "Security", href: "#" },
  { title: "Customer Care Tickets", href: "#" },
];

const ADMIN_NAV: NavItem[] = [
  { title: "Team", href: "#" },
  { title: "Settings", href: "/settings" },
];

function NavGroup({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {items.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href !== "/" && item.href !== "#" && pathname.startsWith(item.href));

        return (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
              <Link href={item.href}>
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}

export function AppSidebar() {
  const { user } = useCurrentUser();

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Sidebar collapsible="offcanvas" className="border-r !top-11 !h-[calc(100svh-2.75rem)]" style={{ "--sidebar-width": "228px" } as React.CSSProperties}>
      <SidebarHeader className="items-center px-4 py-[30px]">
        <div
          className="flex size-14 items-center justify-center rounded-lg text-lg font-semibold"
          style={{
            backgroundColor: "color-mix(in srgb, #E46209 12%, transparent)",
            color: "#E46209",
          }}
        >
          A
        </div>
      </SidebarHeader>

      <SidebarContent className="overflow-x-hidden">
        <SidebarGroup>
          <SidebarGroupContent>
            <NavGroup items={MAIN_NAV} />
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupContent>
            <NavGroup items={MANAGEMENT_NAV} />
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupContent>
            <NavGroup items={ADMIN_NAV} />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg">
                  <Avatar className="size-8">
                    <AvatarFallback className="text-xs">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user.name}</span>
                    <span className="truncate text-xs text-muted-foreground">
                      {ROLE_LABELS[user.role]}
                    </span>
                  </div>
                  <ChevronUp className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56"
                side="top"
                align="start"
              >
                <DropdownMenuLabel>
                  <span className="block text-sm font-medium">{user.name}</span>
                  <span className="block text-xs text-muted-foreground">
                    {user.email}
                  </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/settings">
                    <Settings className="mr-2 size-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 size-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
