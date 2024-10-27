"use client";

import { Section, Template } from "@/types/template";
import { ContactSection } from "../sections/ContactSection";
import { FeaturesSection } from "../sections/FeaturesSection";
import { FooterSection } from "../sections/FooterSection";
import { HeroSection } from "../sections/HeroSection";
import { PricingSection } from "../sections/PricingSection";
import { TestimonialsSection } from "../sections/TestimonialsSection";

interface TemplateRendererProps {
  template: Template;
  isEditing?: boolean;
  onSectionClick?: (section: Section) => void;
}

export function TemplateRenderer({
  template,
  isEditing = false,
  onSectionClick,
}: TemplateRendererProps) {
  const renderSection = (section: Section) => {
    const props = {
      content: section.content,
      style: section.style,
      onClick: isEditing ? () => onSectionClick?.(section) : undefined,
    };

    const sectionClasses = isEditing
      ? "cursor-pointer hover:outline hover:outline-2 hover:outline-primary hover:outline-offset-2"
      : "";

    const wrapSection = (component: React.ReactNode) => (
      <div key={section.id} className={sectionClasses}>
        {component}
      </div>
    );

    switch (section.type) {
      case "hero":
        return wrapSection(<HeroSection {...props} />);
      case "features":
        return wrapSection(<FeaturesSection {...props} />);
      case "pricing":
        return wrapSection(<PricingSection {...props} />);
      case "testimonials":
        return wrapSection(<TestimonialsSection {...props} />);
      case "contact":
        return wrapSection(<ContactSection {...props} />);
      case "footer":
        return wrapSection(<FooterSection {...props} />);
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      {template.sections.map((section) => renderSection(section))}
    </div>
  );
}
