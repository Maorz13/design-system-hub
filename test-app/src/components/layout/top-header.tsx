"use client";

import { Building2, ChevronDown, Menu } from "lucide-react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useSidebar } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function TopHeader() {
  const { user } = useCurrentUser();

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <header className="relative z-20 flex h-11 shrink-0 items-center justify-between bg-[#1b1b21] px-4">
      <div className="flex items-center gap-4">
        <MobileSidebarTrigger />
        <span className="text-sm font-semibold tracking-wide text-white">
          WIX <span className="font-light">STUDIO</span>
        </span>
        <Avatar className="hidden size-6 rounded-md sm:flex">
          <AvatarFallback className="rounded-md bg-violet-600 text-white">
            <Building2 className="size-3.5" />
          </AvatarFallback>
        </Avatar>
        <ChevronDown className="hidden size-3 text-white/50 sm:block" />

        <nav className="hidden items-center gap-1 md:flex">
          {["All Sites", "Resources", "Help"].map((label) => (
            <DropdownMenu key={label}>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 rounded px-2.5 py-1 text-sm text-white/80 transition-colors hover:text-white">
                  {label}
                  <ChevronDown className="size-3" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem>{label}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <Avatar className="size-7 cursor-pointer">
          <AvatarFallback className="bg-primary text-[10px] text-white">
            {initials}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}

function MobileSidebarTrigger() {
  const { toggleSidebar, isMobile } = useSidebar();

  if (!isMobile) return null;

  return (
    <button
      onClick={toggleSidebar}
      className="rounded p-1 text-white/60 transition-colors hover:text-white"
    >
      <Menu className="size-5" />
    </button>
  );
}
