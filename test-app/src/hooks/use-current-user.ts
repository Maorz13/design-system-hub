"use client";

import { useMemo } from "react";
import { MOCK_CURRENT_USER } from "@/lib/mock-data";
import { hasPermission } from "@/lib/constants/roles";
import type { Action } from "@/types/rbac";

export function useCurrentUser() {
  const user = MOCK_CURRENT_USER;

  const can = useMemo(() => {
    return (action: Action) => hasPermission(user.role, action);
  }, [user.role]);

  return { user, can };
}
