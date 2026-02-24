"use client";

import { use, useState, useCallback } from "react";
import Link from "next/link";
import {
  Paintbrush,
  Component,
  Globe,
  ArrowLeft,
  Upload,
  Settings2,
  Pencil,
  Check,
  X,
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
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
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
import { ComponentPreview } from "@/components/component-builder/component-preview";
import {
  getLibraryById,
  getVariablesByLibrary,
  getComponentsByLibrary,
  getInstallationsByLibrary,
  MOCK_SITES,
} from "@/lib/mock-data";
import type { Variable } from "@/types/database";

export default function LibraryDetailPage({
  params,
}: {
  params: Promise<{ libraryId: string }>;
}) {
  const { libraryId } = use(params);
  const library = getLibraryById(libraryId);
  const [activeTab, setActiveTab] = useState("overview");

  if (!library) {
    return (
      <div className="space-y-4">
        <p className="text-muted-foreground">Library not found.</p>
        <Button variant="outline" asChild>
          <Link href="/libraries">
            <ArrowLeft className="mr-2 size-4" />
            Back to Libraries
          </Link>
        </Button>
      </div>
    );
  }

  const [variables, setVariables] = useState(() => getVariablesByLibrary(library.id));
  const components = getComponentsByLibrary(library.id);
  const installations = getInstallationsByLibrary(library.id);

  const colorVars = variables.filter((v) => v.type === "color");
  const sizeVars = variables.filter((v) => v.type === "size");
  const fontVars = variables.filter((v) => v.type === "font");

  const handleVariableUpdate = useCallback(
    (id: string, field: "value_default" | "value_dark", value: string) => {
      setVariables((prev) =>
        prev.map((v) => (v.id === id ? { ...v, [field]: value } : v))
      );
      toast.success("Variable updated");
    },
    []
  );

  function handlePublish() {
    toast.success("Library published", {
      description: `Version ${library!.version + 1} is now available for consumer sites.`,
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/libraries" className="hover:text-foreground">
          Libraries
        </Link>
        <span>/</span>
        <span className="text-foreground">{library.name}</span>
      </div>

      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">{library.name}</h1>
          <p className="max-w-2xl text-muted-foreground">
            {library.description}
          </p>
          <div className="flex items-center gap-3 pt-2">
            <Badge variant="secondary">v{library.version}</Badge>
            <span className="text-sm text-muted-foreground">
              {installations.length} consumer{installations.length !== 1 && "s"}
            </span>
          </div>
        </div>
        <RoleGate action="CREATE_LIBRARY">
          <Button onClick={handlePublish}>
            <Upload className="mr-2 size-4" />
            Publish Updates
          </Button>
        </RoleGate>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="variables">
            <Paintbrush className="mr-1 size-3" />
            Brand Kit ({variables.length})
          </TabsTrigger>
          <TabsTrigger value="components">
            <Component className="mr-1 size-3" />
            Shared Components ({components.length})
          </TabsTrigger>
          <TabsTrigger value="consumers">
            <Globe className="mr-1 size-3" />
            Sites using library ({installations.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Variables</CardTitle>
                <Paintbrush className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{variables.length}</div>
                <p className="text-xs text-muted-foreground">
                  {colorVars.length} colors, {sizeVars.length} sizes,{" "}
                  {fontVars.length} fonts
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Components
                </CardTitle>
                <Component className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{components.length}</div>
                <p className="text-xs text-muted-foreground">
                  Shared building blocks
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Consumers
                </CardTitle>
                <Globe className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {installations.length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Sites using this library
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="variables" className="space-y-6">
          {colorVars.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Colors</CardTitle>
                <CardDescription>Brand and UI color tokens.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {colorVars.map((v) => (
                    <EditableVariableRow
                      key={v.id}
                      variable={v}
                      onSave={handleVariableUpdate}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {sizeVars.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Sizes</CardTitle>
                <CardDescription>Spacing and border-radius tokens.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sizeVars.map((v) => (
                    <EditableVariableRow
                      key={v.id}
                      variable={v}
                      onSave={handleVariableUpdate}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {fontVars.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Fonts</CardTitle>
                <CardDescription>Typography font-family tokens.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {fontVars.map((v) => (
                    <EditableVariableRow
                      key={v.id}
                      variable={v}
                      onSave={handleVariableUpdate}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="components" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {components.map((comp) => {
              const propCount = Object.keys(comp.props_schema).length;
              return (
                <Card key={comp.id} className="flex flex-col">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{comp.name}</CardTitle>
                      <Button variant="ghost" size="icon" className="size-8">
                        <Settings2 className="size-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col">
                    <div className="flex-1">
                      <ComponentPreview component={comp} scale="sm" />
                    </div>
                    <Separator className="my-3" />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{propCount} props</span>
                        <span>
                          Updated{" "}
                          {new Date(comp.updated_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <Button variant="secondary" size="sm" className="h-7 text-xs" asChild>
                        <Link href={`/libraries/${library.id}/components/${comp.id}`}>
                          Manage
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
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
            <CardContent>
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

function EditableVariableRow({
  variable,
  onSave,
}: {
  variable: Variable;
  onSave: (id: string, field: "value_default" | "value_dark", value: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(variable.value_default);

  function handleConfirm() {
    if (draft.trim() && draft !== variable.value_default) {
      onSave(variable.id, "value_default", draft.trim());
    }
    setEditing(false);
  }

  function handleCancel() {
    setDraft(variable.value_default);
    setEditing(false);
  }

  const isColor = variable.type === "color";
  const isFont = variable.type === "font";

  return (
    <div className="flex items-center justify-between rounded-lg border p-3">
      <div className="flex items-center gap-3">
        {isColor && (
          <div
            className="size-8 shrink-0 rounded-md border"
            style={{ backgroundColor: variable.value_default }}
          />
        )}
        <div className="min-w-0">
          <p className="text-sm font-medium">--{variable.key}</p>
          {editing ? (
            <div className="mt-1 flex items-center gap-1.5">
              {isColor && (
                <input
                  type="color"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  className="size-7 cursor-pointer rounded border p-0.5"
                />
              )}
              <Input
                className="h-7 w-36 text-xs"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleConfirm();
                  if (e.key === "Escape") handleCancel();
                }}
                autoFocus
              />
              <Button
                variant="ghost"
                size="icon"
                className="size-6 text-green-600 hover:text-green-700"
                onClick={handleConfirm}
              >
                <Check className="size-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="size-6 text-muted-foreground hover:text-destructive"
                onClick={handleCancel}
              >
                <X className="size-3.5" />
              </Button>
            </div>
          ) : (
            <p
              className="text-xs text-muted-foreground"
              style={isFont ? { fontFamily: variable.value_default } : undefined}
            >
              {variable.value_default}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {!editing && variable.value_dark && (
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-muted-foreground">Dark:</span>
            {isColor && (
              <div
                className="size-5 rounded border"
                style={{ backgroundColor: variable.value_dark }}
              />
            )}
            <span className="text-xs text-muted-foreground">
              {variable.value_dark}
            </span>
          </div>
        )}
        {!editing && (
          <Button
            variant="ghost"
            size="icon"
            className="size-7 text-muted-foreground hover:text-foreground"
            onClick={() => setEditing(true)}
          >
            <Pencil className="size-3.5" />
          </Button>
        )}
      </div>
    </div>
  );
}

