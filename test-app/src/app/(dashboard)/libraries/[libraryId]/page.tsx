"use client";

import { use } from "react";
import Link from "next/link";
import {
  Paintbrush,
  Component,
  Globe,
  ArrowLeft,
  Upload,
  Plus,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RoleGate } from "@/components/shared/role-gate";
import { LibraryStatusBadge } from "@/components/libraries/library-status-badge";
import { BrandKitPanel } from "@/components/libraries/brand-kit-panel";
import { ComponentPreview } from "@/components/component-builder/component-preview";
import {
  getLibraryById,
  getVariablesByLibrary,
  getComponentsByLibrary,
  getInstallationsByLibrary,
  MOCK_SITES,
} from "@/lib/mock-data";
export default function LibraryDetailPage({
  params,
}: {
  params: Promise<{ libraryId: string }>;
}) {
  const { libraryId } = use(params);
  const library = getLibraryById(libraryId);

  if (!library) {
    return (
      <div className="space-y-4">
        <p className="text-muted-foreground">Library not found.</p>
        <Button variant="outline" asChild>
          <Link href="/libraries">
            <ArrowLeft className="mr-2 size-4" />
            Back to Brand Libraries
          </Link>
        </Button>
      </div>
    );
  }

  const variables = getVariablesByLibrary(library.id);
  const components = getComponentsByLibrary(library.id);
  const installations = getInstallationsByLibrary(library.id);

  function handlePublish() {
    toast.success("Library published", {
      description: `Version ${library!.version + 1} is now available for consumer sites.`,
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/libraries" className="hover:text-foreground">
          Brand Libraries
        </Link>
        <span>/</span>
        <span className="text-foreground">{library.name}</span>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{library.name}</h1>
            <Badge variant="secondary">v{library.version}</Badge>
          </div>
          <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
            Manage brand properties and shared components shared with sites.
          </p>
        </div>
        <RoleGate action="CREATE_LIBRARY">
          <Button onClick={handlePublish} className="w-full sm:w-auto">
            <Upload className="mr-2 size-4" />
            Publish Updates
          </Button>
        </RoleGate>
      </div>

      <Tabs defaultValue="variables">
        <TabsList variant="line">
          <TabsTrigger value="variables">
            <Paintbrush className="mr-1 size-3" />
            <span className="hidden sm:inline">Brand Properties</span>
            <span className="sm:hidden">Kit</span>
          </TabsTrigger>
          <TabsTrigger value="components">
            <Component className="mr-1 size-3" />
            <span className="hidden sm:inline">Shared Components ({components.length})</span>
            <span className="sm:hidden">Components</span>
          </TabsTrigger>
          <TabsTrigger value="consumers">
            <Globe className="mr-1 size-3" />
            <span className="hidden sm:inline">Sites using library ({installations.length})</span>
            <span className="sm:hidden">Sites</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="variables" className="space-y-6">
          <BrandKitPanel variables={variables} />
        </TabsContent>

        <TabsContent value="components">
          <div className="grid gap-3 sm:grid-cols-2">
            {components.map((comp) => (
              <Link
                key={comp.id}
                href={`/libraries/${library.id}/components/${comp.id}`}
                className="group"
              >
                <Card className="gap-3 py-3 overflow-hidden transition-colors hover:border-primary/50">
                  <div className="flex h-[220px] items-center justify-center overflow-hidden border-b">
                    <ComponentPreview component={comp} scale="sm" />
                  </div>
                  <CardContent className="flex items-center justify-between px-3 py-1.5">
                    <span className="text-xs font-medium">{comp.name}</span>
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                      <span>{Object.keys(comp.props_schema).length} props</span>
                      <span>{comp.variants} variant{comp.variants !== 1 && "s"}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
            <RoleGate action="CREATE_LIBRARY">
              <button
                onClick={() =>
                  toast("Coming soon", {
                    description: "Component builder will be available in the next update.",
                  })
                }
                className="group/add flex h-full min-h-[180px] cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-muted-foreground/25 transition-colors hover:border-primary/50 hover:bg-muted/30"
              >
                <div className="flex size-10 items-center justify-center rounded-full bg-muted transition-colors group-hover/add:bg-primary/10">
                  <Plus className="size-5 text-muted-foreground transition-colors group-hover/add:text-primary" />
                </div>
                <span className="text-sm font-medium text-muted-foreground transition-colors group-hover/add:text-foreground">
                  Create Component
                </span>
              </button>
            </RoleGate>
          </div>
        </TabsContent>

        <TabsContent value="consumers">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Consumer Sites</CardTitle>
              <CardDescription>
                Sites that have installed this library.
              </CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Site</TableHead>
                    <TableHead>Installed Version</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Installed</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {installations.map((inst) => {
                    const site = MOCK_SITES.find(
                      (s) => s.id === inst.consumer_site_id
                    );
                    return (
                      <TableRow key={inst.id}>
                        <TableCell className="font-medium">
                          {site?.name}
                        </TableCell>
                        <TableCell>v{inst.installed_version}</TableCell>
                        <TableCell>
                          <LibraryStatusBadge
                            installedVersion={inst.installed_version}
                            latestVersion={library.version}
                          />
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {new Date(inst.installed_at).toLocaleDateString(
                            "en-US",
                            { month: "short", day: "numeric", year: "numeric" }
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

