import type { Role } from "@/types/database";
import type { Action, PermissionMatrix } from "@/types/rbac";

export const PERMISSION_MATRIX: PermissionMatrix = {
  CREATE_LIBRARY: ["owner", "admin", "designer"],
  INSTALL_LIBRARY: ["owner", "admin", "site_manager", "designer"],
  ACCEPT_UPDATES: ["owner", "admin", "site_manager", "designer"],
  USE_SHARED_ELEMENTS: ["owner", "admin", "site_manager", "designer", "marketer"],
  UNLINK_DETACH: ["owner", "admin", "site_manager", "designer"],
  MANAGE_SOURCE_ASSETS: ["owner", "admin", "designer"],
  MANAGE_WORKSPACE: ["owner", "admin"],
  MANAGE_SITES: ["owner", "admin", "site_manager", "designer"],
};

export const ROLE_LABELS: Record<Role, string> = {
  owner: "Owner",
  admin: "Admin",
  site_manager: "Site Manager",
  designer: "Designer",
  marketer: "Marketer",
  content_editor: "Content Editor",
};

export function hasPermission(role: Role, action: Action): boolean {
  return PERMISSION_MATRIX[action].includes(role);
}
