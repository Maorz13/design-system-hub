import type { Role } from "./database";

export type Action =
  | "CREATE_LIBRARY"
  | "INSTALL_LIBRARY"
  | "ACCEPT_UPDATES"
  | "USE_SHARED_ELEMENTS"
  | "UNLINK_DETACH"
  | "MANAGE_SOURCE_ASSETS"
  | "MANAGE_WORKSPACE"
  | "MANAGE_SITES";

export type PermissionMatrix = Record<Action, Role[]>;
