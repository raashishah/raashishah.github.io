import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/spotify", () => ({
  idleNowPlaying: {
    isPlaying: false,
    title: "Not playing",
    artist: "",
    albumArtUrl: null,
    trackUri: null,
  },
  getSpotifyAccessToken: vi.fn(),
  fetchNowPlaying: vi.fn(),
}));

import { GET } from "./route";
import {
  fetchNowPlaying,
  getSpotifyAccessToken,
  idleNowPlaying,
} from "@/lib/spotify";

const getSpotifyAccessTokenMock = vi.mocked(getSpotifyAccessToken);
const fetchNowPlayingMock = vi.mocked(fetchNowPlaying);

afterEach(() => {
  vi.clearAllMocks();
});

describe("/api/now-playing", () => {
  it("returns the idle payload when no token is configured", async () => {
    getSpotifyAccessTokenMock.mockResolvedValue(null);

    const response = await GET();

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual(idleNowPlaying);
  });

  it("returns the active track payload when Spotify succeeds", async () => {
    getSpotifyAccessTokenMock.mockResolvedValue("token");
    fetchNowPlayingMock.mockResolvedValue({
      isPlaying: true,
      title: "Nights",
      artist: "Frank Ocean",
      albumArtUrl: "https://img.example/cover.jpg",
      trackUri: "spotify:track:1",
    });

    const response = await GET();

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      isPlaying: true,
      title: "Nights",
      artist: "Frank Ocean",
      albumArtUrl: "https://img.example/cover.jpg",
      trackUri: "spotify:track:1",
    });
  });

  it("returns a 503 payload when Spotify fails unexpectedly", async () => {
    getSpotifyAccessTokenMock.mockRejectedValue(new Error("spotify down"));

    const response = await GET();

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({
      ...idleNowPlaying,
      error: "spotify_unavailable",
    });
  });
});
