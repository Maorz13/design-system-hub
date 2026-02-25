"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Settings2, Copy, Eye } from "lucide-react";
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
import { Separator } from "@/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { ComponentPreview } from "@/components/component-builder/component-preview";
import { getLibraryById, getComponentsByLibrary } from "@/lib/mock-data";
import type { DesignComponent } from "@/types/database";

export default function ComponentsPage({
  params,
}: {
  params: Promise<{ libraryId: string }>;
}) {
  const { libraryId } = use(params);
  const library = getLibraryById(libraryId);
  const initialComponents = getComponentsByLibrary(libraryId);
  const [components, setComponents] = useState(initialComponents);
  const [selectedComponent, setSelectedComponent] =
    useState<DesignComponent | null>(null);

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

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/libraries" className="hover:text-foreground">
          Brand Libraries
        </Link>
        <span>/</span>
        <Link
          href={`/libraries/${libraryId}`}
          className="hover:text-foreground"
        >
          {library.name}
        </Link>
        <span>/</span>
        <span className="text-foreground">Components</span>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Components</h1>
          <p className="text-muted-foreground">
            {components.length} components in {library.name}.
          </p>
        </div>
        <Button
          onClick={() =>
            toast.info("Component builder coming soon", {
              description: "The full builder will be available in Phase 5.",
            })
          }
        >
          <Plus className="mr-2 size-4" />
          New Component
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-3 lg:col-span-1">
          {components.map((comp) => (
            <Card
              key={comp.id}
              className={`cursor-pointer transition-colors ${selectedComponent?.id === comp.id ? "border-primary" : "hover:border-primary/50"}`}
              onClick={() => setSelectedComponent(comp)}
            >
              <CardHeader className="p-4">
                <CardTitle className="text-sm">{comp.name}</CardTitle>
                <CardDescription className="text-xs">
                  {Object.keys(comp.props_schema).length} props
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="lg:col-span-2">
          {selectedComponent ? (
            <ComponentDetail component={selectedComponent} />
          ) : (
            <Card className="flex h-64 items-center justify-center">
              <p className="text-sm text-muted-foreground">
                Select a component to view its details.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function ComponentDetail({ component }: { component: DesignComponent }) {
  const props = Object.entries(component.props_schema);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{component.name}</CardTitle>
            <CardDescription>
              Last updated{" "}
              {new Date(component.updated_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Eye className="mr-1 size-3" />
              Preview
            </Button>
            <Button variant="outline" size="sm">
              <Copy className="mr-1 size-3" />
              Duplicate
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="preview">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="props">Props</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>

          <TabsContent value="preview" className="mt-4">
            <ComponentPreview component={component} scale="md" />
          </TabsContent>

          <TabsContent value="props" className="mt-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              Props define the customizable parts of this component for consumer
              sites.
            </p>
            {props.map(([key, schema]) => (
              <div key={key} className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">
                      {schema.label || key}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Prop key: <code className="text-xs">{key}</code>
                    </p>
                  </div>
                  <Badge variant="outline">{schema.type}</Badge>
                </div>
                <Separator className="my-3" />
                <div className="space-y-2">
                  <Label className="text-xs">Default Value</Label>
                  {schema.type === "text" && (
                    <Input
                      className="h-8 text-sm"
                      defaultValue={schema.default as string}
                      readOnly
                    />
                  )}
                  {schema.type === "boolean" && (
                    <Switch defaultChecked={schema.default as boolean} />
                  )}
                  {schema.type === "image" && (
                    <div className="flex h-20 items-center justify-center rounded border-2 border-dashed bg-muted/30 text-xs text-muted-foreground">
                      Image picker
                    </div>
                  )}
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="code" className="mt-4 space-y-4">
            <div>
              <Label className="text-xs text-muted-foreground">
                HTML Structure
              </Label>
              <pre className="mt-1 overflow-auto rounded-md bg-muted p-4 text-xs">
                <code>{component.html_structure}</code>
              </pre>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">
                CSS Styles
              </Label>
              <pre className="mt-1 overflow-auto rounded-md bg-muted p-4 text-xs">
                <code>{component.css_styles}</code>
              </pre>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
