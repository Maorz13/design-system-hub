"use client";

import Link from "next/link";
import { Library, Component, Paintbrush, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getComponentsByLibrary,
  getVariablesByLibrary,
  getInstallationsByLibrary,
} from "@/lib/mock-data";
import type { Library as LibraryType } from "@/types/database";

interface LibraryCardProps {
  library: LibraryType;
}

export function LibraryCard({ library }: LibraryCardProps) {
  const components = getComponentsByLibrary(library.id);
  const variables = getVariablesByLibrary(library.id);
  const installations = getInstallationsByLibrary(library.id);

  return (
    <Link href={`/libraries/${library.id}`}>
      <Card className="transition-colors hover:border-primary/50">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="flex size-9 items-center justify-center rounded-md bg-primary/10">
                <Library className="size-4 text-primary" />
              </div>
              <CardTitle className="text-base">{library.name}</CardTitle>
            </div>
            <Badge variant="secondary">v{library.version}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
            {library.description}
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Component className="size-3" />
              {components.length} components
            </span>
            <span className="flex items-center gap-1">
              <Paintbrush className="size-3" />
              {variables.length} tokens
            </span>
            <span className="flex items-center gap-1">
              <Globe className="size-3" />
              {installations.length} sites
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
