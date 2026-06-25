import { NextResponse } from "next/server";
import { idleNowPlaying, getSpotifyAccessToken, fetchNowPlaying } from "@/lib/spotify";

export async function GET() {
  try {
    const accessToken = await getSpotifyAccessToken();
    if (!accessToken) return NextResponse.json(idleNowPlaying);

    const payload = await fetchNowPlaying(accessToken);
    return NextResponse.json(payload);
  } catch {
    return NextResponse.json(
      { ...idleNowPlaying, error: "spotify_unavailable" },
      { status: 503 },
    );
  }
}
