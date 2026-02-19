import type { Plan } from "@/types/database";

export const PLAN_LIMITS: Record<Plan, number> = {
  starter: 0,
  core: 1,
  growth: 1,
  freelancer: 1,
  agency: Infinity,
  enterprise: Infinity,
};

export const PLAN_LABELS: Record<Plan, string> = {
  starter: "Starter",
  core: "Core",
  growth: "Growth",
  freelancer: "Freelancer",
  agency: "Agency",
  enterprise: "Enterprise",
};

export function getLibraryLimit(plan: Plan): number {
  return PLAN_LIMITS[plan];
}

export function canCreateLibrary(plan: Plan, currentCount: number): boolean {
  const limit = PLAN_LIMITS[plan];
  return currentCount < limit;
}
