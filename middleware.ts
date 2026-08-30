import { NextResponse, type NextRequest } from "next/server";

const legacyHosts = new Set(["raashishah.com", "www.raashishah.com"]);

export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase();

  if (!host || !legacyHosts.has(host)) {
    return NextResponse.next();
  }

  const destination = request.nextUrl.clone();
  destination.protocol = "https:";
  destination.host = "decavalent.com";

  return NextResponse.redirect(destination, 308);
}

export const config = {
  matcher: "/:path*",
};
