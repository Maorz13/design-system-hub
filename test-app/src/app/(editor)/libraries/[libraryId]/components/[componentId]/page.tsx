"use client";

import { use, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  ArrowLeft,
  Type,
  Image,
  ToggleLeft,
  Plus,
  Hash,
  Link2,
  FileText,
  Play,
  AlignLeft,
  MousePointerClick,
  Tag,
  Square,
  Settings2,
  Pen,
  Zap,
  Layers,
  Monitor,
  Tablet,
  Smartphone,
  Undo2,
  Redo2,
  Palette,
  LayoutGrid,
  Code,
  Search,
  CircleHelp,
  MessageSquare,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ComponentPreview } from "@/components/component-builder/component-preview";
import { StyleEditor } from "@/components/consumer/style-editor";
import {
  getLibraryById,
  getComponentById,
  getComponentElements,
  type ComponentElement,
  type ElementType,
} from "@/lib/mock-data";

type PropType = "text" | "rich_text" | "image" | "link" | "video" | "number" | "switch";

interface PropDef {
  type: PropType;
  default: string | boolean | number;
  label: string;
  group: string;
  tooltip: string;
  multiline?: boolean;
}

interface ElementBinding {
  content: string | null;
  visibility: string | null;
}

const PROP_TYPES: { type: PropType; label: string; icon: typeof Type }[] = [
  { type: "text", label: "Text", icon: Type },
  { type: "rich_text", label: "Rich Text", icon: FileText },
  { type: "image", label: "Image", icon: Image },
  { type: "link", label: "Link", icon: Link2 },
  { type: "video", label: "Video", icon: Play },
  { type: "number", label: "Number", icon: Hash },
  { type: "switch", label: "Switch", icon: ToggleLeft },
];

const TYPE_ICONS: Record<string, typeof Type> = Object.fromEntries(
  PROP_TYPES.map((t) => [t.type, t.icon])
);

const TYPE_DEFAULTS: Record<PropType, string | boolean | number> = {
  text: "",
  rich_text: "",
  image: "",
  link: "",
  video: "",
  number: 0,
  switch: false,
};

const ELEMENT_TYPE_ICONS: Record<ElementType, typeof Type> = {
  heading: Type,
  text: AlignLeft,
  button: MousePointerClick,
  image: Image,
  container: Square,
  link: Link2,
  badge: Tag,
};

const CONTENT_COMPAT: Record<ElementType, PropType[]> = {
  heading: ["text", "rich_text", "number"],
  text: ["text", "rich_text"],
  button: ["text"],
  badge: ["text"],
  image: ["image"],
  link: ["link", "text"],
  container: [],
};

const SIDEBAR_TOOLS = [Layers, LayoutGrid, Type, Palette, Image, Search, Zap, Code];
const SIDEBAR_BOTTOM = [MessageSquare, CircleHelp];

const RIGHT_TABS: { value: string; label: string; icon: typeof Pen }[] = [
  { value: "style", label: "Design", icon: Pen },
  { value: "settings", label: "Settings", icon: Settings2 },
  { value: "interactions", label: "Animation", icon: Zap },
];

function mapLegacyType(t: string): PropType {
  if (t === "boolean") return "switch";
  if (PROP_TYPES.some((p) => p.type === t)) return t as PropType;
  return "text";
}

let propCounter = 0;
function nextKey(type: PropType) {
  propCounter++;
  const typeLabel = PROP_TYPES.find((t) => t.type === type)?.label || "Prop";
  return { key: `${type}_${propCounter}`, label: `${typeLabel} ${propCounter}` };
}

function getContentSectionName(elType: ElementType): string {
  const map: Record<string, string> = {
    heading: "Text Block", text: "Text Block", badge: "Text Block",
    button: "Button", image: "Image", link: "Link", container: "Container",
  };
  return map[elType] || "Element";
}

function getContentFieldLabel(elType: ElementType): string {
  if (elType === "image") return "Source";
  if (elType === "link") return "URL";
  return "Text";
}

export default function ComponentEditorPage({
  params,
}: {
  params: Promise<{ libraryId: string; componentId: string }>;
}) {
  const { libraryId, componentId } = use(params);
  const library = getLibraryById(libraryId);
  const component = getComponentById(componentId);
  const elements = component ? getComponentElements(component.id) : [];

  const [propsSchema, setPropsSchema] = useState<Record<string, PropDef>>(() => {
    if (!component) return {};
    const schema: Record<string, PropDef> = {};
    Object.entries(component.props_schema).forEach(([key, s]) => {
      schema[key] = {
        type: mapLegacyType(s.type), default: s.default,
        label: s.label || key, group: "", tooltip: "", multiline: false,
      };
    });
    propCounter = Object.keys(schema).length;
    return schema;
  });

  const [propValues, setPropValues] = useState<Record<string, string | boolean | number>>(() => {
    if (!component) return {};
    const initial: Record<string, string | boolean | number> = {};
    Object.entries(component.props_schema).forEach(([key, schema]) => {
      initial[key] = schema.default;
    });
    return initial;
  });

  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [addPopoverOpen, setAddPopoverOpen] = useState(false);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [rightTab, setRightTab] = useState("style");

  const [elementBindings, setElementBindings] = useState<Record<string, ElementBinding>>(() => {
    const initial: Record<string, ElementBinding> = {};
    elements.forEach((el) => {
      initial[el.id] = { content: el.contentBinding, visibility: el.visibilityBinding };
    });
    return initial;
  });

  if (!library || !component) {
    return (
      <div className="space-y-4">
        <p className="text-muted-foreground">Component not found.</p>
        <Button variant="outline" asChild>
          <Link href={`/libraries/${libraryId}`}>
            <ArrowLeft className="mr-2 size-4" />
            Back to Library
          </Link>
        </Button>
      </div>
    );
  }

  const selectedElement = selectedElementId
    ? elements.find((el) => el.id === selectedElementId) || null
    : null;
  const selectedBinding = selectedElementId
    ? elementBindings[selectedElementId] || { content: null, visibility: null }
    : null;

  const schemaEntries = Object.entries(propsSchema);
  const switchProps = schemaEntries.filter(([, def]) => def.type === "switch");
  const compatibleContentProps = selectedElement
    ? schemaEntries.filter(([, def]) => CONTENT_COMPAT[selectedElement.type]?.includes(def.type))
    : [];

  function handleElementSelect(elementId: string) {
    setSelectedElementId(elementId);
    setRightTab("settings");
  }

  function handlePropChange(key: string, value: string | boolean | number) {
    setPropValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleAddProp(type: PropType) {
    const { key, label } = nextKey(type);
    setPropsSchema((prev) => ({
      ...prev,
      [key]: { type, default: TYPE_DEFAULTS[type], label, group: "", tooltip: "", multiline: false },
    }));
    setPropValues((prev) => ({ ...prev, [key]: TYPE_DEFAULTS[type] }));
    setSelectedKey(key);
    setAddPopoverOpen(false);
  }

  function handleRemoveProp(key: string) {
    const removed = propsSchema[key];
    const removedValue = propValues[key];
    if (selectedKey === key) setSelectedKey(null);
    setPropsSchema((prev) => { const n = { ...prev }; delete n[key]; return n; });
    setPropValues((prev) => { const n = { ...prev }; delete n[key]; return n; });
    toast.success(`"${removed.label}" removed`, {
      action: {
        label: "Undo",
        onClick: () => {
          setPropsSchema((prev) => ({ ...prev, [key]: removed }));
          setPropValues((prev) => ({ ...prev, [key]: removedValue }));
        },
      },
    });
  }

  function updatePropDef(key: string, updates: Partial<PropDef>) {
    setPropsSchema((prev) => ({ ...prev, [key]: { ...prev[key], ...updates } }));
  }

  function updateElementBinding(elementId: string, field: "content" | "visibility", propKey: string | null) {
    setElementBindings((prev) => ({
      ...prev,
      [elementId]: { ...prev[elementId], [field]: propKey },
    }));
    const el = elements.find((e) => e.id === elementId);
    toast.success(`${el?.label}: ${field} → ${propKey ? propsSchema[propKey]?.label || propKey : "None"}`);
  }

  function handleSave() {
    toast.success("Published", { description: `${component!.name} v${library!.version + 1} is now live.` });
  }

  function handleReset() {
    const schema: Record<string, PropDef> = {};
    const values: Record<string, string | boolean | number> = {};
    Object.entries(component!.props_schema).forEach(([key, s]) => {
      schema[key] = {
        type: mapLegacyType(s.type), default: s.default,
        label: s.label || key, group: "", tooltip: "", multiline: false,
      };
      values[key] = s.default;
    });
    setPropsSchema(schema);
    setPropValues(values);
    setSelectedKey(null);
    setSelectedElementId(null);
    toast.info("Reset to defaults");
  }

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* ═══════ DARK EDITOR HEADER ═══════ */}
      <header className="flex h-11 shrink-0 items-center justify-between bg-[#1b1b21] px-2.5">
        <div className="flex items-center gap-2.5">
          <Button
            variant="ghost"
            size="icon"
            className="size-7 text-white/60 hover:bg-white/10 hover:text-white"
            asChild
          >
            <Link href={`/libraries/${libraryId}`}>
              <ArrowLeft className="size-3.5" />
            </Link>
          </Button>
          <div className="h-4 w-px bg-white/10" />
          <span className="max-w-[140px] truncate text-xs font-medium text-white/80">
            {component.name}
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
            variant="ghost"
            size="sm"
            className="h-7 text-[11px] text-white/40 hover:bg-white/10 hover:text-white/60"
            onClick={handleReset}
          >
            Reset
          </Button>
          <Button
            size="sm"
            className="h-7 rounded-full bg-blue-600 px-4 text-[11px] font-medium text-white hover:bg-blue-500"
            onClick={handleSave}
          >
            Publish
          </Button>
        </div>
      </header>

      {/* ═══════ MAIN EDITOR BODY ═══════ */}
      <div className="flex min-h-0 flex-1">
        {/* ── LEFT: Icons sidebar ── */}
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

        {/* ── LEFT PANEL: Elements + Properties ── */}
        <div className="flex w-[240px] shrink-0 flex-col overflow-hidden border-r bg-background">
          <div className="flex shrink-0 items-center justify-between bg-accent/30 px-3 py-2">
            <span className="flex items-center gap-1.5 text-xs font-semibold">
              <Layers className="size-3.5" />
              Layers
            </span>
            <span className="text-[10px] text-muted-foreground">{elements.length}</span>
          </div>
          <ScrollArea className="max-h-48 shrink-0 border-b">
            {elements.map((el) => {
              const ElIcon = ELEMENT_TYPE_ICONS[el.type] || Square;
              const isSelected = selectedElementId === el.id;
              const binding = elementBindings[el.id];
              const hasBind = binding?.content || binding?.visibility;
              return (
                <button
                  key={el.id}
                  className={`group flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs transition-colors hover:bg-accent ${isSelected ? "bg-primary/10 font-medium text-primary" : ""}`}
                  onClick={() =>
                    selectedElementId === el.id
                      ? setSelectedElementId(null)
                      : handleElementSelect(el.id)
                  }
                >
                  <ElIcon className={`size-3.5 shrink-0 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                  <span className="min-w-0 flex-1 truncate">{el.label}</span>
                  {hasBind && <span className="size-1.5 shrink-0 rounded-full bg-emerald-500" />}
                </button>
              );
            })}
          </ScrollArea>

          <div className="flex shrink-0 items-center justify-between border-b px-3 py-2">
            <span className="text-xs font-semibold">Properties</span>
            <Popover open={addPopoverOpen} onOpenChange={setAddPopoverOpen}>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="size-6">
                  <Plus className="size-3.5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-44 p-1">
                {PROP_TYPES.map((pt) => (
                  <button
                    key={pt.type}
                    className="flex w-full items-center gap-2.5 rounded-sm px-2.5 py-1.5 text-xs transition-colors hover:bg-accent"
                    onClick={() => handleAddProp(pt.type)}
                  >
                    <pt.icon className="size-3.5 text-muted-foreground" />
                    {pt.label}
                  </button>
                ))}
              </PopoverContent>
            </Popover>
          </div>
          <ScrollArea className="min-h-0 flex-1 border-t">
            {schemaEntries.length === 0 ? (
              <div className="flex flex-col items-center gap-1.5 py-4 text-center">
                <Type className="size-4 text-muted-foreground/30" />
                <p className="text-[10px] text-muted-foreground">No properties yet.</p>
              </div>
            ) : (
              schemaEntries.map(([key, schema]) => {
                const Icon = TYPE_ICONS[schema.type] || Type;
                const isSelected = selectedKey === key;
                return (
                  <div key={key}>
                    <button
                      className={`flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs transition-colors hover:bg-accent ${isSelected ? "bg-accent font-medium" : ""}`}
                      onClick={() => setSelectedKey(isSelected ? null : key)}
                    >
                      <Icon className={`size-3.5 shrink-0 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                      <span className="min-w-0 flex-1 truncate">{schema.label}</span>
                      <span className={`text-[10px] text-muted-foreground transition-transform ${isSelected ? "rotate-90" : ""}`}>›</span>
                    </button>
                    {isSelected && (
                      <InlinePropertySettings
                        propKey={key}
                        prop={schema}
                        value={propValues[key]}
                        onUpdate={(updates) => updatePropDef(key, updates)}
                        onValueChange={(v) => handlePropChange(key, v)}
                        onDelete={() => handleRemoveProp(key)}
                      />
                    )}
                  </div>
                );
              })
            )}
          </ScrollArea>
        </div>

        {/* ── CENTER: Canvas ── */}
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <ScrollArea className="h-full">
            <div
              className="flex min-h-full items-start justify-center bg-[#f0f0f0] p-6"
              onClick={() => setSelectedElementId(null)}
            >
              <div className="w-full max-w-4xl overflow-hidden bg-white shadow-sm">
                <ComponentPreview
                  component={component}
                  scale="md"
                  propOverrides={propValues as Record<string, string | boolean>}
                  seamless
                  selectedElementId={selectedElementId}
                  onElementSelect={handleElementSelect}
                  elementBindings={elementBindings}
                />
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* ── RIGHT PANEL: Style / Settings / Interactions ── */}
        <div className="flex w-[280px] shrink-0 flex-col overflow-hidden border-l bg-background">
          <div className="shrink-0 border-b px-3 pt-2.5 pb-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold">
                {selectedElement ? selectedElement.label : "Section"}
              </span>
              {selectedElement && (
                <Badge variant="outline" className="text-[10px]">
                  {selectedElement.type}
                </Badge>
              )}
            </div>
            <div className="mt-2 flex items-center">
              {RIGHT_TABS.map((tab) => (
                <button
                  key={tab.value}
                  className={`relative flex h-8 flex-1 items-center justify-center transition-colors ${
                    rightTab === tab.value
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setRightTab(tab.value)}
                >
                  <tab.icon className="size-3.5" />
                  <span className="ml-1.5 text-[11px]">{tab.label}</span>
                  {rightTab === tab.value && (
                    <span className="absolute inset-x-0 bottom-0 h-[2px] bg-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <ScrollArea className="min-h-0 flex-1">
            {rightTab === "style" && <StyleEditor />}

            {rightTab === "settings" &&
              (selectedElement && selectedBinding ? (
                <ElementSettingsPanel
                  element={selectedElement}
                  binding={selectedBinding}
                  propsSchema={propsSchema}
                  switchProps={switchProps}
                  compatibleContentProps={compatibleContentProps}
                  onUpdateBinding={(field, propKey) =>
                    updateElementBinding(selectedElement.id, field, propKey)
                  }
                />
              ) : (
                <div className="flex flex-col items-center gap-2 p-8 text-center">
                  <Layers className="size-6 text-muted-foreground/30" />
                  <p className="text-xs text-muted-foreground">
                    Select an element to configure its property bindings.
                  </p>
                </div>
              ))}

            {rightTab === "interactions" && (
              <div className="flex flex-col items-center justify-center gap-2 p-8 text-center">
                <Zap className="size-6 text-muted-foreground/30" />
                <p className="text-xs text-muted-foreground">No interactions configured.</p>
                <Button variant="outline" size="sm" className="mt-1 h-7 text-xs">
                  <Plus className="mr-1 size-3" />
                  Add Interaction
                </Button>
              </div>
            )}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Element Settings Panel
   ═══════════════════════════════════════════════ */

function ElementSettingsPanel({
  element,
  binding,
  propsSchema,
  switchProps,
  compatibleContentProps,
  onUpdateBinding,
}: {
  element: ComponentElement;
  binding: ElementBinding;
  propsSchema: Record<string, PropDef>;
  switchProps: [string, PropDef][];
  compatibleContentProps: [string, PropDef][];
  onUpdateBinding: (field: "content" | "visibility", propKey: string | null) => void;
}) {
  const contentSectionName = getContentSectionName(element.type);
  const contentFieldLabel = getContentFieldLabel(element.type);
  const hasContentSlot = CONTENT_COMPAT[element.type]?.length > 0;

  return (
    <div className="text-xs">
      <div className="space-y-1.5 border-b px-3 py-3">
        <Label className="text-[10px] text-muted-foreground">ID</Label>
        <Input className="h-7 text-xs" placeholder="For in-page linking" />
      </div>

      <div className="space-y-1.5 border-b px-3 py-3">
        <Label className="text-[10px] text-muted-foreground">Visibility</Label>
        <Select
          value={binding.visibility || "__none__"}
          onValueChange={(v) => onUpdateBinding("visibility", v === "__none__" ? null : v)}
        >
          <SelectTrigger className={`h-8 text-xs ${binding.visibility ? "border-emerald-200 bg-emerald-50" : ""}`}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="__none__">None</SelectItem>
            {switchProps.map(([key, def]) => (
              <SelectItem key={key} value={key}>
                <span className="flex items-center gap-1.5">
                  <ToggleLeft className="size-3 text-emerald-600" />
                  {def.label}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {hasContentSlot && (
        <div className="space-y-2.5 border-b px-3 py-3">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            {contentSectionName} settings
          </p>
          <div className="flex items-center gap-2">
            <Label className="w-10 shrink-0 text-[10px] text-muted-foreground">{contentFieldLabel}</Label>
            <Select
              value={binding.content || "__none__"}
              onValueChange={(v) => onUpdateBinding("content", v === "__none__" ? null : v)}
            >
              <SelectTrigger className={`h-8 flex-1 text-xs ${binding.content ? "border-violet-200 bg-violet-50" : ""}`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__none__">None</SelectItem>
                {compatibleContentProps.map(([key, def]) => {
                  const Icon = TYPE_ICONS[def.type] || Type;
                  return (
                    <SelectItem key={key} value={key}>
                      <span className="flex items-center gap-1.5">
                        <Icon className="size-3 text-violet-600" />
                        {def.label}
                      </span>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

    </div>
  );
}

/* ═══════════════════════════════════════════════
   Inline Property Settings (accordion row)
   ═══════════════════════════════════════════════ */

function InlinePropertySettings({
  propKey, prop, value, onUpdate, onValueChange, onDelete,
}: {
  propKey: string;
  prop: PropDef;
  value: string | boolean | number;
  onUpdate: (updates: Partial<PropDef>) => void;
  onValueChange: (v: string | boolean | number) => void;
  onDelete: () => void;
}) {
  const typeLabel = PROP_TYPES.find((t) => t.type === prop.type)?.label || prop.type;

  return (
    <div className="border-b bg-accent/30 text-xs">
      <div className="px-3 py-2">
        <span className="text-xs font-semibold">Property settings</span>
      </div>

      <div className="border-t px-3 py-2.5">
        <div className="flex items-center gap-2">
          <Label className="w-12 shrink-0 text-[10px] text-muted-foreground">Name</Label>
          <Input className="h-7 flex-1 text-xs" value={prop.label} onChange={(e) => onUpdate({ label: e.target.value })} />
        </div>
      </div>

      <div className="space-y-2 border-t px-3 py-2.5">
        <p className="text-[10px] font-semibold">Default {typeLabel}</p>
        {(prop.type === "text" || prop.type === "rich_text") && (
          <div className="flex items-center gap-2">
            <Label className="w-12 shrink-0 text-[10px] text-muted-foreground">Text</Label>
            {prop.multiline ? (
              <Textarea className="min-h-16 flex-1 resize-none text-xs" value={String(value ?? prop.default)} onChange={(e) => { onValueChange(e.target.value); onUpdate({ default: e.target.value }); }} />
            ) : (
              <Input className="h-7 flex-1 text-xs" value={String(value ?? prop.default)} onChange={(e) => { onValueChange(e.target.value); onUpdate({ default: e.target.value }); }} />
            )}
          </div>
        )}
        {prop.type === "image" && (
          <div className="flex h-14 items-center justify-center rounded border-2 border-dashed bg-muted/30 text-[10px] text-muted-foreground">Upload default image</div>
        )}
        {prop.type === "link" && (
          <div className="flex items-center gap-2">
            <Label className="w-12 shrink-0 text-[10px] text-muted-foreground">URL</Label>
            <Input className="h-7 flex-1 text-xs" placeholder="https://..." value={String(value ?? prop.default)} onChange={(e) => { onValueChange(e.target.value); onUpdate({ default: e.target.value }); }} />
          </div>
        )}
        {prop.type === "video" && (
          <div className="flex items-center gap-2">
            <Label className="w-12 shrink-0 text-[10px] text-muted-foreground">URL</Label>
            <Input className="h-7 flex-1 text-xs" placeholder="YouTube or Vimeo URL..." value={String(value ?? prop.default)} onChange={(e) => { onValueChange(e.target.value); onUpdate({ default: e.target.value }); }} />
          </div>
        )}
        {prop.type === "number" && (
          <div className="flex items-center gap-2">
            <Label className="w-12 shrink-0 text-[10px] text-muted-foreground">Value</Label>
            <Input className="h-7 flex-1 text-xs" type="number" value={String(value ?? prop.default)} onChange={(e) => { const n = Number(e.target.value) || 0; onValueChange(n); onUpdate({ default: n }); }} />
          </div>
        )}
        {prop.type === "switch" && (
          <div className="flex items-center gap-2">
            <Label className="w-12 shrink-0 text-[10px] text-muted-foreground">State</Label>
            <Switch checked={Boolean(value ?? prop.default)} onCheckedChange={(v) => { onValueChange(v); onUpdate({ default: v }); }} />
          </div>
        )}
      </div>
    </div>
  );
}
