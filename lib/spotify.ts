import type { NowPlaying } from "@/content/types";

export const idleNowPlaying: NowPlaying = {
  isPlaying: false,
  title: "Not playing",
  artist: "",
  albumArtUrl: null,
  trackUri: null,
};

export async function getSpotifyAccessToken(): Promise<string | null> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) return null;

  const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    next: { revalidate: 3000 },
  });

  if (!tokenRes.ok) return null;

  const data = (await tokenRes.json()) as { access_token: string };
  return data.access_token;
}

export async function fetchNowPlaying(accessToken: string): Promise<NowPlaying> {
  const nowRes = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
    headers: { Authorization: `Bearer ${accessToken}` },
    next: { revalidate: 30 },
  });

  if (nowRes.status === 204 || !nowRes.ok) return idleNowPlaying;

  const data = await nowRes.json();
  const track = data.item;

  if (!track) return idleNowPlaying;

  return {
    isPlaying: data.is_playing ?? false,
    title: track.name ?? "Unknown",
    artist: track.artists?.map((a: { name: string }) => a.name).join(", ") ?? "",
    albumArtUrl: track.album?.images?.[0]?.url ?? null,
    trackUri: track.uri ?? null,
  };
}
