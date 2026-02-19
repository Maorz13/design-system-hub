"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import type { Library } from "@/types/database";

interface CreateLibraryDialogProps {
  onCreated: (library: Library) => void;
}

export function CreateLibraryDialog({ onCreated }: CreateLibraryDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleCreate() {
    if (!name.trim()) return;

    const newLibrary: Library = {
      id: `lib-${Date.now()}`,
      source_site_id: "",
      name: name.trim(),
      version: 1,
      description: description.trim(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    onCreated(newLibrary);
    setName("");
    setDescription("");
    setOpen(false);
    toast.success("Library created", {
      description: `${newLibrary.name} is ready for configuration.`,
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 size-4" />
          New Library
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Library</DialogTitle>
          <DialogDescription>
            Set up a new design library to share components, variables, and
            assets across your workspace.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="lib-name">Library Name</Label>
            <Input
              id="lib-name"
              placeholder="e.g. Acme Brand"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lib-desc">Description</Label>
            <Textarea
              id="lib-desc"
              placeholder="Describe the purpose of this library..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={!name.trim()}>
            Create Library
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
