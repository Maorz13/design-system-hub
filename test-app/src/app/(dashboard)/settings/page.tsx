"use client";

import { useState } from "react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { RoleGate } from "@/components/shared/role-gate";
import { ROLE_LABELS } from "@/lib/constants/roles";
import { PLAN_LABELS, PLAN_LIMITS } from "@/lib/constants/plans";
import { MOCK_WORKSPACE, MOCK_USERS, MOCK_LIBRARIES } from "@/lib/mock-data";
import type { Plan } from "@/types/database";

export default function SettingsPage() {
  const [workspaceName, setWorkspaceName] = useState(MOCK_WORKSPACE.name);
  const [autoInstall, setAutoInstall] = useState(false);

  const libraryLimit = PLAN_LIMITS[MOCK_WORKSPACE.plan];
  const libraryCount = MOCK_LIBRARIES.length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your workspace configuration.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Workspace</CardTitle>
            <CardDescription>
              General workspace settings and plan information.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ws-name">Workspace Name</Label>
              <Input
                id="ws-name"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
              />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label>Current Plan</Label>
              <div className="flex items-center gap-3">
                <Badge className="text-sm">
                  {PLAN_LABELS[MOCK_WORKSPACE.plan]}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {libraryLimit === Infinity
                    ? "Unlimited libraries"
                    : `${libraryLimit} library max`}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Using {libraryCount} of{" "}
                {libraryLimit === Infinity ? "unlimited" : libraryLimit}{" "}
                libraries.
              </p>
            </div>
            <Separator />
            <RoleGate
              action="MANAGE_WORKSPACE"
              fallback={
                <p className="text-sm text-muted-foreground">
                  Only Owners and Admins can modify workspace settings.
                </p>
              }
            >
              <div className="flex items-center justify-between">
                <div>
                  <Label>Auto-Install Libraries</Label>
                  <p className="text-xs text-muted-foreground">
                    Automatically install selected libraries on all new sites.
                  </p>
                </div>
                <Switch
                  checked={autoInstall}
                  onCheckedChange={setAutoInstall}
                />
              </div>
              <Button
                className="mt-2"
                onClick={() =>
                  toast.success("Settings saved", {
                    description: "Workspace settings have been updated.",
                  })
                }
              >
                Save Changes
              </Button>
            </RoleGate>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>
              Users in your workspace and their roles.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_USERS.map((user) => {
                  const initials = user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase();
                  return (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="size-8">
                            <AvatarFallback className="text-xs">
                              {initials}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{user.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {ROLE_LABELS[user.role]}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
