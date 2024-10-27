import { Section } from "@/types/template";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";
import { Button } from "../ui/button";

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
      className="flex cursor-pointer items-center rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:border-primary"
      onClick={onSelect}
    >
      <div
        {...attributes}
        {...listeners}
        className="mr-2 cursor-grab hover:text-primary"
      >
        <GripVertical size={20} />
      </div>
      <div className="flex-1">
        <h4 className="font-medium">{section.type}</h4>
        <p className="text-sm text-gray-500">
          {section.content.title || "Sans titre"}
        </p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="ml-2 text-red-500 hover:bg-red-50 hover:text-red-600"
        onClick={handleDelete}
      >
        <Trash2 size={18} />
      </Button>
    </div>
  );
}
