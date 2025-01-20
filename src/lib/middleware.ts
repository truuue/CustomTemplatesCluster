import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { rateLimit } from "./rate-limit";

export async function middleware(req: NextRequest) {
  // Vérifier si c'est une route API
  if (req.nextUrl.pathname.startsWith("/api/")) {
    // Rate limiting pour les routes API
    const limiter = await rateLimit(req);
    if (!limiter.success) {
      return NextResponse.json({ error: "Trop de requêtes" }, { status: 429 });
    }

    // Vérification de la taille du body pour les requêtes POST/PUT
    if (["POST", "PUT"].includes(req.method)) {
      const contentLength = req.headers.get("content-length");
      if (contentLength && parseInt(contentLength) > 1000000) {
        // 1MB
        return NextResponse.json(
          { error: "Payload trop volumineux" },
          { status: 413 }
        );
      }
    }
  }

  // Vérification de l'authentification (logique existante)
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const response = NextResponse.next();

  // Ajouter les en-têtes de sécurité
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );

  return response;
}

// Configuration des routes à protéger
export const config = {
  matcher: [
    // Routes protégées nécessitant une authentification
    "/templates/:path*",
    "/account/:path*",
    // Routes API
    "/api/:path*",
  ],
};
