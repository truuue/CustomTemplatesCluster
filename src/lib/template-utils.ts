import { Section } from "@/types/template";

export function generateSectionCSS(section: Section): string {
  // Générer le CSS en fonction du type de section et de son style
  const { type, style } = section;
  let css = "";

  // Styles de base pour la section
  css += `
    .section-${section.id} {
      background-color: ${style.backgroundColor || "transparent"};
      color: ${style.textColor || "inherit"};
      padding: ${style.padding || "2rem"};
    }
  `;

  // Styles spécifiques selon le type de section
  switch (type) {
    case "hero":
      css += `
        .section-${section.id} {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `;
      break;
    // Ajoutez d'autres cas pour les différents types de sections
  }

  return css;
}
