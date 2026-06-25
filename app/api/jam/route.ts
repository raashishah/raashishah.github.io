import { NextResponse } from "next/server";
import { getSpotifyAccessToken, fetchNowPlaying } from "@/lib/spotify";

export async function GET() {
  try {
    const accessToken = await getSpotifyAccessToken();
    if (!accessToken) {
      return NextResponse.json({ available: false, url: null });
    }

    const nowPlaying = await fetchNowPlaying(accessToken);
    if (!nowPlaying.isPlaying || !nowPlaying.trackUri) {
      return NextResponse.json({ available: false, url: null });
    }

    // Spotify Jam links require session context; fallback to track share URL
    const trackId = nowPlaying.trackUri.replace("spotify:track:", "");
    const url = `https://open.spotify.com/track/${trackId}`;

    return NextResponse.json({ available: true, url, kind: "track_share" });
  } catch {
    return NextResponse.json(
      { available: false, url: null, error: "spotify_unavailable" },
      { status: 503 },
    );
  }
}
