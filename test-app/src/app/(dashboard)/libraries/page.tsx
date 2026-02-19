"use client";

import { useState } from "react";
import { Library as LibraryIcon } from "lucide-react";
import { LibraryCard } from "@/components/libraries/library-card";
import { CreateLibraryDialog } from "@/components/libraries/create-library-dialog";
import { EmptyState } from "@/components/shared/empty-state";
import { RoleGate } from "@/components/shared/role-gate";
import { MOCK_LIBRARIES } from "@/lib/mock-data";
import type { Library } from "@/types/database";

export default function LibrariesPage() {
  const [libraries, setLibraries] = useState<Library[]>(MOCK_LIBRARIES);

  function handleCreated(newLib: Library) {
    setLibraries([...libraries, newLib]);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Libraries</h1>
          <p className="text-muted-foreground">
            Manage your shared design libraries.
          </p>
        </div>
        <RoleGate action="CREATE_LIBRARY">
          <CreateLibraryDialog onCreated={handleCreated} />
        </RoleGate>
      </div>

      {libraries.length === 0 ? (
        <EmptyState
          icon={LibraryIcon}
          title="No libraries yet"
          description="Create your first shared library to start distributing components and tokens."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {libraries.map((lib) => (
            <LibraryCard key={lib.id} library={lib} />
          ))}
        </div>
      )}
    </div>
  );
}
