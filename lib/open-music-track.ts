export type MusicTrackLinks = {
  spotifyTrackId: string;
  spotifyUrl: string;
  appleMusicUrl: string;
};

export const MUSIC_APP_FALLBACK_DELAY_MS = 1500;

export function openMusicTrack(
  { spotifyTrackId, appleMusicUrl }: Pick<MusicTrackLinks, "spotifyTrackId" | "appleMusicUrl">,
  options?: { fallbackDelayMs?: number },
) {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return;
  }

  const fallbackDelayMs = options?.fallbackDelayMs ?? MUSIC_APP_FALLBACK_DELAY_MS;
  let appOpened = false;

  const markOpened = () => {
    appOpened = true;
  };

  const onVisibilityChange = () => {
    if (document.hidden) {
      markOpened();
    }
  };

  document.addEventListener("visibilitychange", onVisibilityChange);
  window.addEventListener("pagehide", markOpened);
  window.addEventListener("blur", markOpened);

  const iframe = document.createElement("iframe");
  iframe.style.display = "none";
  iframe.src = `spotify:track:${spotifyTrackId}`;
  document.body.appendChild(iframe);

  window.setTimeout(() => {
    document.removeEventListener("visibilitychange", onVisibilityChange);
    window.removeEventListener("pagehide", markOpened);
    window.removeEventListener("blur", markOpened);
    iframe.remove();

    if (!appOpened) {
      window.location.assign(appleMusicUrl);
    }
  }, fallbackDelayMs);
}
