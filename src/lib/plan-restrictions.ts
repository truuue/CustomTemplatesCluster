export const PLAN_RESTRICTIONS = {
  FREE: {
    maxTemplates: 1,
    hasBasicTemplates: true,
    hasAllTemplates: false,
    hasAdvancedAnalytics: false,
    hasPrioritySupport: false,
  },
  PRO: {
    maxTemplates: Infinity,
    hasBasicTemplates: true,
    hasAllTemplates: true,
    hasAdvancedAnalytics: true,
    hasPrioritySupport: true,
  },
} as const;

export type PlanRestrictions =
  (typeof PLAN_RESTRICTIONS)[keyof typeof PLAN_RESTRICTIONS];

export function getUserPlanRestrictions(
  plan: "FREE" | "PRO"
): PlanRestrictions {
  return PLAN_RESTRICTIONS[plan];
}

export function canCreateNewTemplate(
  currentTemplatesCount: number,
  userPlan: "FREE" | "PRO"
): boolean {
  const restrictions = getUserPlanRestrictions(userPlan);
  return currentTemplatesCount < restrictions.maxTemplates;
}
