"use client";

import { Section } from "@/types/template";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

interface FooterSectionProps {
  content: {
    social?: Array<{
      href: string;
      icon: "facebook" | "twitter" | "instagram" | "linkedin";
    }>;
  } & Section["content"];
  style: Section["style"];
}

export type { FooterSectionProps };

export function FooterSection({ content, style }: FooterSectionProps) {
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
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()}. Tous droits réservés.
          </p>

          <div className="flex gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.icon}
                className="text-muted-foreground hover:text-primary"
              >
                {social.icon === "facebook" && (
                  <FaFacebook className="h-5 w-5" />
                )}
                {social.icon === "twitter" && <FaTwitter className="h-5 w-5" />}
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
      </div>
    </footer>
  );
}
