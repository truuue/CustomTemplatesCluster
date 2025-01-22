import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ContactButton, ContactContent, Section } from "@/types/template";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Plus, Save } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const SOCIAL_PRESETS = {
  twitter: {
    title: "Twitter",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/3256/3256013.png",
    shape: "circle" as const,
  },
  linkedin: {
    title: "LinkedIn",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/3536/3536505.png",
    shape: "square" as const,
  },
  github: {
    title: "GitHub",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/3291/3291695.png",
    shape: "circle" as const,
  },
  instagram: {
    title: "Instagram",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png",
    shape: "square" as const,
  },
  facebook: {
    title: "Facebook",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/733/733547.png",
    shape: "circle" as const,
  },
};

interface SortableButtonItemProps {
  button: ContactButton;
  updateButton: (id: string, field: keyof ContactButton, value: string) => void;
  removeButton: (id: string) => void;
}

function SortableButtonItem({ button, updateButton }: SortableButtonItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: button.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="grid gap-4 rounded-lg border p-4"
    >
      <div className="flex items-center justify-between">
        <div {...attributes} {...listeners}>
          <GripVertical className="h-5 w-5 cursor-grab text-gray-500" />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Titre du bouton</Label>
          <Input
            value={button.title}
            onChange={(e) => updateButton(button.id, "title", e.target.value)}
            placeholder="ex: Twitter, LinkedIn..."
          />
        </div>
        <div className="space-y-2">
          <Label>Lien</Label>
          <Input
            value={button.link}
            onChange={(e) => updateButton(button.id, "link", e.target.value)}
            placeholder="https://..."
          />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label>URL de l&apos;image</Label>
          <Input
            value={button.imageUrl}
            onChange={(e) =>
              updateButton(button.id, "imageUrl", e.target.value)
            }
            placeholder="https://... (URL de l'icône)"
          />
        </div>
        <div className="space-y-2">
          <Label>Taille</Label>
          <Select
            value={button.size}
            onValueChange={(value) => updateButton(button.id, "size", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">Petite</SelectItem>
              <SelectItem value="medium">Moyenne</SelectItem>
              <SelectItem value="large">Grande</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

interface ContactEditorProps {
  section: Section;
  onUpdate: (section: Section) => void;
}

export function ContactEditor({ section, onUpdate }: ContactEditorProps) {
  const content = section.content as ContactContent;
  const [localContent, setLocalContent] = useState<ContactContent>({
    title: content?.title || "Contactez-moi",
    subtitle: content?.subtitle || "Retrouvez-moi sur les réseaux sociaux",
    email: content?.email || "",
    buttons: content?.buttons || [],
  });

  const [localStyle] = useState({
    backgroundColor: section.style?.backgroundColor || "#ffffff",
    textColor: section.style?.textColor || "#000000",
    padding: section.style?.padding || "4rem 2rem",
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleChange = (field: string, value: string) => {
    setLocalContent((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addButton = (preset?: keyof typeof SOCIAL_PRESETS) => {
    const newButton: ContactButton = {
      id: Date.now().toString(),
      title: preset ? SOCIAL_PRESETS[preset].title : "",
      link: "",
      imageUrl: preset ? SOCIAL_PRESETS[preset].imageUrl : "",
      size: "medium",
      shape: preset ? SOCIAL_PRESETS[preset].shape : "rounded",
    };
    setLocalContent((prev) => ({
      ...prev,
      buttons: [...prev.buttons, newButton],
    }));
  };

  const updateButton = (
    id: string,
    field: keyof ContactButton,
    value: string
  ) => {
    setLocalContent((prev) => ({
      ...prev,
      buttons: prev.buttons.map((button) =>
        button.id === id ? { ...button, [field]: value } : button
      ),
    }));
  };

  const removeButton = (id: string) => {
    setLocalContent((prev) => ({
      ...prev,
      buttons: prev.buttons.filter((button) => button.id !== id),
    }));
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = localContent.buttons.findIndex(
        (button) => button.id === active.id
      );
      const newIndex = localContent.buttons.findIndex(
        (button) => button.id === over.id
      );

      setLocalContent((prev) => ({
        ...prev,
        buttons: arrayMove(prev.buttons, oldIndex, newIndex),
      }));
    }
  };

  const handleSave = () => {
    onUpdate({
      ...section,
      content: localContent,
      style: localStyle,
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Titre de la section</Label>
          <Input
            value={localContent.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="Titre de la section contact"
          />
        </div>

        <div className="space-y-2">
          <Label>Sous-titre</Label>
          <Input
            value={localContent.subtitle}
            onChange={(e) => handleChange("subtitle", e.target.value)}
            placeholder="Sous-titre de la section"
          />
        </div>

        <div className="space-y-2">
          <Label>Email de contact</Label>
          <Input
            type="email"
            value={localContent.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="votre@email.com"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Boutons de contact</Label>
          <div className="flex gap-2">
            <Select
              onValueChange={(value) =>
                addButton(value as keyof typeof SOCIAL_PRESETS)
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Ajouter un preset" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(SOCIAL_PRESETS).map(([key, preset]) => (
                  <SelectItem key={key} value={key}>
                    {preset.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="sm"
              onClick={() => addButton()}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Bouton personnalisé
            </Button>
          </div>
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={localContent.buttons.map((button) => button.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-4">
              {localContent.buttons.map((button) => (
                <SortableButtonItem
                  key={button.id}
                  button={button}
                  updateButton={updateButton}
                  removeButton={removeButton}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      <div className="mt-6 rounded-lg border bg-gray-50 p-4">
        <h3 className="mb-4 font-medium">Aperçu de la section</h3>
        <div className="space-y-2">
          <h4 className="text-lg font-semibold">{localContent.title}</h4>
          <p className="text-gray-600">{localContent.subtitle}</p>
          {localContent.email && (
            <p className="text-blue-600">{localContent.email}</p>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            {localContent.buttons.map((button) => (
              <div
                key={button.id}
                className={cn(
                  "flex items-center gap-2 border bg-white px-3 py-2",
                  button.shape === "rounded" && "rounded-md",
                  button.shape === "circle" && "rounded-full",
                  button.size === "small" && "scale-75",
                  button.size === "large" && "scale-125"
                )}
              >
                {button.imageUrl && (
                  <Image
                    src={button.imageUrl}
                    alt={button.title}
                    width={20}
                    height={20}
                    className={cn(
                      "object-contain",
                      button.size === "small" && "h-3 w-3",
                      button.size === "medium" && "h-4 w-4",
                      button.size === "large" && "h-5 w-5"
                    )}
                  />
                )}
                <span>{button.title || "Sans titre"}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Button onClick={handleSave} className="w-full gap-2">
        <Save className="h-4 w-4" />
        Enregistrer les modifications
      </Button>
    </div>
  );
}
