"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Section } from "@/types/template";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

interface FooterSectionProps {
  content: Section["content"];
  style: Section["style"];
}

export function FooterSection({ content, style }: FooterSectionProps) {
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

  return (
    <footer
      style={{
        backgroundColor: style.backgroundColor,
        color: style.textColor,
        padding: style.padding || "4rem 2rem",
      }}
      className="w-full"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">{content.title}</h3>
            <p className="text-muted-foreground">{content.subtitle}</p>

            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="text-muted-foreground hover:text-primary"
                >
                  {social.icon === "facebook" && (
                    <FaFacebook className="h-5 w-5" />
                  )}
                  {social.icon === "twitter" && (
                    <FaTwitter className="h-5 w-5" />
                  )}
                  {social.icon === "instagram" && (
                    <FaInstagram className="h-5 w-5" />
                  )}
                  {social.icon === "linkedin" && (
                    <FaLinkedin className="h-5 w-5" />
                  )}
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((group, index) => (
            <div key={index} className="space-y-4">
              <h4 className="font-semibold">{group.title}</h4>
              <ul className="space-y-2">
                {group.items.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {content.companyName}. Tous droits
            réservés.
          </p>

          <div className="flex items-center gap-4">
            <Input
              type="email"
              placeholder="Votre email"
              className="max-w-xs"
            />
            <Button>S&apos;abonner</Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
