"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DeviceType } from "@/types/editor";
import { Monitor, Smartphone, Tablet } from "lucide-react";

interface PreviewToolbarProps {
  device: DeviceType;
  handleDeviceChange: (device: DeviceType) => void;
  className?: string;
}

export function PreviewToolbar({
  device,
  handleDeviceChange,
  className,
}: PreviewToolbarProps) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
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
