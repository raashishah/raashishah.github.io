import { NextResponse } from "next/server";
import { getHomeContent } from "@/lib/home-content";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json(getHomeContent(), {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate",
    },
  });
}
