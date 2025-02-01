import { getUserPlanRestrictions } from "@/lib/plan-restrictions";
import { useSession } from "next-auth/react";

export function usePlanRestrictions() {
  const { data: session } = useSession();
  const userPlan = session?.user?.plan || "FREE";
  const restrictions = getUserPlanRestrictions(userPlan as "FREE" | "PRO");

  return {
    restrictions,
    userPlan,
    isAuthenticated: !!session?.user,
  };
}
