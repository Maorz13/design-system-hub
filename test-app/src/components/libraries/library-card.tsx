"use client";

import Link from "next/link";
import { Component, Globe, Paintbrush } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
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
        <CardContent className="py-4">
          <div className="flex items-center gap-3">
            <div
              className="flex size-10 shrink-0 items-center justify-center rounded-lg text-sm font-semibold"
              style={{
                backgroundColor: "color-mix(in srgb, #E46209 12%, transparent)",
                color: "#E46209",
              }}
            >
              {library.name.charAt(0)}
            </div>
            <div className="min-w-0 flex-1 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="truncate text-sm font-semibold">{library.name}</span>
                <Badge variant="secondary" className="shrink-0 text-[10px] px-1.5 py-0">
                  v{library.version}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Component className="size-3.5" />
                  <span className="font-medium">{components.length}</span>
                  components
                </div>
                <div className="flex items-center gap-1.5">
                  <Paintbrush className="size-3.5" />
                  <span className="font-medium">{variables.length}</span>
                  variable{variables.length !== 1 && "s"}
                </div>
                <div className="flex items-center gap-1.5">
                  <Globe className="size-3.5" />
                  <span className="font-medium">{installations.length}</span>
                  connected site{installations.length !== 1 && "s"}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
