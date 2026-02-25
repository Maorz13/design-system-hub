"use client";

import { useState, useCallback } from "react";
import {
  Pencil,
  Check,
  X,
  Plus,
  Ruler,
  Percent,
  Hash,
  Type,
  Palette,
  GripVertical,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Variable, VariableType } from "@/types/database";

interface BrandKitPanelProps {
  variables: Variable[];
}

const VARIABLE_TYPE_META: Record<
  VariableType,
  { label: string; defaultValue: string; placeholder: string }
> = {
  color: { label: "Color", defaultValue: "#000000", placeholder: "#000000" },
  size: { label: "Size", defaultValue: "0px", placeholder: "0px" },
  percentage: { label: "Percentage", defaultValue: "100%", placeholder: "100%" },
  number: { label: "Number", defaultValue: "0", placeholder: "0" },
  font: { label: "Font family", defaultValue: "Arial", placeholder: "Arial" },
  text_style: { label: "Text style", defaultValue: "16px", placeholder: "16px" },
};

function VariableTypeIcon({ type }: { type: VariableType }) {
  switch (type) {
    case "color":
      return <Palette className="size-4 shrink-0 text-muted-foreground" />;
    case "size":
      return <Ruler className="size-4 shrink-0 text-muted-foreground" />;
    case "percentage":
      return <Percent className="size-4 shrink-0 text-muted-foreground" />;
    case "number":
      return <Hash className="size-4 shrink-0 text-muted-foreground" />;
    case "font":
    case "text_style":
      return <Type className="size-4 shrink-0 text-muted-foreground" />;
  }
}

function VariableValueDisplay({ variable }: { variable: Variable }) {
  if (variable.type === "color") {
    return (
      <div className="flex items-center gap-2">
        <div
          className="size-4 shrink-0 rounded-[3px] border border-border/60"
          style={{ backgroundColor: variable.value_default }}
        />
        <span className="text-sm text-muted-foreground">
          {variable.value_default}
        </span>
      </div>
    );
  }

  return (
    <span className="text-sm text-muted-foreground">
      {variable.value_default}
    </span>
  );
}

function EditableVariableRow({
  variable,
  onSave,
  isDragTarget,
  onDragStart,
  onDragOver,
  onDragEnd,
  onDrop,
}: {
  variable: Variable;
  onSave: (id: string, key: string, value: string) => void;
  isDragTarget: boolean;
  onDragStart: (id: string) => void;
  onDragOver: (e: React.DragEvent, id: string) => void;
  onDragEnd: () => void;
  onDrop: (e: React.DragEvent) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draftName, setDraftName] = useState(variable.key);
  const [draftValue, setDraftValue] = useState(variable.value_default);

  function handleConfirm() {
    if (draftName.trim() && draftValue.trim()) {
      onSave(variable.id, draftName.trim(), draftValue.trim());
    }
    setEditing(false);
  }

  function handleCancel() {
    setDraftName(variable.key);
    setDraftValue(variable.value_default);
    setEditing(false);
  }

  if (editing) {
    return (
      <div className="flex items-center gap-2 py-1.5">
        <VariableTypeIcon type={variable.type} />
        {variable.type === "color" && (
          <input
            type="color"
            value={draftValue}
            onChange={(e) => setDraftValue(e.target.value)}
            className="size-7 shrink-0 cursor-pointer rounded border p-0.5"
          />
        )}
        <Input
          value={draftName}
          onChange={(e) => setDraftName(e.target.value)}
          className="h-8 flex-1 text-sm"
          placeholder="Name"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleConfirm();
            if (e.key === "Escape") handleCancel();
          }}
          autoFocus
        />
        <Input
          value={draftValue}
          onChange={(e) => setDraftValue(e.target.value)}
          className="h-8 w-24 text-sm"
          placeholder={VARIABLE_TYPE_META[variable.type].placeholder}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleConfirm();
            if (e.key === "Escape") handleCancel();
          }}
        />
        <Button
          variant="ghost"
          size="icon"
          className="size-7 shrink-0 text-green-600 hover:text-green-700"
          onClick={handleConfirm}
        >
          <Check className="size-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="size-7 shrink-0 text-muted-foreground hover:text-destructive"
          onClick={handleCancel}
        >
          <X className="size-3.5" />
        </Button>
      </div>
    );
  }

  return (
    <div
      draggable
      onDragStart={() => onDragStart(variable.id)}
      onDragOver={(e) => onDragOver(e, variable.id)}
      onDragEnd={onDragEnd}
      onDrop={onDrop}
      className={cn(
        "group flex items-center justify-between py-2 -mx-2 px-2 rounded-md hover:bg-muted/50 transition-colors",
        isDragTarget && "border-t-2 border-primary"
      )}
    >
      <div className="flex items-center gap-2">
        <GripVertical className="size-4 shrink-0 cursor-grab text-muted-foreground/40 group-hover:text-muted-foreground active:cursor-grabbing" />
        <VariableTypeIcon type={variable.type} />
        <span className="text-sm">{variable.key}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <VariableValueDisplay variable={variable} />
        <Button
          variant="ghost"
          size="icon"
          className="size-7 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground"
          onClick={() => setEditing(true)}
        >
          <Pencil className="size-3" />
        </Button>
      </div>
    </div>
  );
}

function EditableFontRow({
  variable,
  onSave,
}: {
  variable: Variable;
  onSave: (id: string, key: string, value: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draftName, setDraftName] = useState(variable.key);

  function handleConfirm() {
    if (draftName.trim()) {
      onSave(variable.id, draftName.trim(), draftName.trim());
    }
    setEditing(false);
  }

  function handleCancel() {
    setDraftName(variable.key);
    setEditing(false);
  }

  if (editing) {
    return (
      <div className="flex items-center gap-2 py-1.5">
        <Input
          value={draftName}
          onChange={(e) => setDraftName(e.target.value)}
          className="h-8 flex-1 text-sm"
          placeholder="Font name"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleConfirm();
            if (e.key === "Escape") handleCancel();
          }}
          autoFocus
        />
        <Button
          variant="ghost"
          size="icon"
          className="size-7 shrink-0 text-green-600 hover:text-green-700"
          onClick={handleConfirm}
        >
          <Check className="size-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="size-7 shrink-0 text-muted-foreground hover:text-destructive"
          onClick={handleCancel}
        >
          <X className="size-3.5" />
        </Button>
      </div>
    );
  }

  return (
    <div className="group flex items-center justify-between py-2 -mx-2 px-2 rounded-md hover:bg-muted/50 transition-colors">
      <span
        className="text-base font-medium"
        style={{ fontFamily: variable.value_default }}
      >
        {variable.key}
      </span>
      <Button
        variant="ghost"
        size="icon"
        className="size-7 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground"
        onClick={() => setEditing(true)}
      >
        <Pencil className="size-3" />
      </Button>
    </div>
  );
}

function EditableTextStyleRow({
  variable,
  onSave,
}: {
  variable: Variable;
  onSave: (id: string, key: string, value: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draftName, setDraftName] = useState(variable.key);
  const [draftSize, setDraftSize] = useState(
    variable.value_default.replace("px", "")
  );

  const isHeading = variable.key.startsWith("Heading");

  function handleConfirm() {
    if (draftName.trim() && draftSize.trim()) {
      const sizeValue = draftSize.trim().endsWith("px")
        ? draftSize.trim()
        : `${draftSize.trim()}px`;
      onSave(variable.id, draftName.trim(), sizeValue);
    }
    setEditing(false);
  }

  function handleCancel() {
    setDraftName(variable.key);
    setDraftSize(variable.value_default.replace("px", ""));
    setEditing(false);
  }

  if (editing) {
    return (
      <div className="flex items-center gap-2 py-1.5">
        <span className="w-7 shrink-0 text-sm text-muted-foreground select-none">
          Ag
        </span>
        <Input
          value={draftName}
          onChange={(e) => setDraftName(e.target.value)}
          className="h-8 flex-1 text-sm"
          placeholder="Style name"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleConfirm();
            if (e.key === "Escape") handleCancel();
          }}
          autoFocus
        />
        <div className="flex items-center gap-1">
          <Input
            value={draftSize}
            onChange={(e) => setDraftSize(e.target.value)}
            className="h-8 w-16 text-right text-sm"
            placeholder="16"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleConfirm();
              if (e.key === "Escape") handleCancel();
            }}
          />
          <span className="text-xs text-muted-foreground">px</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="size-7 shrink-0 text-green-600 hover:text-green-700"
          onClick={handleConfirm}
        >
          <Check className="size-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="size-7 shrink-0 text-muted-foreground hover:text-destructive"
          onClick={handleCancel}
        >
          <X className="size-3.5" />
        </Button>
      </div>
    );
  }

  return (
    <div className="group flex items-center justify-between py-2 -mx-2 px-2 rounded-md hover:bg-muted/50 transition-colors">
      <div className="flex items-center gap-3">
        <span
          className={cn(
            "w-7 shrink-0 text-muted-foreground select-none",
            isHeading ? "text-sm font-bold" : "text-sm"
          )}
        >
          Ag
        </span>
        <span className={cn("text-sm", isHeading && "font-semibold")}>
          {variable.key}
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-sm text-muted-foreground">
          {variable.value_default}
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="size-7 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground"
          onClick={() => setEditing(true)}
        >
          <Pencil className="size-3" />
        </Button>
      </div>
    </div>
  );
}

const NEW_VARIABLE_TYPES: { type: VariableType; label: string }[] = [
  { type: "color", label: "Color" },
  { type: "size", label: "Size" },
  { type: "percentage", label: "Percentage" },
  { type: "number", label: "Number" },
];

export function BrandKitPanel({ variables: initialVariables }: BrandKitPanelProps) {
  const [variables, setVariables] = useState(initialVariables);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dropTargetId, setDropTargetId] = useState<string | null>(null);

  const variableCardItems = variables.filter(
    (v) => v.type !== "font" && v.type !== "text_style"
  );
  const fontVars = variables.filter((v) => v.type === "font");
  const textStyleVars = variables.filter((v) => v.type === "text_style");

  const handleSave = useCallback(
    (id: string, key: string, value: string) => {
      setVariables((prev) =>
        prev.map((v) =>
          v.id === id ? { ...v, key, value_default: value } : v
        )
      );
      toast.success("Variable updated");
    },
    []
  );

  function handleReorder(fromId: string, toId: string) {
    if (fromId === toId) return;
    setVariables((prev) => {
      const isVarCard = (v: Variable) =>
        v.type !== "font" && v.type !== "text_style";
      const filtered = prev.filter(isVarCard);
      const fromIdx = filtered.findIndex((v) => v.id === fromId);
      const toIdx = filtered.findIndex((v) => v.id === toId);
      if (fromIdx === -1 || toIdx === -1) return prev;

      const reordered = [...filtered];
      const [moved] = reordered.splice(fromIdx, 1);
      reordered.splice(toIdx, 0, moved);

      const result: Variable[] = [];
      let ri = 0;
      for (const v of prev) {
        if (isVarCard(v)) {
          result.push(reordered[ri++]);
        } else {
          result.push(v);
        }
      }
      return result;
    });
  }

  function handleAddVariable(type: VariableType) {
    const meta = VARIABLE_TYPE_META[type];
    const newVar: Variable = {
      id: `var-new-${Date.now()}`,
      library_id: "lib-001",
      key: `New ${meta.label.toLowerCase()}`,
      value_default: meta.defaultValue,
      value_dark: null,
      type,
    };
    setVariables((prev) => [...prev, newVar]);
    toast.success(`${meta.label} variable added`);
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-base">Variables</CardTitle>
            <Badge variant="secondary" className="text-xs">
              {variableCardItems.length}
            </Badge>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-8 text-muted-foreground"
              >
                <Plus className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {NEW_VARIABLE_TYPES.map(({ type, label }) => (
                <DropdownMenuItem
                  key={type}
                  onClick={() => handleAddVariable(type)}
                  className="gap-2"
                >
                  <VariableTypeIcon type={type} />
                  {label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent>
          {variableCardItems.map((v) => (
            <EditableVariableRow
              key={v.id}
              variable={v}
              onSave={handleSave}
              isDragTarget={dropTargetId === v.id && draggedId !== v.id}
              onDragStart={(id) => setDraggedId(id)}
              onDragOver={(e, id) => {
                e.preventDefault();
                setDropTargetId(id);
              }}
              onDragEnd={() => {
                setDraggedId(null);
                setDropTargetId(null);
              }}
              onDrop={(e) => {
                e.preventDefault();
                if (draggedId && dropTargetId) {
                  handleReorder(draggedId, dropTargetId);
                }
                setDraggedId(null);
                setDropTargetId(null);
              }}
            />
          ))}

        </CardContent>
      </Card>

      {(fontVars.length > 0 || textStyleVars.length > 0) && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle className="text-base">Typography</CardTitle>
              <Badge variant="secondary" className="text-xs">
                {fontVars.length + textStyleVars.length}
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 text-muted-foreground"
            >
              <Plus className="size-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {fontVars.length > 0 && (
              <div>
                <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Fonts
                </p>
                {fontVars.map((v) => (
                  <EditableFontRow
                    key={v.id}
                    variable={v}
                    onSave={handleSave}
                  />
                ))}
              </div>
            )}
            {fontVars.length > 0 && textStyleVars.length > 0 && (
              <div className="border-t" />
            )}
            {textStyleVars.length > 0 && (
              <div>
                <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Text Styles
                </p>
                {textStyleVars.map((v) => (
                  <EditableTextStyleRow
                    key={v.id}
                    variable={v}
                    onSave={handleSave}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
