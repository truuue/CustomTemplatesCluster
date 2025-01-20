import { SessionProvider } from "@/components/providers/session-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { CookieConsent } from "@/components/ui/cookie-consent";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Showcaser - Créez des Landing Pages Impressionnantes",
  description:
    "Créez, personnalisez et publiez des landing pages professionnelles en quelques minutes, sans code. Templates optimisés pour la conversion.",
  keywords: "landing page, builder, création site web, sans code, templates",
  openGraph: {
    title: "Showcaser - Créez des Landing Pages Impressionnantes",
    description: "Créez des landing pages professionnelles sans code",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Showcaser",
    description: "Créez des landing pages professionnelles sans code",
    images: ["/twitter-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head />
      <body className={poppins.className}>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider>{children}</TooltipProvider>
            {/* <ChatWidget /> */}
            <CookieConsent />
            <Toaster />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
