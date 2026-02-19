export type Plan = "starter" | "core" | "growth" | "freelancer" | "agency" | "enterprise";
export type Role = "owner" | "admin" | "site_manager" | "designer" | "marketer" | "content_editor";
export type SiteType = "source" | "consumer";
export type VariableType = "color" | "size" | "font";

export interface Workspace {
  id: string;
  name: string;
  plan: Plan;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  workspace_id: string;
  role: Role;
}

export interface Site {
  id: string;
  workspace_id: string;
  name: string;
  type: SiteType;
  created_at: string;
  updated_at: string;
}

export interface Library {
  id: string;
  source_site_id: string;
  name: string;
  version: number;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface LibraryInstallation {
  id: string;
  library_id: string;
  consumer_site_id: string;
  installed_version: number;
  installed_at: string;
}

export interface Variable {
  id: string;
  library_id: string;
  key: string;
  value_default: string;
  value_dark: string | null;
  type: VariableType;
}

export interface ComponentPropSchema {
  [key: string]: {
    type: "text" | "image" | "boolean";
    default: string | boolean;
    label?: string;
  };
}

export interface DesignComponent {
  id: string;
  library_id: string;
  name: string;
  html_structure: string;
  css_styles: string;
  props_schema: ComponentPropSchema;
  created_at: string;
  updated_at: string;
}

export interface Asset {
  id: string;
  library_id: string;
  name: string;
  storage_path: string;
  folder: string;
  file_type: string;
  file_size: number;
  created_at: string;
}
