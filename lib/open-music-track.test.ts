/**
 * @vitest-environment jsdom
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MUSIC_APP_FALLBACK_DELAY_MS, openMusicTrack } from "@/lib/open-music-track";

const links = {
  spotifyTrackId: "0Si6B4gh96eFsjFMplPGtJ",
  spotifyUrl: "https://open.spotify.com/track/0Si6B4gh96eFsjFMplPGtJ",
  appleMusicUrl:
    "https://music.apple.com/us/album/who-i-am-channel-tres-remix/1583616462?i=1583616467",
};

describe("openMusicTrack", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    document.body.innerHTML = "";
  });

  it("falls back to Apple Music when Spotify does not open", () => {
    const assign = vi.fn();
    Object.defineProperty(window, "location", {
      configurable: true,
      value: { assign },
    });

    openMusicTrack(links, { fallbackDelayMs: 500 });

    const iframe = document.querySelector("iframe");
    expect(iframe).not.toBeNull();
    expect(iframe?.getAttribute("src")).toBe("spotify:track:0Si6B4gh96eFsjFMplPGtJ");

    vi.advanceTimersByTime(500);

    expect(assign).toHaveBeenCalledWith(links.appleMusicUrl);
    expect(document.querySelector("iframe")).toBeNull();
  });

  it("does not fall back when the page hands off to Spotify", () => {
    const assign = vi.fn();
    Object.defineProperty(window, "location", {
      configurable: true,
      value: { assign },
    });

    openMusicTrack(links, { fallbackDelayMs: MUSIC_APP_FALLBACK_DELAY_MS });

    window.dispatchEvent(new Event("blur"));
    vi.advanceTimersByTime(MUSIC_APP_FALLBACK_DELAY_MS);

    expect(assign).not.toHaveBeenCalled();
  });
});
