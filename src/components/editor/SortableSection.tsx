import { Section } from "@/types/template";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface SortableSectionProps {
  section: Section;
  onSelect: () => void;
  onDelete: () => void;
}

export function SortableSection({
  section,
  onSelect,
  onDelete,
}: SortableSectionProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group flex cursor-pointer items-center rounded-lg border border-foreground/20 bg-background p-3 text-sm shadow-sm transition-all hover:border-primary sm:p-4 sm:text-base"
      onClick={onSelect}
    >
      <div
        {...attributes}
        {...listeners}
        className="mr-2 cursor-grab opacity-60 transition-opacity group-hover:opacity-100"
      >
        <GripVertical className="size-4 sm:size-5" />
      </div>
      <div className="flex-1 overflow-hidden">
        <h4 className="truncate font-medium capitalize">{section.type}</h4>
        <p className="truncate text-xs text-muted-foreground sm:text-sm">
          {section.content.title || "Sans titre"}
        </p>
      </div>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="ml-1 h-8 w-8 text-destructive opacity-0 transition-opacity hover:bg-destructive/10 group-hover:opacity-100 sm:ml-2 sm:h-9 sm:w-9"
            onClick={handleDelete}
          >
            <Trash2 className="size-4 sm:size-[18px]" />
            <span className="sr-only">Supprimer la section</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Supprimer la section</TooltipContent>
      </Tooltip>
    </div>
  );
}
