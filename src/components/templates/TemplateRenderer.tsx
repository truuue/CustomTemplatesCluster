"use client";

import { PricingContent, Section, Template } from "@/types/template";
import {
  ContactSection,
  type ContactSectionProps,
} from "../sections/ContactSection";
import {
  FeaturesSection,
  type FeaturesSectionContent,
} from "../sections/FeaturesSection";
import {
  FooterSection,
  type FooterSectionProps,
} from "../sections/FooterSection";
import {
  HeaderSection,
  type HeaderSectionProps,
} from "../sections/HeaderSection";
import { HeroSection, type HeroSectionProps } from "../sections/HeroSection";
import { PricingComparisonSection } from "../sections/PricingComparisonSection";
import { PricingModernSection } from "../sections/PricingModernSection";
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
      sections: template.sections,
    };

    const sectionClasses = isEditing
      ? "cursor-pointer hover:outline hover:outline-2 hover:outline-primary hover:outline-offset-2"
      : "";

    const wrapSection = (component: React.ReactNode) => {
      const sectionContent = component as JSX.Element;
      const html = sectionContent?.props?.children?.toString() || "";

      return (
        <div
          key={section.id}
          id={section.id}
          className={sectionClasses}
          data-html={html}
        >
          {component}
        </div>
      );
    };

    switch (section.type) {
      case "header":
        const headerProps = {
          content: section.content as HeaderSectionProps["content"],
          style: section.style,
          onClick: isEditing ? () => onSectionClick?.(section) : undefined,
          sections: template.sections,
        };
        return wrapSection(<HeaderSection {...headerProps} />);
      case "hero":
        const heroProps = {
          content: section.content as HeroSectionProps["content"],
          style: section.style,
          onClick: isEditing ? () => onSectionClick?.(section) : undefined,
          sections: template.sections,
        };
        return wrapSection(<HeroSection {...heroProps} />);
      case "features":
        if ("features" in section.content) {
          return wrapSection(
            <FeaturesSection
              content={section.content as FeaturesSectionContent}
              style={section.style}
            />
          );
        }
        return null;
      case "pricing": {
        const pricingContent = section.content as PricingContent;
        const pricingProps = {
          content: pricingContent,
          style: section.style,
          onClick: props.onClick,
        };
        return wrapSection(
          pricingContent.variant === "modern" ? (
            <PricingModernSection {...pricingProps} />
          ) : (
            <PricingComparisonSection {...pricingProps} />
          )
        );
      }
      case "testimonials":
        return wrapSection(<TestimonialsSection {...props} />);
      case "contact":
        const contactProps = {
          content: section.content as ContactSectionProps["content"],
          style: section.style,
          onClick: isEditing ? () => onSectionClick?.(section) : undefined,
        };
        return wrapSection(<ContactSection {...contactProps} />);
      case "footer":
        const footerProps = {
          content: section.content as FooterSectionProps["content"],
          style: section.style,
          onClick: isEditing ? () => onSectionClick?.(section) : undefined,
          sections: template.sections,
        };
        return wrapSection(<FooterSection {...footerProps} />);
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
