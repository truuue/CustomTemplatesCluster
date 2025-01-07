import { Loader2 } from "lucide-react";

export function Loading() {
  return (
    <div className="flex min-h-[200px] h-screen flex-col items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="mt-2 text-gray-600">Chargement...</p>
    </div>
  );
}
