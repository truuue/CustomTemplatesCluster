"use client";

import { SortableSection } from "@/components/editor/SortableSection";
import { Section } from "@/types/template";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

interface DraggableSectionListProps {
  sections: Section[];
  onSectionsReorder: (newSections: Section[]) => void;
  onSectionSelect: (section: Section) => void;
  onSectionDelete: (section: Section) => void;
}

export function DraggableSectionList({
  sections,
  onSectionsReorder,
  onSectionSelect,
  onSectionDelete,
}: DraggableSectionListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = sections.findIndex(
        (section) => section.id === active.id
      );
      const newIndex = sections.findIndex((section) => section.id === over.id);

      const newSections = arrayMove(sections, oldIndex, newIndex);
      onSectionsReorder(newSections);
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={sections} strategy={verticalListSortingStrategy}>
        <div className="space-y-2">
          {sections.map((section) => (
            <SortableSection
              key={section.id}
              section={section}
              onSelect={() => onSectionSelect(section)}
              onDelete={() => onSectionDelete(section)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
