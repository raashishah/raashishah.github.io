import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  fetchNowPlaying,
  getSpotifyAccessToken,
  idleNowPlaying,
} from "./spotify";

const ORIGINAL_ENV = {
  SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REFRESH_TOKEN: process.env.SPOTIFY_REFRESH_TOKEN,
};

const ORIGINAL_FETCH = globalThis.fetch;

function jsonResponse(body: unknown, init?: ResponseInit) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "Content-Type": "application/json" },
    ...init,
  });
}

beforeEach(() => {
  process.env.SPOTIFY_CLIENT_ID = "client-id";
  process.env.SPOTIFY_CLIENT_SECRET = "client-secret";
  process.env.SPOTIFY_REFRESH_TOKEN = "refresh-token";
});

afterEach(() => {
  vi.restoreAllMocks();
  process.env.SPOTIFY_CLIENT_ID = ORIGINAL_ENV.SPOTIFY_CLIENT_ID;
  process.env.SPOTIFY_CLIENT_SECRET = ORIGINAL_ENV.SPOTIFY_CLIENT_SECRET;
  process.env.SPOTIFY_REFRESH_TOKEN = ORIGINAL_ENV.SPOTIFY_REFRESH_TOKEN;
  globalThis.fetch = ORIGINAL_FETCH;
});

describe("getSpotifyAccessToken", () => {
  it("returns null when required Spotify env vars are missing", async () => {
    delete process.env.SPOTIFY_CLIENT_ID;
    const fetchMock = vi.fn();
    globalThis.fetch = fetchMock as typeof fetch;

    await expect(getSpotifyAccessToken()).resolves.toBeNull();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns an access token when Spotify responds successfully", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      jsonResponse({ access_token: "access-token" }),
    );
    globalThis.fetch = fetchMock as typeof fetch;

    await expect(getSpotifyAccessToken()).resolves.toBe("access-token");
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://accounts.spotify.com/api/token",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          Authorization: `Basic ${Buffer.from("client-id:client-secret").toString("base64")}`,
        }),
      }),
    );
  });

  it("returns null when the token request fails or returns invalid JSON", async () => {
    const fetchMock = vi
      .fn<typeof fetch>()
      .mockRejectedValueOnce(new Error("network down"))
      .mockResolvedValueOnce(
        new Response("not-json", {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      );
    globalThis.fetch = fetchMock as typeof fetch;

    await expect(getSpotifyAccessToken()).resolves.toBeNull();
    await expect(getSpotifyAccessToken()).resolves.toBeNull();
  });
});

describe("fetchNowPlaying", () => {
  it("returns the idle state when Spotify says nothing is currently playing", async () => {
    globalThis.fetch = vi
      .fn()
      .mockResolvedValue(new Response(null, { status: 204 })) as typeof fetch;

    await expect(fetchNowPlaying("token")).resolves.toEqual(idleNowPlaying);
  });

  it("maps Spotify track data into the app's now-playing shape", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue(
      jsonResponse({
        is_playing: true,
        item: {
          name: "Nights",
          uri: "spotify:track:1",
          artists: [{ name: "Frank Ocean" }, { name: "" }, {}],
          album: { images: [{ url: "https://img.example/cover.jpg" }] },
        },
      }),
    ) as typeof fetch;

    await expect(fetchNowPlaying("token")).resolves.toEqual({
      isPlaying: true,
      title: "Nights",
      artist: "Frank Ocean",
      albumArtUrl: "https://img.example/cover.jpg",
      trackUri: "spotify:track:1",
    });
  });

  it("returns the idle state when Spotify omits a track item", async () => {
    globalThis.fetch = vi
      .fn()
      .mockResolvedValue(jsonResponse({ is_playing: true, item: null })) as typeof fetch;

    await expect(fetchNowPlaying("token")).resolves.toEqual(idleNowPlaying);
  });

  it("returns the idle state when the now-playing request fails or returns invalid JSON", async () => {
    globalThis.fetch = vi
      .fn<typeof fetch>()
      .mockRejectedValueOnce(new Error("timeout"))
      .mockResolvedValueOnce(
        new Response("not-json", {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      ) as typeof fetch;

    await expect(fetchNowPlaying("token")).resolves.toEqual(idleNowPlaying);
    await expect(fetchNowPlaying("token")).resolves.toEqual(idleNowPlaying);
  });
});
