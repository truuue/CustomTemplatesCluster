import { cn } from "@/lib/utils";
import { Button } from "./button";

export default function ReturnButton({ className }: { className?: string }) {
  return (
    <Button
      variant="ghost"
      onClick={() => window.history.back()}
      className={cn("shrink-0", className)}
    >
      ← Retour
    </Button>
  );
}
