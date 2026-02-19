"use client";

import { use, useState } from "react";
import Link from "next/link";
import { Plus, Trash2 } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { getLibraryById, getVariablesByLibrary } from "@/lib/mock-data";
import type { Variable, VariableType } from "@/types/database";

export default function VariablesPage({
  params,
}: {
  params: Promise<{ libraryId: string }>;
}) {
  const { libraryId } = use(params);
  const library = getLibraryById(libraryId);
  const initialVars = getVariablesByLibrary(libraryId);
  const [variables, setVariables] = useState<Variable[]>(initialVars);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");
  const [newDarkValue, setNewDarkValue] = useState("");
  const [newType, setNewType] = useState<VariableType>("color");
  const [hasDarkMode, setHasDarkMode] = useState(false);

  const [showDark, setShowDark] = useState(false);

  if (!library) {
    return <p className="text-muted-foreground">Library not found.</p>;
  }

  const colorVars = variables.filter((v) => v.type === "color");
  const sizeVars = variables.filter((v) => v.type === "size");
  const fontVars = variables.filter((v) => v.type === "font");

  function handleCreate() {
    if (!newKey.trim() || !newValue.trim()) return;

    const variable: Variable = {
      id: `var-${Date.now()}`,
      library_id: libraryId,
      key: newKey.trim().toLowerCase().replace(/\s+/g, "-"),
      value_default: newValue.trim(),
      value_dark: hasDarkMode && newDarkValue.trim() ? newDarkValue.trim() : null,
      type: newType,
    };
    setVariables([...variables, variable]);
    resetForm();
    setDialogOpen(false);
    toast.success("Variable added", {
      description: `--${variable.key} has been created.`,
    });
  }

  function handleDelete(id: string) {
    setVariables(variables.filter((v) => v.id !== id));
    toast.success("Variable removed");
  }

  function handleUpdateValue(id: string, field: "value_default" | "value_dark", value: string) {
    setVariables(
      variables.map((v) => (v.id === id ? { ...v, [field]: value } : v))
    );
  }

  function resetForm() {
    setNewKey("");
    setNewValue("");
    setNewDarkValue("");
    setNewType("color");
    setHasDarkMode(false);
  }

  function generateCSS() {
    const defaultVars = variables
      .map((v) => `  --${v.key}: ${v.value_default};`)
      .join("\n");
    const darkVars = variables
      .filter((v) => v.value_dark)
      .map((v) => `  --${v.key}: ${v.value_dark};`)
      .join("\n");

    return `:root {\n${defaultVars}\n}\n\n[data-theme="dark"] {\n${darkVars}\n}`;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/libraries" className="hover:text-foreground">
          Libraries
        </Link>
        <span>/</span>
        <Link
          href={`/libraries/${libraryId}`}
          className="hover:text-foreground"
        >
          {library.name}
        </Link>
        <span>/</span>
        <span className="text-foreground">Variables</span>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Variables</h1>
          <p className="text-muted-foreground">
            Manage design tokens for {library.name}.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Label htmlFor="dark-toggle" className="text-sm">
              Preview Dark Mode
            </Label>
            <Switch
              id="dark-toggle"
              checked={showDark}
              onCheckedChange={setShowDark}
            />
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 size-4" />
                Add Variable
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Variable</DialogTitle>
                <DialogDescription>
                  Create a new design token for this library.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Token Name</Label>
                  <Input
                    placeholder="e.g. brand-accent"
                    value={newKey}
                    onChange={(e) => setNewKey(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select
                    value={newType}
                    onValueChange={(v) => setNewType(v as VariableType)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="color">Color</SelectItem>
                      <SelectItem value="size">Size</SelectItem>
                      <SelectItem value="font">Font</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Default Value</Label>
                  <div className="flex items-center gap-2">
                    {newType === "color" && (
                      <input
                        type="color"
                        value={newValue || "#000000"}
                        onChange={(e) => setNewValue(e.target.value)}
                        className="size-10 cursor-pointer rounded border p-1"
                      />
                    )}
                    <Input
                      placeholder={
                        newType === "color"
                          ? "#0055FF"
                          : newType === "size"
                            ? "16px"
                            : "Inter"
                      }
                      value={newValue}
                      onChange={(e) => setNewValue(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={hasDarkMode}
                    onCheckedChange={setHasDarkMode}
                  />
                  <Label>Has Dark Mode value</Label>
                </div>
                {hasDarkMode && (
                  <div className="space-y-2">
                    <Label>Dark Mode Value</Label>
                    <div className="flex items-center gap-2">
                      {newType === "color" && (
                        <input
                          type="color"
                          value={newDarkValue || "#000000"}
                          onChange={(e) => setNewDarkValue(e.target.value)}
                          className="size-10 cursor-pointer rounded border p-1"
                        />
                      )}
                      <Input
                        placeholder="Dark mode value"
                        value={newDarkValue}
                        onChange={(e) => setNewDarkValue(e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleCreate}
                  disabled={!newKey.trim() || !newValue.trim()}
                >
                  Add Variable
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <VariableSection
            title="Colors"
            description="Brand and UI color tokens"
            variables={colorVars}
            type="color"
            showDark={showDark}
            onUpdate={handleUpdateValue}
            onDelete={handleDelete}
          />
          <VariableSection
            title="Sizes"
            description="Spacing, radius, and dimension tokens"
            variables={sizeVars}
            type="size"
            showDark={showDark}
            onUpdate={handleUpdateValue}
            onDelete={handleDelete}
          />
          <VariableSection
            title="Fonts"
            description="Typography font-family tokens"
            variables={fontVars}
            type="font"
            showDark={showDark}
            onUpdate={handleUpdateValue}
            onDelete={handleDelete}
          />
        </div>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="text-base">Generated CSS</CardTitle>
            <CardDescription>
              This CSS block will be injected into consumer sites.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="overflow-auto rounded-md bg-muted p-4 text-xs">
              <code>{generateCSS()}</code>
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function VariableSection({
  title,
  description,
  variables,
  type,
  showDark,
  onUpdate,
  onDelete,
}: {
  title: string;
  description: string;
  variables: Variable[];
  type: VariableType;
  showDark: boolean;
  onUpdate: (id: string, field: "value_default" | "value_dark", value: string) => void;
  onDelete: (id: string) => void;
}) {
  if (variables.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {variables.map((v) => {
          const displayValue = showDark && v.value_dark ? v.value_dark : v.value_default;
          return (
            <div
              key={v.id}
              className="flex items-center gap-3 rounded-lg border p-3"
            >
              {type === "color" && (
                <input
                  type="color"
                  value={displayValue}
                  onChange={(e) =>
                    onUpdate(
                      v.id,
                      showDark && v.value_dark ? "value_dark" : "value_default",
                      e.target.value
                    )
                  }
                  className="size-10 cursor-pointer rounded border p-1"
                />
              )}
              <div className="flex-1">
                <p className="text-sm font-medium">--{v.key}</p>
                <Input
                  className="mt-1 h-8 text-xs"
                  value={displayValue}
                  onChange={(e) =>
                    onUpdate(
                      v.id,
                      showDark && v.value_dark ? "value_dark" : "value_default",
                      e.target.value
                    )
                  }
                />
              </div>
              {showDark && v.value_dark && (
                <Badge variant="outline" className="text-xs">
                  dark
                </Badge>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="size-8 text-muted-foreground hover:text-destructive"
                onClick={() => onDelete(v.id)}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
