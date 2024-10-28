export type TemplateButtonVariant = "primary" | "secondary" | "outline";
export type ShadcnButtonVariant = "default" | "secondary" | "outline";

export const convertButtonVariant = (
  variant: TemplateButtonVariant
): ShadcnButtonVariant => {
  if (variant === "primary") {
    return "default";
  }
  return variant;
};
