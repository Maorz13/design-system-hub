"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Globe,
  Plus,
  MoreHorizontal,
  Monitor,
  LayoutGrid,
  LayoutList,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toggle } from "@/components/ui/toggle";
import { EmptyState } from "@/components/shared/empty-state";
import { RoleGate } from "@/components/shared/role-gate";
import {
  MOCK_SITES,
  MOCK_INSTALLATIONS,
  MOCK_LIBRARIES,
} from "@/lib/mock-data";
import type { Site } from "@/types/database";

type ViewLayout = "list" | "grid";

function SiteActions({
  siteId,
  onDelete,
}: {
  siteId: string;
  onDelete: (id: string) => void;
}) {
  return (
    <RoleGate action="MANAGE_SITES">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="size-8"
            onClick={(e) => e.preventDefault()}
          >
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="text-destructive"
            onClick={(e) => {
              e.preventDefault();
              onDelete(siteId);
            }}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </RoleGate>
  );
}

export default function SitesPage() {
  const [sites, setSites] = useState<Site[]>(MOCK_SITES);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [layout, setLayout] = useState<ViewLayout>("list");

  function handleCreateSite() {
    if (!newName.trim()) return;
    const newSite: Site = {
      id: `site-${Date.now()}`,
      workspace_id: "ws-001",
      name: newName.trim(),
      type: "consumer",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setSites([...sites, newSite]);
    setNewName("");
    setDialogOpen(false);
    toast.success("Site created", {
      description: `${newSite.name} has been added to your workspace.`,
    });
  }

  function handleDeleteSite(siteId: string) {
    setSites(sites.filter((s) => s.id !== siteId));
    toast.success("Site removed");
  }

  function getInstalledLibraries(siteId: string) {
    return MOCK_INSTALLATIONS.filter((i) => i.consumer_site_id === siteId).map(
      (i) => MOCK_LIBRARIES.find((l) => l.id === i.library_id)?.name
    );
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sites</h1>
          <p className="text-muted-foreground">
            Manage sites in your workspace. Click a site to preview it.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-md border">
            <Toggle
              size="sm"
              pressed={layout === "list"}
              onPressedChange={() => setLayout("list")}
              aria-label="List view"
              className="rounded-none rounded-l-md"
            >
              <LayoutList className="size-4" />
            </Toggle>
            <Toggle
              size="sm"
              pressed={layout === "grid"}
              onPressedChange={() => setLayout("grid")}
              aria-label="Grid view"
              className="rounded-none rounded-r-md"
            >
              <LayoutGrid className="size-4" />
            </Toggle>
          </div>
          <RoleGate action="MANAGE_SITES">
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 size-4" />
                  New Site
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Site</DialogTitle>
                  <DialogDescription>
                    Add a new site to your workspace.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="site-name">Site Name</Label>
                    <Input
                      id="site-name"
                      placeholder="e.g. Marketing Website"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateSite}
                    disabled={!newName.trim()}
                  >
                    Create Site
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </RoleGate>
        </div>
      </div>

      {sites.length === 0 ? (
        <EmptyState
          icon={Globe}
          title="No sites yet"
          description="Create your first site to start building your design system ecosystem."
          actionLabel="Create Site"
          onAction={() => setDialogOpen(true)}
        />
      ) : layout === "list" ? (
        <div className="rounded-lg border">
          {sites.map((site, index) => {
            const libs = getInstalledLibraries(site.id);
            return (
              <Link key={site.id} href={`/consumer/${site.id}`}>
                <div
                  className={`flex items-center justify-between px-4 py-3 transition-colors hover:bg-muted/50 ${index !== sites.length - 1 ? "border-b" : ""}`}
                >
                  <div className="flex items-center gap-3">
                    <Monitor className="size-4 shrink-0 text-green-500" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium">{site.name}</p>
                      {libs.length > 0 && (
                        <div className="mt-0.5 flex flex-wrap gap-1">
                          {libs.map((name) => (
                            <Badge
                              key={name}
                              variant="outline"
                              className="text-[10px]"
                            >
                              {name}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">
                      {formatDate(site.updated_at)}
                    </span>
                    <SiteActions
                      siteId={site.id}
                      onDelete={handleDeleteSite}
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sites.map((site) => {
            const libs = getInstalledLibraries(site.id);
            return (
              <Link key={site.id} href={`/consumer/${site.id}`}>
                <Card className="transition-colors hover:border-primary/50">
                  <CardHeader className="flex flex-row items-start justify-between pb-3">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <Monitor className="size-4 text-green-500" />
                        {site.name}
                      </CardTitle>
                      <CardDescription>
                        <Badge variant="secondary" className="text-xs">
                          {site.type}
                        </Badge>
                      </CardDescription>
                    </div>
                    <SiteActions
                      siteId={site.id}
                      onDelete={handleDeleteSite}
                    />
                  </CardHeader>
                  <CardContent>
                    {libs.length > 0 && (
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-muted-foreground">
                          Installed Libraries
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {libs.map((name) => (
                            <Badge
                              key={name}
                              variant="outline"
                              className="text-xs"
                            >
                              {name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    <p className="mt-2 text-xs text-muted-foreground">
                      Updated {formatDate(site.updated_at)}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
