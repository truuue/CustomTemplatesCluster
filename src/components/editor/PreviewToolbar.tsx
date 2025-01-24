"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { DeviceType } from "@/types/editor";
import { Monitor, Save, Smartphone, Tablet } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface PreviewToolbarProps {
  device: DeviceType;
  handleDeviceChange: (device: DeviceType) => void;
  className?: string;
  onSave?: () => Promise<void>;
}

export function PreviewToolbar({
  device,
  handleDeviceChange,
  className,
  onSave,
}: PreviewToolbarProps) {
  const { data: session } = useSession();
  const { toast } = useToast();
  const router = useRouter();

  const handleSave = async () => {
    if (!session) {
      toast({
        title: "Création de compte requise",
        description:
          "Créez un compte pour sauvegarder votre template. Votre travail sera automatiquement lié à votre compte.",
        action: (
          <Button variant="default" onClick={() => router.push("/login")}>
            Se connecter
          </Button>
        ),
      });
      return;
    }

    if (!onSave) return;

    try {
      await onSave();
      toast({
        title: "Succès",
        description: "Votre template a été sauvegardé",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la sauvegarde",
        variant: "destructive",
      });
    }
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="default"
            size="icon"
            className="mr-4 h-8 w-8"
            onClick={handleSave}
          >
            <Save className="size-4" />
            <span className="sr-only">Sauvegarder</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Sauvegarder</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={device === "desktop" ? "default" : "ghost"}
            size="icon"
            className="h-8 w-8"
            onClick={() => handleDeviceChange("desktop")}
          >
            <Monitor className="size-4" />
            <span className="sr-only">Vue bureau</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Vue bureau</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={device === "tablet" ? "default" : "ghost"}
            size="icon"
            className="h-8 w-8"
            onClick={() => handleDeviceChange("tablet")}
          >
            <Tablet className="size-4" />
            <span className="sr-only">Vue tablette</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Vue tablette</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={device === "mobile" ? "default" : "ghost"}
            size="icon"
            className="h-8 w-8"
            onClick={() => handleDeviceChange("mobile")}
          >
            <Smartphone className="size-4" />
            <span className="sr-only">Vue mobile</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Vue mobile</TooltipContent>
      </Tooltip>
    </div>
  );
}
