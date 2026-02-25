"use client";

import { use, useState, useRef } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  ArrowLeft,
  Lock,
  Unlink,
  Pencil,
  Type,
  Image,
  ToggleLeft,
  Hash,
  Link2,
  FileText,
  Play,
  MousePointerClick,
  Layers,
  Monitor,
  Tablet,
  Smartphone,
  Undo2,
  Redo2,
  Plus,
  Palette,
  LayoutGrid,
  Code,
  Search,
  Zap,
  MessageSquare,
  CircleHelp,
  Component,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ComponentPreview } from "@/components/component-builder/component-preview";
import { StyleEditor } from "@/components/consumer/style-editor";
import { RoleGate } from "@/components/shared/role-gate";
import {
  getSiteById,
  getLibraryById,
  getComponentById,
  getSiteLayout,
} from "@/lib/mock-data";
import type { SectionInstance } from "@/lib/mock-data";

const SIDEBAR_TOOLS = [Layers, LayoutGrid, Type, Palette, Image, Search, Zap, Code];
const SIDEBAR_BOTTOM = [MessageSquare, CircleHelp];

export default function ConsumerEditorPage({
  params,
}: {
  params: Promise<{ siteId: string }>;
}) {
  const { siteId } = use(params);
  const site = getSiteById(siteId);
  const initialLayout = getSiteLayout(siteId);
  const [sections, setSections] = useState<SectionInstance[]>(initialLayout);
  const [selectedInstanceId, setSelectedInstanceId] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  if (!site) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="space-y-4 text-center">
          <p className="text-muted-foreground">Site not found.</p>
          <Button variant="outline" asChild>
            <Link href="/sites">
              <ArrowLeft className="mr-2 size-4" />
              Back to Sites
            </Link>
          </Button>
        </div>
      </div>
    );
  }

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
    setSections((prev) =>
      prev.map((s) =>
        s.instanceId === instanceId ? { ...s, isLinked: false } : s
      )
    );
    toast.success("Section unlinked", {
      description: "This section is now a local component and won't receive library updates.",
    });
  }

  function handlePublish() {
    toast.success("Published", { description: `${site.name} is now live.` });
  }

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <header className="flex h-11 shrink-0 items-center justify-between bg-[#1b1b21] px-2.5">
        <div className="flex items-center gap-2.5">
          <Button
            variant="ghost"
            size="icon"
            className="size-7 text-white/60 hover:bg-white/10 hover:text-white"
            asChild
          >
            <Link href="/sites">
              <ArrowLeft className="size-3.5" />
            </Link>
          </Button>
          <div className="h-4 w-px bg-white/10" />
          <span className="max-w-[180px] truncate text-xs font-medium text-white/80">
            {site.name}
          </span>
          <span className="text-[10px] text-white/30">•</span>
          <span className="text-[10px] text-white/30">Autosave off</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-md bg-white/5 p-0.5">
            {[Monitor, Tablet, Smartphone].map((Icon, i) => (
              <button
                key={i}
                className={`rounded-sm px-2 py-1 transition-colors ${i === 0 ? "bg-white/10 text-white/80" : "text-white/30 hover:text-white/50"}`}
              >
                <Icon className="size-3.5" />
              </button>
            ))}
          </div>
          <span className="text-[10px] text-white/20">—</span>
          <span className="text-[10px] text-white/40">1920px</span>
          <span className="text-[10px] text-white/20">•</span>
          <span className="text-[10px] text-white/40">100%</span>
        </div>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="size-7 text-white/40 hover:bg-white/10 hover:text-white/60">
            <Undo2 className="size-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="size-7 text-white/40 hover:bg-white/10 hover:text-white/60">
            <Redo2 className="size-3.5" />
          </Button>
          <div className="mx-1 h-4 w-px bg-white/10" />
          <Button
            size="sm"
            className="h-7 rounded-full bg-blue-600 px-4 text-[11px] font-medium text-white hover:bg-blue-500"
            onClick={handlePublish}
          >
            Publish
          </Button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        <div className="flex w-11 shrink-0 flex-col items-center bg-[#1b1b21] pb-3 pt-2.5">
          <button className="mb-3 flex size-7 items-center justify-center rounded-lg bg-blue-600 text-white transition-colors hover:bg-blue-500">
            <Plus className="size-4" />
          </button>
          <div className="flex flex-col items-center gap-0.5">
            {SIDEBAR_TOOLS.map((Icon, i) => (
              <button
                key={i}
                className={`flex size-8 items-center justify-center rounded-md transition-colors ${
                  i === 0
                    ? "bg-white/10 text-white/80"
                    : "text-white/30 hover:bg-white/5 hover:text-white/60"
                }`}
              >
                <Icon className="size-[18px]" />
              </button>
            ))}
          </div>
          <div className="mt-auto flex flex-col items-center gap-0.5">
            {SIDEBAR_BOTTOM.map((Icon, i) => (
              <button
                key={i}
                className="flex size-8 items-center justify-center rounded-md text-white/30 transition-colors hover:bg-white/5 hover:text-white/60"
              >
                <Icon className="size-[18px]" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex w-[240px] shrink-0 flex-col overflow-hidden border-r bg-background">
          <div className="flex shrink-0 items-center justify-between bg-accent/30 px-3 py-2">
            <span className="flex items-center gap-1.5 text-xs font-semibold">
              <Layers className="size-3.5" />
              Sections
            </span>
            <span className="text-[10px] text-muted-foreground">{sections.length}</span>
          </div>
          <ScrollArea className="min-h-0 flex-1">
            {sections.map((section, index) => {
              const comp = getComponentById(section.componentId);
              if (!comp) return null;
              const lib = getLibraryById(comp.library_id);
              const isSelected = section.instanceId === selectedInstanceId;
              return (
                <button
                  key={section.instanceId}
                  className={`group flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs transition-colors hover:bg-accent ${isSelected ? "bg-primary/10 font-medium text-primary" : ""}`}
                  onClick={() => {
                    handleSelectSection(section.instanceId);
                    sectionRefs.current[section.instanceId]?.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    });
                  }}
                >
                  <span className={`flex size-5 shrink-0 items-center justify-center rounded text-[10px] font-medium ${isSelected ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>
                    {index + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs">{comp.name}</p>
                    <p className="truncate text-[10px] text-muted-foreground">
                      {lib?.name}
                    </p>
                  </div>
                  {section.isLinked ? (
                    <Lock className={`size-3 shrink-0 ${isSelected ? "text-primary/50" : "text-muted-foreground"}`} />
                  ) : (
                    <Pencil className="size-3 shrink-0 text-primary" />
                  )}
                </button>
              );
            })}
          </ScrollArea>
        </div>

        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <ScrollArea className="h-full">
            <div className="min-h-full bg-[#f0f0f0] p-6">
              <div className="mx-auto w-full max-w-5xl overflow-hidden bg-white shadow-sm">
                {sections.map((section) => {
                  const comp = getComponentById(section.componentId);
                  if (!comp) return null;
                  const isSelected = section.instanceId === selectedInstanceId;
                  const isLocal = !section.isLinked;
                  const hoverRingColor = isLocal ? "hover:ring-primary/30" : "hover:ring-emerald-500/30";
                  const labelBg = isLocal ? "bg-primary" : "bg-emerald-600";
                  return (
                    <div
                      key={section.instanceId}
                      ref={(el) => { sectionRefs.current[section.instanceId] = el; }}
                      className={`group relative cursor-pointer transition-shadow ${isSelected ? "z-10" : `hover:ring-1 ${hoverRingColor} hover:ring-inset`}`}
                      onClick={() => handleSelectSection(section.instanceId)}
                    >
                      {isSelected && (
                        <>
                          <div className={`pointer-events-none absolute inset-0 z-10 border-2 ${isLocal ? "border-primary bg-primary/5" : "border-emerald-500 bg-emerald-500/5"}`} />
                          <div className={`absolute top-0 left-0 z-20 flex items-center gap-1 rounded-br-md ${labelBg} px-2 py-0.5`}>
                            {isLocal ? <Pencil className="size-2.5 text-white" /> : <Component className="size-2.5 text-white" />}
                            <span className="text-[10px] font-medium text-white">
                              {comp.name}{isLocal ? " (Local)" : ""}
                            </span>
                          </div>
                        </>
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
            </div>
          </ScrollArea>
        </div>

        <div className="flex w-[280px] shrink-0 flex-col overflow-hidden border-l bg-background">
          <div className="flex shrink-0 items-center justify-between border-b px-3 pt-2.5 pb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold">
                {selectedComponent ? selectedComponent.name : "Properties"}
              </span>
              {selectedSection?.isLinked && selectedComponent && (
                <Badge variant="outline" className="h-4 px-1.5 text-[9px]">Component</Badge>
              )}
              {selectedSection && !selectedSection.isLinked && (
                <Badge variant="secondary" className="gap-1 bg-primary/10 text-[10px] text-primary hover:bg-primary/10">
                  <Pencil className="size-2.5" />
                  Local
                </Badge>
              )}
            </div>
            {selectedSection?.isLinked && (
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
            )}
          </div>

          {selectedSection && selectedComponent ? (
            <ScrollArea className="min-h-0 flex-1">
              {selectedSection.isLinked ? (
                <div className="space-y-4 p-4">
                  <div>
                    <span className="text-xs font-semibold">Properties</span>
                    <p className="text-[10px] text-muted-foreground">Customize content overrides for this component.</p>
                  </div>
                  {Object.entries(selectedComponent.props_schema).map(
                    ([key, schema]) => (
                      <div key={key} className="space-y-1.5">
                        <Label className="flex items-center gap-1.5 text-xs">
                          {schema.type === "text" && <Type className="size-3" />}
                          {schema.type === "rich_text" && <FileText className="size-3" />}
                          {schema.type === "image" && <Image className="size-3" />}
                          {schema.type === "link" && <Link2 className="size-3" />}
                          {schema.type === "video" && <Play className="size-3" />}
                          {schema.type === "number" && <Hash className="size-3" />}
                          {(schema.type === "boolean" || schema.type === "switch") && <ToggleLeft className="size-3" />}
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
                        {schema.type === "rich_text" && (
                          <Textarea
                            className="min-h-20 text-sm"
                            value={String(
                              selectedSection.propOverrides[key] ?? schema.default
                            )}
                            onChange={(e) => handlePropChange(key, e.target.value)}
                          />
                        )}
                        {(schema.type === "link" || schema.type === "video") && (
                          <Input
                            className="h-8 text-sm"
                            placeholder={schema.type === "link" ? "https://..." : "Video URL"}
                            value={String(
                              selectedSection.propOverrides[key] ?? schema.default
                            )}
                            onChange={(e) => handlePropChange(key, e.target.value)}
                          />
                        )}
                        {schema.type === "number" && (
                          <Input
                            className="h-8 text-sm"
                            type="number"
                            value={String(
                              selectedSection.propOverrides[key] ?? schema.default
                            )}
                            onChange={(e) => handlePropChange(key, e.target.value)}
                          />
                        )}
                        {(schema.type === "boolean" || schema.type === "switch") && (
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
              ) : (
                <StyleEditor />
              )}
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
      </div>
    </div>
  );
}
