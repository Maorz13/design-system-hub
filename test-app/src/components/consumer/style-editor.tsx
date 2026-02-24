"use client";

import { useState } from "react";
import {
  AlignStartHorizontal,
  AlignCenterHorizontal,
  AlignEndHorizontal,
  AlignStartVertical,
  AlignCenterVertical,
  AlignEndVertical,
  StretchHorizontal,
  ChevronRight,
  ChevronDown,
  Plus,
  Grid2x2,
  Link2,
  MoveHorizontal,
  MoveVertical,
  Columns2,
  Rows2,
} from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";

export function StyleEditor() {
  const [alignment, setAlignment] = useState("start-h");
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [opacity, setOpacity] = useState(100);
  const [glassEffect, setGlassEffect] = useState(false);
  const [borderOpen, setBorderOpen] = useState(false);
  const [cornersOpen, setCornersOpen] = useState(false);
  const [shadowOpen, setShadowOpen] = useState(false);
  const [layoutOpen, setLayoutOpen] = useState(true);
  const [fillOpen, setFillOpen] = useState(true);
  const [layout, setLayout] = useState("1x2");
  const [columns, setColumns] = useState(1);
  const [rows, setRows] = useState(2);
  const [gapH, setGapH] = useState("0");
  const [gapV, setGapV] = useState("0");
  const [padH, setPadH] = useState("0");
  const [padV, setPadV] = useState("0");

  return (
    <div className="space-y-0">
          {/* Alignment */}
          <div className="border-b px-3 py-3">
            <ToggleGroup
              type="single"
              value={alignment}
              onValueChange={(v) => v && setAlignment(v)}
              variant="outline"
              size="sm"
              className="w-full"
            >
              <ToggleGroupItem value="start-h" className="flex-1 px-0">
                <AlignStartHorizontal className="size-3.5" />
              </ToggleGroupItem>
              <ToggleGroupItem value="center-h" className="flex-1 px-0">
                <AlignCenterHorizontal className="size-3.5" />
              </ToggleGroupItem>
              <ToggleGroupItem value="end-h" className="flex-1 px-0">
                <AlignEndHorizontal className="size-3.5" />
              </ToggleGroupItem>
              <ToggleGroupItem value="stretch" className="flex-1 px-0">
                <StretchHorizontal className="size-3.5" />
              </ToggleGroupItem>
              <ToggleGroupItem value="start-v" className="flex-1 px-0">
                <AlignStartVertical className="size-3.5" />
              </ToggleGroupItem>
              <ToggleGroupItem value="center-v" className="flex-1 px-0">
                <AlignCenterVertical className="size-3.5" />
              </ToggleGroupItem>
              <ToggleGroupItem value="end-v" className="flex-1 px-0">
                <AlignEndVertical className="size-3.5" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          {/* Fill color & opacity */}
          <Collapsible open={fillOpen} onOpenChange={setFillOpen}>
            <CollapsibleTrigger className="flex w-full items-center justify-between border-b px-3 py-2.5 text-xs font-medium hover:bg-accent">
              Fill color & opacity
              <ChevronDown className={`size-3.5 text-muted-foreground transition-transform ${fillOpen ? "" : "-rotate-90"}`} />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="space-y-3 border-b px-3 py-3">
                <p className="text-xs text-muted-foreground">Background</p>
                <div className="flex items-center gap-2">
                  <label className="relative size-7 shrink-0 cursor-pointer overflow-hidden rounded border">
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="absolute -inset-1 cursor-pointer"
                    />
                  </label>
                  <Slider
                    value={[opacity]}
                    onValueChange={([v]) => setOpacity(v)}
                    max={100}
                    step={1}
                    className="flex-1"
                  />
                  <div className="flex items-center gap-0.5">
                    <Input
                      className="h-7 w-12 px-1.5 text-center text-xs"
                      value={opacity}
                      onChange={(e) => setOpacity(Number(e.target.value) || 0)}
                    />
                    <span className="text-xs text-muted-foreground">%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs">Apply glass effect</span>
                  <Switch
                    checked={glassEffect}
                    onCheckedChange={setGlassEffect}
                    className="scale-90"
                  />
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Border */}
          <Collapsible open={borderOpen} onOpenChange={setBorderOpen}>
            <CollapsibleTrigger className="flex w-full items-center justify-between border-b px-3 py-2.5 text-xs font-medium hover:bg-accent">
              Border
              <ChevronRight className={`size-3.5 text-muted-foreground transition-transform ${borderOpen ? "rotate-90" : ""}`} />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="space-y-2 border-b px-3 py-3">
                <div className="flex items-center gap-2">
                  <span className="w-12 text-[10px] text-muted-foreground">Width</span>
                  <Input className="h-7 flex-1 text-xs" defaultValue="0" />
                  <span className="text-[10px] text-muted-foreground">px</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-12 text-[10px] text-muted-foreground">Color</span>
                  <label className="relative size-6 shrink-0 cursor-pointer overflow-hidden rounded border">
                    <input type="color" defaultValue="#E5E7EB" className="absolute -inset-1 cursor-pointer" />
                  </label>
                  <Input className="h-7 flex-1 text-xs" defaultValue="#E5E7EB" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-12 text-[10px] text-muted-foreground">Style</span>
                  <Select defaultValue="solid">
                    <SelectTrigger size="sm" className="h-7 flex-1 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="solid">Solid</SelectItem>
                      <SelectItem value="dashed">Dashed</SelectItem>
                      <SelectItem value="dotted">Dotted</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Corners */}
          <Collapsible open={cornersOpen} onOpenChange={setCornersOpen}>
            <CollapsibleTrigger className="flex w-full items-center justify-between border-b px-3 py-2.5 text-xs font-medium hover:bg-accent">
              Corners
              <ChevronRight className={`size-3.5 text-muted-foreground transition-transform ${cornersOpen ? "rotate-90" : ""}`} />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="grid grid-cols-2 gap-2 border-b px-3 py-3">
                {["TL", "TR", "BL", "BR"].map((corner) => (
                  <div key={corner} className="flex items-center gap-1.5">
                    <span className="text-[10px] text-muted-foreground">{corner}</span>
                    <Input className="h-7 flex-1 text-xs" defaultValue="0" />
                    <span className="text-[10px] text-muted-foreground">px</span>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Shadow */}
          <Collapsible open={shadowOpen} onOpenChange={setShadowOpen}>
            <CollapsibleTrigger className="flex w-full items-center justify-between border-b px-3 py-2.5 text-xs font-medium hover:bg-accent">
              Shadow
              <ChevronRight className={`size-3.5 text-muted-foreground transition-transform ${shadowOpen ? "rotate-90" : ""}`} />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="space-y-2 border-b px-3 py-3">
                <div className="flex items-center gap-2">
                  <span className="w-10 text-[10px] text-muted-foreground">X</span>
                  <Input className="h-7 flex-1 text-xs" defaultValue="0" />
                  <span className="text-[10px] text-muted-foreground">px</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-10 text-[10px] text-muted-foreground">Y</span>
                  <Input className="h-7 flex-1 text-xs" defaultValue="0" />
                  <span className="text-[10px] text-muted-foreground">px</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-10 text-[10px] text-muted-foreground">Blur</span>
                  <Input className="h-7 flex-1 text-xs" defaultValue="0" />
                  <span className="text-[10px] text-muted-foreground">px</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-10 text-[10px] text-muted-foreground">Color</span>
                  <label className="relative size-6 shrink-0 cursor-pointer overflow-hidden rounded border">
                    <input type="color" defaultValue="#000000" className="absolute -inset-1 cursor-pointer" />
                  </label>
                  <Input className="h-7 flex-1 text-xs" defaultValue="rgba(0,0,0,0.1)" />
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Layout */}
          <Collapsible open={layoutOpen} onOpenChange={setLayoutOpen}>
            <CollapsibleTrigger className="flex w-full items-center justify-between bg-accent/50 px-3 py-2.5 text-xs font-semibold hover:bg-accent">
              Layout
              <ChevronDown className={`size-3.5 text-muted-foreground transition-transform ${layoutOpen ? "" : "-rotate-90"}`} />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="space-y-3 px-3 py-3">
                <div className="space-y-1.5">
                  <p className="text-[10px] text-muted-foreground">Layout</p>
                  <Select value={layout} onValueChange={setLayout}>
                    <SelectTrigger size="sm" className="h-8 w-full text-xs">
                      <SelectValue>
                        <span className="flex items-center gap-2">
                          <Grid2x2 className="size-3.5" />
                          {layout}
                        </span>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1x1">1x1</SelectItem>
                      <SelectItem value="1x2">1x2</SelectItem>
                      <SelectItem value="2x1">2x1</SelectItem>
                      <SelectItem value="2x2">2x2</SelectItem>
                      <SelectItem value="3x1">3x1</SelectItem>
                      <SelectItem value="1x3">1x3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs">
                    <Columns2 className="size-3 text-muted-foreground" />
                    Columns ({columns})
                  </span>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="size-6 p-0"
                      onClick={() => setColumns((c) => c + 1)}
                    >
                      <Plus className="size-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="size-6 p-0">
                      <ChevronRight className="size-3" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs">
                    <Rows2 className="size-3 text-muted-foreground" />
                    Rows ({rows})
                  </span>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="size-6 p-0"
                      onClick={() => setRows((r) => r + 1)}
                    >
                      <Plus className="size-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="size-6 p-0">
                      <ChevronRight className="size-3" />
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs">Gaps</span>
                    <span className="text-[10px] text-primary">px</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-1.5 rounded border px-2 py-1">
                      <MoveHorizontal className="size-3 shrink-0 text-muted-foreground" />
                      <input
                        className="w-full bg-transparent text-xs outline-none"
                        value={gapH}
                        onChange={(e) => setGapH(e.target.value)}
                      />
                      <span className="text-[10px] text-muted-foreground">px</span>
                    </div>
                    <div className="flex items-center gap-1.5 rounded border px-2 py-1">
                      <MoveVertical className="size-3 shrink-0 text-muted-foreground" />
                      <input
                        className="w-full bg-transparent text-xs outline-none"
                        value={gapV}
                        onChange={(e) => setGapV(e.target.value)}
                      />
                      <span className="text-[10px] text-muted-foreground">px</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs">Padding</span>
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] text-primary">px*</span>
                      <Button variant="ghost" size="sm" className="size-5 p-0">
                        <Link2 className="size-3 text-muted-foreground" />
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-1.5 rounded border px-2 py-1">
                      <MoveHorizontal className="size-3 shrink-0 text-muted-foreground" />
                      <input
                        className="w-full bg-transparent text-xs outline-none"
                        value={padH}
                        onChange={(e) => setPadH(e.target.value)}
                      />
                      <span className="text-[10px] text-muted-foreground">px*</span>
                    </div>
                    <div className="flex items-center gap-1.5 rounded border px-2 py-1">
                      <MoveVertical className="size-3 shrink-0 text-muted-foreground" />
                      <input
                        className="w-full bg-transparent text-xs outline-none"
                        value={padV}
                        onChange={(e) => setPadV(e.target.value)}
                      />
                      <span className="text-[10px] text-muted-foreground">px*</span>
                    </div>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
    </div>
  );
}
