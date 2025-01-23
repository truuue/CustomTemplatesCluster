import { Template } from "@/types/template";

export async function generateStaticHTML(template: Template): Promise<{
  html: string;
  css: string;
}> {
  const fullHTML = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${template.name}</title>
    <link href="/assets/styles.css" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=SUSE:wght@100..800&display=swap');
    </style>
    <script>
      tailwind.config = {
        theme: {
          extend: {
            colors: {
              primary: 'var(--primary)',
              secondary: 'var(--secondary)',
            },
            fontFamily: {
              sans: ['Poppins', 'sans-serif'],
            },
          }
        }
      }
    </script>
    <style>
      :root {
        --background: 60 30% 98%;
        --foreground: 220 20% 20%;
        --primary: 220 20% 20%;
        --primary-foreground: 60 30% 98%;
        --secondary: 60 20% 92%;
        --secondary-foreground: 220 20% 20%;
        --muted: 60 20% 92%;
        --muted-foreground: 220 15% 40%;
        --accent: 60 30% 92%;
        --accent-foreground: 220 20% 20%;
        --destructive: 0 84% 60%;
        --destructive-foreground: 60 30% 98%;
        --border: 60 20% 88%;
        --input: 60 20% 88%;
        --ring: 220 20% 20%;
        --radius: 0.5rem;
        --card: 0 0% 100%;
        --card-foreground: 220 20% 20%;
      }
      body {
        background-color: hsl(var(--background));
        color: hsl(var(--foreground));
        font-family: 'Poppins', sans-serif;
      }
      .bg-primary {
        background-color: hsl(var(--primary));
      }
      .text-primary {
        color: hsl(var(--primary));
      }
      .bg-secondary {
        background-color: hsl(var(--secondary));
      }
      .text-secondary {
        color: hsl(var(--secondary-foreground));
      }
      .text-muted-foreground {
        color: hsl(var(--muted-foreground));
      }
      .bg-card {
        background-color: hsl(var(--card));
      }
      .text-card-foreground {
        color: hsl(var(--card-foreground));
      }
      .border {
        border-color: hsl(var(--border));
      }
      .rounded-md {
        border-radius: var(--radius);
      }
      .shadow-sm {
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      }
      .shadow-lg {
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      }
      .hover\:bg-primary\/90:hover {
        background-color: hsl(var(--primary) / 0.9);
      }
      .hover\:bg-secondary\/90:hover {
        background-color: hsl(var(--secondary) / 0.9);
      }
      .hover\:bg-accent:hover {
        background-color: hsl(var(--accent));
      }
      .hover\:text-accent-foreground:hover {
        color: hsl(var(--accent-foreground));
      }
      .hover\:scale-105:hover {
        transform: scale(1.05);
      }
      .transition-transform {
        transition-property: transform;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 150ms;
      }
      .grid-cols-1 {
        grid-template-columns: repeat(1, minmax(0, 1fr));
      }
      .md\:grid-cols-2 {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
      .lg\:grid-cols-3 {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
      .md\:grid-cols-4 {
        grid-template-columns: repeat(4, minmax(0, 1fr));
      }
      .gap-4 {
        gap: 1rem;
      }
      .gap-8 {
        gap: 2rem;
      }
      .space-y-2 > :not([hidden]) ~ :not([hidden]) {
        margin-top: 0.5rem;
      }
      .space-y-4 > :not([hidden]) ~ :not([hidden]) {
        margin-top: 1rem;
      }
    </style>
</head>
<body class="bg-white">
    <div id="root" class="min-h-screen">
      ${template.sections
        .map((section) => {
          const content = section.content as any;
          const style = section.style || {};

          const sectionHtml = `
          <div id="${section.id}" class="section" style="background-color: ${style.backgroundColor || "transparent"}">
            ${(() => {
              switch (section.type) {
                case "header":
                  const variant = content.variant || "default";
                  const navigationLinks = template.sections
                    .filter((s) => s.type !== "header")
                    .map((s) => ({
                      label: s.type.charAt(0).toUpperCase() + s.type.slice(1),
                      href: `#${s.id}`,
                    }));

                  if (variant === "centered") {
                    return `
                      <header class="sticky top-0 z-50 w-full border-b bg-white shadow-sm" style="background-color: ${style.backgroundColor || "white"}; color: ${style.textColor || "inherit"}; padding: ${style.padding || "1rem"}">
                        <div class="container mx-auto">
                          <div class="flex flex-col items-center justify-center space-y-4">
                            ${content.logo ? `<img src="${content.logo}" alt="Logo" class="h-10 w-10 object-contain" />` : ""}
                            ${content.companyName ? `<h1 class="text-2xl font-bold tracking-tight text-gray-800">${content.companyName}</h1>` : ""}
                            <nav class="mt-4">
                              <ul class="flex items-center space-x-8">
                                ${navigationLinks
                                  .map(
                                    (link) => `
                                  <li>
                                    <a href="${link.href}" class="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900">
                                      ${link.label}
                                    </a>
                                  </li>
                                `
                                  )
                                  .join("")}
                              </ul>
                            </nav>
                          </div>
                        </div>
                      </header>
                    `;
                  }

                  return `
                    <header class="sticky top-0 z-50 w-full border-b bg-white shadow-sm" style="background-color: ${style.backgroundColor || "white"}; color: ${style.textColor || "inherit"}; padding: ${style.padding || "1rem"}">
                      <div class="container mx-auto">
                        <div class="flex items-center justify-between">
                          <div class="flex items-center space-x-4">
                            ${content.logo ? `<img src="${content.logo}" alt="Logo" class="h-10 w-10 object-contain" />` : ""}
                            ${content.companyName ? `<h1 class="text-xl font-bold tracking-tight text-gray-800">${content.companyName}</h1>` : ""}
                          </div>
                          <nav class="hidden md:flex">
                            <ul class="flex items-center space-x-8">
                              ${navigationLinks
                                .map(
                                  (link) => `
                                <li>
                                  <a href="${link.href}" class="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900">
                                    ${link.label}
                                  </a>
                                </li>
                              `
                                )
                                .join("")}
                            </ul>
                          </nav>
                        </div>
                      </div>
                    </header>
                  `;
                case "hero":
                  const buttonVariantClasses = {
                    primary:
                      "inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-[hsl(var(--primary))] px-4 py-2 text-sm font-medium text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary)/0.9)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[hsl(var(--ring))]",
                    secondary:
                      "inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-[hsl(var(--secondary))] px-4 py-2 text-sm font-medium text-[hsl(var(--secondary-foreground))] hover:bg-[hsl(var(--secondary)/0.9)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[hsl(var(--ring))]",
                    outline:
                      "inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md border border-[hsl(var(--input))] bg-transparent px-4 py-2 text-sm font-medium hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[hsl(var(--ring))]",
                  };

                  return `
                    <section
                      style="background-color: ${style.backgroundColor || "transparent"}; color: ${style.textColor || "inherit"}; padding: ${style.padding || "0"}"
                      class="flex min-h-[70vh] items-center justify-center transition-all duration-300 ${
                        style.layout === "left"
                          ? "text-left"
                          : style.layout === "right"
                            ? "text-right"
                            : "text-center"
                      }"
                    >
                      <div class="container mx-auto max-w-6xl">
                        <h1 class="mb-6 text-5xl font-bold leading-tight lg:text-6xl" style="color: ${style.textColor || "inherit"}">
                          ${content.title || ""}
                        </h1>
                        ${
                          content.subtitle
                            ? `
                          <p class="mb-8 text-xl lg:text-2xl text-[hsl(var(--muted-foreground))]">
                            ${content.subtitle}
                          </p>
                        `
                            : ""
                        }
                        ${
                          content.buttons
                            ? `
                          <div class="flex ${style.layout === "center" ? "justify-center" : style.layout === "right" ? "justify-end" : "justify-start"} gap-4">
                            ${content.buttons
                              .map(
                                (button: {
                                  text: string;
                                  url: string;
                                  variant: "primary" | "secondary" | "outline";
                                }) => `
                              <a
                                href="${button.url}"
                                class="${buttonVariantClasses[button.variant]}"
                              >
                                ${button.text}
                              </a>
                            `
                              )
                              .join("")}
                          </div>
                        `
                            : ""
                        }
                      </div>
                    </section>
                  `;
                case "features":
                  return `
                    <section
                      style="background-color: ${style.backgroundColor || "transparent"}; color: ${style.textColor || "inherit"}; padding: ${style.padding || "4rem 2rem"}"
                      class="w-full ${style.layout === "center" ? "text-center" : ""}"
                    >
                      <div class="container mx-auto flex max-w-6xl flex-col items-center">
                        ${
                          content.title
                            ? `
                          <h2 class="mb-12 text-4xl font-bold">${content.title}</h2>
                        `
                            : ""
                        }
                        ${
                          content.subtitle
                            ? `
                          <p class="mb-16 text-xl text-muted-foreground">${content.subtitle}</p>
                        `
                            : ""
                        }
                        <div class="grid w-full gap-8 md:grid-cols-2 lg:grid-cols-3">
                          ${content.features
                            ?.map(
                              (feature: any) => `
                            <div class="bg-card rounded-lg border p-6 shadow-sm">
                              <div class="w-full text-center">
                                ${
                                  feature.icon
                                    ? `
                                  <div class="mb-4 text-4xl text-primary">${feature.icon}</div>
                                `
                                    : ""
                                }
                                <h3 class="text-lg font-semibold">${feature.title}</h3>
                                <p class="text-muted-foreground">${feature.description}</p>
                              </div>
                            </div>
                          `
                            )
                            .join("")}
                        </div>
                      </div>
                    </section>
                  `;
                case "pricing":
                  const plans = content.pricing || [];
                  return `
                    <section
                      style="background-color: ${style.backgroundColor || "transparent"}; color: ${style.textColor || "inherit"}; padding: ${style.padding || "4rem 2rem"}"
                      class="w-full ${style.layout === "center" ? "text-center" : ""}"
                    >
                      <div class="container mx-auto max-w-6xl">
                        <div class="mb-12 space-y-4 text-center">
                          <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">${content.title || ""}</h2>
                          ${
                            content.subtitle
                              ? `
                            <p class="mx-auto max-w-2xl text-muted-foreground">${content.subtitle}</p>
                          `
                              : ""
                          }
                        </div>

                        <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                          ${plans
                            .map(
                              (plan: any) => `
                            <div class="relative flex flex-col rounded-xl border ${plan.isPopular ? "border-primary shadow-lg" : "bg-card"} p-6">
                              ${
                                plan.isPopular
                                  ? `
                                <div class="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-sm text-primary-foreground">
                                  <span class="flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-3 w-3"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                    Plus populaire
                                  </span>
                                </div>
                              `
                                  : ""
                              }
                              <div class="mb-5">
                                <h3 class="text-2xl font-bold">${plan.title}</h3>
                                <p class="text-muted-foreground">${plan.description}</p>
                              </div>
                              <div class="mb-5">
                                <span class="text-4xl font-bold">${plan.price}</span>
                                <span class="text-muted-foreground">/mois</span>
                              </div>
                              <ul class="mb-8 space-y-4 flex-grow">
                                ${plan.features
                                  ?.map(
                                    (feature: string) => `
                                  <li class="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 text-primary"><polyline points="20 6 9 17 4 12"/></svg>
                                    <span>${feature}</span>
                                  </li>
                                `
                                  )
                                  .join("")}
                              </ul>
                              <a
                                href="${plan.buttonUrl || "#"}"
                                class="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 w-full ${
                                  plan.buttonVariant === "primary" ||
                                  plan.isPopular
                                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                    : plan.buttonVariant === "secondary"
                                      ? "bg-secondary text-secondary-foreground hover:bg-secondary/90"
                                      : "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                                }"
                              >
                                ${plan.buttonText || "Commencer maintenant"}
                              </a>
                            </div>
                          `
                            )
                            .join("")}
                        </div>
                      </div>
                    </section>
                  `;
                case "testimonials":
                  return `
                    <section
                      style="background-color: ${style.backgroundColor || "transparent"}; color: ${style.textColor || "inherit"}; padding: ${style.padding || "4rem 2rem"}"
                      class="w-full"
                    >
                      <div class="container mx-auto max-w-6xl">
                        <div class="mb-12 text-center">
                          <h2 class="mb-4 text-3xl font-bold">${content.title || ""}</h2>
                          ${
                            content.subtitle
                              ? `
                            <p class="text-xl text-muted-foreground">${content.subtitle}</p>
                          `
                              : ""
                          }
                        </div>

                        ${
                          style.layout === "list"
                            ? `
                          <div class="space-y-6">
                        `
                            : style.layout === "carousel"
                              ? `
                          <div class="relative">
                            <div class="overflow-hidden">
                              <div class="flex">
                        `
                              : `
                          <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        `
                        }

                        ${content.testimonials
                          ?.map(
                            (testimonial: any) => `
                          <div class="${style.layout === "carousel" ? "w-full flex-shrink-0 px-4" : ""}">
                            <div class="relative h-full rounded-xl border bg-card p-6">
                              <div class="absolute right-4 top-4 h-8 w-8 text-muted-foreground opacity-20">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>
                              </div>
                              <div class="flex items-center gap-4">
                                <div class="relative h-10 w-10 overflow-hidden rounded-full">
                                  ${
                                    testimonial.avatar
                                      ? `
                                    <img src="${testimonial.avatar}" alt="${testimonial.name}" class="h-full w-full object-cover" />
                                  `
                                      : `
                                    <div class="flex h-full w-full items-center justify-center bg-primary text-primary-foreground">
                                      ${testimonial.name
                                        .split(" ")
                                        .map((n: string) => n[0])
                                        .join("")}
                                    </div>
                                  `
                                  }
                                </div>
                                <div>
                                  <h4 class="font-semibold">${testimonial.name}</h4>
                                  <p class="text-sm text-muted-foreground">${testimonial.title}</p>
                                </div>
                              </div>
                              <div class="mt-4">
                                <p class="text-muted-foreground">${testimonial.content}</p>
                                ${
                                  testimonial.rating
                                    ? `
                                  <div class="mt-4">${"⭐".repeat(testimonial.rating)}</div>
                                `
                                    : ""
                                }
                              </div>
                            </div>
                          </div>
                        `
                          )
                          .join("")}
                        </div>

                        ${
                          style.layout === "carousel" &&
                          (content.testimonials?.length || 0) > 1
                            ? `
                          <div class="mt-8 flex justify-center gap-4">
                            <button class="inline-flex h-10 w-10 items-center justify-center whitespace-nowrap rounded-md border bg-background text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="m15 18-6-6 6-6"/></svg>
                            </button>
                            <button class="inline-flex h-10 w-10 items-center justify-center whitespace-nowrap rounded-md border bg-background text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="m9 18 6-6-6-6"/></svg>
                            </button>
                          </div>
                        `
                            : ""
                        }
                      </div>
                    </section>
                  `;
                case "contact":
                  return `
                    <section class="w-full" style="background-color: ${style.backgroundColor || "transparent"}; color: ${style.textColor || "inherit"}; padding: ${style.padding || "4rem 2rem"}">
                      <div class="container mx-auto px-4 py-12">
                        <div class="mx-auto max-w-2xl text-center">
                          ${
                            content.title
                              ? `
                            <h2 class="mb-4 text-3xl font-bold tracking-tight">${content.title}</h2>
                          `
                              : ""
                          }
                          ${
                            content.subtitle
                              ? `
                            <p class="mb-8 text-lg text-muted-foreground">${content.subtitle}</p>
                          `
                              : ""
                          }
                          ${
                            content.email
                              ? `
                            <a href="mailto:${content.email}" class="mb-8 inline-block text-lg text-primary hover:underline">
                              ${content.email}
                            </a>
                          `
                              : ""
                          }
                          ${
                            content.buttons && content.buttons.length > 0
                              ? `
                            <div class="mt-6 flex flex-wrap justify-center gap-4">
                              ${content.buttons
                                .map(
                                  (button: any) => `
                                <a
                                  href="${button.link}"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  class="flex items-center gap-2 border bg-white px-4 py-2 transition-transform hover:scale-105 ${
                                    button.shape === "rounded"
                                      ? "rounded-md"
                                      : button.shape === "circle"
                                        ? "rounded-full"
                                        : ""
                                  } ${
                                    button.size === "small"
                                      ? "scale-90"
                                      : button.size === "large"
                                        ? "scale-110"
                                        : ""
                                  }"
                                >
                                  ${
                                    button.imageUrl
                                      ? `
                                    <img
                                      src="${button.imageUrl}"
                                      alt="${button.title}"
                                      class="object-contain ${
                                        button.size === "small"
                                          ? "h-4 w-4"
                                          : button.size === "medium"
                                            ? "h-5 w-5"
                                            : button.size === "large"
                                              ? "h-6 w-6"
                                              : ""
                                      }"
                                    />
                                  `
                                      : ""
                                  }
                                  <span class="font-medium">${button.title}</span>
                                </a>
                              `
                                )
                                .join("")}
                            </div>
                          `
                              : ""
                          }
                        </div>
                      </div>
                    </section>
                  `;
                case "footer":
                  const footerLinks = content.links || [
                    {
                      title: "Produit",
                      items: [
                        { label: "Fonctionnalités", href: "#" },
                        { label: "Tarifs", href: "#" },
                        { label: "FAQ", href: "#" },
                      ],
                    },
                    {
                      title: "Entreprise",
                      items: [
                        { label: "À propos", href: "#" },
                        { label: "Blog", href: "#" },
                        { label: "Carrières", href: "#" },
                      ],
                    },
                    {
                      title: "Légal",
                      items: [
                        { label: "Confidentialité", href: "#" },
                        { label: "CGU", href: "#" },
                        { label: "Mentions légales", href: "#" },
                      ],
                    },
                  ];

                  const socialLinks = content.social || [
                    { icon: "facebook", url: "#" },
                    { icon: "twitter", url: "#" },
                    { icon: "instagram", url: "#" },
                    { icon: "linkedin", url: "#" },
                  ];

                  return `
                    <footer
                      style="background-color: ${style.backgroundColor || "transparent"}; color: ${style.textColor || "inherit"}; padding: ${style.padding || "4rem 2rem"}"
                      class="w-full"
                    >
                      <div class="container mx-auto max-w-6xl">
                        <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                          <div class="space-y-4">
                            <h3 class="text-lg font-bold">${content.title || ""}</h3>
                            <p class="text-muted-foreground">${content.subtitle || ""}</p>

                            <div class="flex gap-4">
                              ${socialLinks
                                .map(
                                  (social: { icon: string; url: string }) => `
                                <a
                                  href="${social.url}"
                                  class="text-muted-foreground hover:text-primary"
                                >
                                  ${
                                    social.icon === "facebook"
                                      ? `
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                                  `
                                      : social.icon === "twitter"
                                        ? `
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                                  `
                                        : social.icon === "instagram"
                                          ? `
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                                  `
                                          : social.icon === "linkedin"
                                            ? `
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>
                                  `
                                            : ""
                                  }
                                </a>
                              `
                                )
                                .join("")}
                            </div>
                          </div>

                          ${footerLinks
                            .map(
                              (group: {
                                title: string;
                                items: Array<{ label: string; href: string }>;
                              }) => `
                            <div class="space-y-4">
                              <h4 class="font-semibold">${group.title}</h4>
                              <ul class="space-y-2">
                                ${group.items
                                  .map(
                                    (link: { label: string; href: string }) => `
                                  <li>
                                    <a
                                      href="${link.href}"
                                      class="text-muted-foreground hover:text-primary"
                                    >
                                      ${link.label}
                                    </a>
                                  </li>
                                `
                                  )
                                  .join("")}
                              </ul>
                            </div>
                          `
                            )
                            .join("")}
                        </div>

                        <div class="my-8 h-px bg-[hsl(var(--border))]"></div>

                        <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                          <p class="text-sm text-muted-foreground">
                            © ${new Date().getFullYear()} ${content.companyName || ""}. Tous droits réservés.
                          </p>

                          <div class="flex items-center gap-4">
                            <input
                              type="email"
                              placeholder="Votre email"
                              class="h-10 rounded-md border border-[hsl(var(--input))] bg-[hsl(var(--background))] px-3 py-2 text-sm ring-offset-[hsl(var(--background))] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[hsl(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-w-xs"
                            />
                            <button class="inline-flex h-10 items-center justify-center rounded-md bg-[hsl(var(--primary))] px-4 py-2 text-sm font-medium text-[hsl(var(--primary-foreground))] ring-offset-[hsl(var(--background))] transition-colors hover:bg-[hsl(var(--primary)/0.9)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                              S'abonner
                            </button>
                          </div>
                        </div>
                      </div>
                    </footer>
                  `;
                case "stats":
                  return `
                    <section
                      style="background-color: ${style.backgroundColor || "transparent"}; color: ${style.textColor || "inherit"}; padding: ${style.padding || "6rem 2rem"}"
                      class="relative w-full overflow-hidden"
                    >
                      <div class="bg-grid-pattern absolute inset-0 opacity-[0.03]"></div>
                      <div class="container relative">
                        ${
                          content.title
                            ? `
                          <h2 class="mb-12 text-4xl font-bold text-center">${content.title}</h2>
                        `
                            : ""
                        }
                        ${
                          content.subtitle
                            ? `
                          <p class="mb-16 text-xl text-muted-foreground text-center">${content.subtitle}</p>
                        `
                            : ""
                        }
                        <div class="grid gap-8 md:grid-cols-4">
                          ${content.stats
                            ?.map(
                              (stat: {
                                value: string;
                                suffix?: string;
                                label: string;
                              }) => `
                            <div class="group relative overflow-hidden rounded-xl border bg-card p-8 text-center">
                              <div class="relative space-y-2">
                                <h3 class="text-4xl font-bold tracking-tight">
                                  ${stat.value}${stat.suffix || ""}
                                </h3>
                                <p class="text-muted-foreground">${stat.label}</p>
                              </div>
                            </div>
                          `
                            )
                            .join("")}
                        </div>
                      </div>
                    </section>
                  `;
                default:
                  return "";
              }
            })()}
          </div>
        `;
          return sectionHtml;
        })
        .join("")}
    </div>
    <script src="/assets/js/runtime.js"></script>
  </body>
</html>
`;

  // CSS de base
  const css = `
:root {
  --primary: #0070f3;
  --secondary: #1a1a1a;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.section {
  width: 100%;
}

/* Styles pour les formulaires */
input, textarea {
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

input:focus, textarea:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(0, 112, 243, 0.1);
}

/* Styles pour les boutons */
button {
  cursor: pointer;
  transition: all 0.2s;
}

button:hover {
  transform: translateY(-1px);
}

/* Styles pour les images */
img {
  max-width: 100%;
  height: auto;
}
`;

  return {
    html: fullHTML,
    css,
  };
}
