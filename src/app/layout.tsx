import { SessionProvider } from "@/components/providers/session-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { CookieConsent } from "@/components/ui/cookie-consent";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { SpeedInsights } from "@vercel/speed-insights/next";
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
      <head>
        <meta
          name="google-site-verification"
          content="GA6rQCMq0Kxq1QdxaqiousS6j-J_Ruz2yZ6Nv8SiTYE"
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          poppins.className
        )}
      >
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
            <SpeedInsights />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
