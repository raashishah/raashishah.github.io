import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/spotify", () => ({
  getSpotifyAccessToken: vi.fn(),
  fetchNowPlaying: vi.fn(),
}));

import { GET } from "./route";
import { fetchNowPlaying, getSpotifyAccessToken } from "@/lib/spotify";

const getSpotifyAccessTokenMock = vi.mocked(getSpotifyAccessToken);
const fetchNowPlayingMock = vi.mocked(fetchNowPlaying);

afterEach(() => {
  vi.clearAllMocks();
});

describe("/api/jam", () => {
  it("returns an idle payload when no Spotify token is configured", async () => {
    getSpotifyAccessTokenMock.mockResolvedValue(null);

    const response = await GET();

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ available: false, url: null });
  });

  it("returns a share URL when a track is currently playing", async () => {
    getSpotifyAccessTokenMock.mockResolvedValue("token");
    fetchNowPlayingMock.mockResolvedValue({
      isPlaying: true,
      title: "Nights",
      artist: "Frank Ocean",
      albumArtUrl: null,
      trackUri: "spotify:track:123",
    });

    const response = await GET();

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      available: true,
      url: "https://open.spotify.com/track/123",
      kind: "track_share",
    });
  });

  it("returns a 503 payload when Spotify calls fail unexpectedly", async () => {
    getSpotifyAccessTokenMock.mockRejectedValue(new Error("spotify down"));

    const response = await GET();

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({
      available: false,
      url: null,
      error: "spotify_unavailable",
    });
  });
});
