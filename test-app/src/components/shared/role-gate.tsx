"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import type { Action } from "@/types/rbac";

interface RoleGateProps {
  action: Action;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function RoleGate({ action, children, fallback = null }: RoleGateProps) {
  const { user, can } = useCurrentUser();
  if (!user || !can(action)) return <>{fallback}</>;
  return <>{children}</>;
}
