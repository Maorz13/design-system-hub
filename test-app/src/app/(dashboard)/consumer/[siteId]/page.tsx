"use client";

import { use, useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  GripVertical,
  Lock,
  Unlink,
  Type,
  Image,
  ToggleLeft,
  MousePointerClick,
  Library,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { ComponentPreview } from "@/components/component-builder/component-preview";
import { RoleGate } from "@/components/shared/role-gate";
import {
  getSiteById,
  getInstallationsBySite,
  getLibraryById,
  getComponentsByLibrary,
  getComponentById,
  getSiteLayout,
} from "@/lib/mock-data";
import type { SectionInstance } from "@/lib/mock-data";
import type { DesignComponent } from "@/types/database";

export default function ConsumerPage({
  params,
}: {
  params: Promise<{ siteId: string }>;
}) {
  const { siteId } = use(params);
  const site = getSiteById(siteId);
  const installations = getInstallationsBySite(siteId);

  const initialLayout = getSiteLayout(siteId);
  const [sections, setSections] = useState<SectionInstance[]>(initialLayout);
  const [selectedInstanceId, setSelectedInstanceId] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  if (!site) {
    return <p className="text-muted-foreground">Site not found.</p>;
  }

  const libraryComponents = installations.flatMap((inst) => {
    const lib = getLibraryById(inst.library_id);
    if (!lib) return [];
    return getComponentsByLibrary(lib.id).map((comp) => ({
      ...comp,
      libraryName: lib.name,
    }));
  });

  const selectedSection = sections.find((s) => s.instanceId === selectedInstanceId) || null;
  const selectedComponent = selectedSection ? getComponentById(selectedSection.componentId) : null;

  function handleSelectSection(instanceId: string) {
    setSelectedInstanceId(instanceId);
  }

  function handlePropChange(key: string, value: string | boolean) {
    if (!selectedInstanceId) return;
    setSections((prev) =>
      prev.map((s) =>
        s.instanceId === selectedInstanceId
          ? { ...s, propOverrides: { ...s.propOverrides, [key]: value } }
          : s
      )
    );
  }

  function handleUnlink(instanceId: string) {
    toast.success("Section unlinked", {
      description: "This section is now a local component and won't receive library updates.",
    });
    setSections((prev) => prev.filter((s) => s.instanceId !== instanceId));
    if (selectedInstanceId === instanceId) setSelectedInstanceId(null);
  }

  function handleSelectFromSidebar(comp: DesignComponent & { libraryName: string }) {
    const firstMatch = sections.find((s) => s.componentId === comp.id);
    if (firstMatch) {
      setSelectedInstanceId(firstMatch.instanceId);
      sectionRefs.current[firstMatch.instanceId]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/sites" className="hover:text-foreground">
          Sites
        </Link>
        <span>/</span>
        <span className="text-foreground">{site.name}</span>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{site.name}</h1>
          <p className="text-muted-foreground">
            Click any section on the page to edit its props.
          </p>
        </div>
        <Badge variant="secondary" className="gap-1.5">
          <Library className="size-3" />
          {sections.length} sections
        </Badge>
      </div>

      <ResizablePanelGroup orientation="horizontal" className="min-h-0 flex-1 rounded-lg border">
        <ResizablePanel defaultSize={20} minSize={16}>
          <div className="flex h-full flex-col overflow-hidden">
            <div className="shrink-0 border-b p-3">
              <h3 className="text-sm font-semibold">Sections</h3>
              <p className="text-xs text-muted-foreground">
                Page structure
              </p>
            </div>
            <ScrollArea className="min-h-0 flex-1">
              <div className="space-y-0.5 p-2">
                {sections.map((section, index) => {
                  const comp = getComponentById(section.componentId);
                  if (!comp) return null;
                  const lib = getLibraryById(comp.library_id);
                  const isSelected = section.instanceId === selectedInstanceId;
                  return (
                    <button
                      key={section.instanceId}
                      className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors hover:bg-accent ${isSelected ? "bg-accent ring-1 ring-primary/30" : ""}`}
                      onClick={() => {
                        handleSelectSection(section.instanceId);
                        sectionRefs.current[section.instanceId]?.scrollIntoView({
                          behavior: "smooth",
                          block: "center",
                        });
                      }}
                    >
                      <span className="flex size-5 shrink-0 items-center justify-center rounded bg-muted text-[10px] font-medium text-muted-foreground">
                        {index + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-medium">{comp.name}</p>
                        <p className="truncate text-[10px] text-muted-foreground">
                          {lib?.name}
                        </p>
                      </div>
                      <Lock className="size-3 shrink-0 text-muted-foreground" />
                    </button>
                  );
                })}
              </div>
              <Separator className="my-2" />
              <div className="p-2">
                <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  Available Components
                </p>
                <div className="space-y-0.5">
                  {libraryComponents.map((comp) => (
                    <button
                      key={comp.id}
                      className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs transition-colors hover:bg-accent"
                      onClick={() => handleSelectFromSidebar(comp)}
                    >
                      <GripVertical className="size-3 text-muted-foreground" />
                      <span className="truncate">{comp.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </ScrollArea>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={55} minSize={35}>
          <div className="flex h-full flex-col overflow-hidden">
            <div className="flex shrink-0 items-center justify-between border-b px-3 py-2">
              <h3 className="text-sm font-semibold">Page Preview</h3>
              <span className="text-xs text-muted-foreground">{site.name}</span>
            </div>
            <ScrollArea className="min-h-0 flex-1">
              <div className="bg-white">
                {sections.map((section) => {
                  const comp = getComponentById(section.componentId);
                  if (!comp) return null;
                  const isSelected = section.instanceId === selectedInstanceId;
                  return (
                    <div
                      key={section.instanceId}
                      ref={(el) => { sectionRefs.current[section.instanceId] = el; }}
                      className={`group relative cursor-pointer transition-shadow ${isSelected ? "ring-2 ring-primary ring-inset z-10" : "hover:ring-1 hover:ring-primary/30 hover:ring-inset"}`}
                      onClick={() => handleSelectSection(section.instanceId)}
                    >
                      {isSelected && (
                        <div className="absolute top-0 left-0 z-20 flex items-center gap-1 rounded-br-md bg-primary px-2 py-0.5">
                          <span className="text-[10px] font-medium text-primary-foreground">
                            {comp.name}
                          </span>
                        </div>
                      )}
                      {!isSelected && (
                        <div className="absolute top-0 left-0 z-20 flex items-center gap-1 rounded-br-md bg-muted/90 px-2 py-0.5 opacity-0 transition-opacity group-hover:opacity-100">
                          <MousePointerClick className="size-3 text-muted-foreground" />
                          <span className="text-[10px] text-muted-foreground">
                            {comp.name}
                          </span>
                        </div>
                      )}
                      <ComponentPreview
                        component={comp}
                        scale="md"
                        propOverrides={section.propOverrides}
                        seamless
                      />
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={25} minSize={18}>
          <div className="flex h-full flex-col overflow-hidden">
            <div className="shrink-0 border-b p-3">
              <h3 className="text-sm font-semibold">Properties</h3>
            </div>
            {selectedSection && selectedComponent ? (
              <ScrollArea className="min-h-0 flex-1">
                <div className="space-y-4 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Badge variant="outline">{selectedComponent.name}</Badge>
                      <p className="mt-1 text-[10px] text-muted-foreground">
                        {getLibraryById(selectedComponent.library_id)?.name}
                      </p>
                    </div>
                    <RoleGate action="UNLINK_DETACH">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs text-muted-foreground"
                        onClick={() => handleUnlink(selectedSection.instanceId)}
                      >
                        <Unlink className="mr-1 size-3" />
                        Unlink
                      </Button>
                    </RoleGate>
                  </div>
                  <Separator />
                  {Object.entries(selectedComponent.props_schema).map(
                    ([key, schema]) => (
                      <div key={key} className="space-y-1.5">
                        <Label className="flex items-center gap-1.5 text-xs">
                          {schema.type === "text" && <Type className="size-3" />}
                          {schema.type === "image" && <Image className="size-3" />}
                          {schema.type === "boolean" && <ToggleLeft className="size-3" />}
                          {schema.label || key}
                        </Label>
                        {schema.type === "text" && (
                          <Input
                            className="h-8 text-sm"
                            value={String(
                              selectedSection.propOverrides[key] ?? schema.default
                            )}
                            onChange={(e) => handlePropChange(key, e.target.value)}
                          />
                        )}
                        {schema.type === "boolean" && (
                          <Switch
                            checked={
                              (selectedSection.propOverrides[key] ?? schema.default) as boolean
                            }
                            onCheckedChange={(v) => handlePropChange(key, v)}
                          />
                        )}
                        {schema.type === "image" && (
                          <div className="flex h-16 items-center justify-center rounded border-2 border-dashed bg-muted/30 text-xs text-muted-foreground">
                            Click to upload
                          </div>
                        )}
                      </div>
                    )
                  )}
                </div>
              </ScrollArea>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center gap-2 p-4">
                <MousePointerClick className="size-8 text-muted-foreground/50" />
                <p className="text-center text-xs text-muted-foreground">
                  Click a section on the page to edit its properties.
                </p>
              </div>
            )}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
