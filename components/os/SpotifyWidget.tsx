"use client";

import { useOS } from "./OSProvider";

export function SpotifyWidget() {
  const { nowPlaying, easterEggActive } = useOS();

  return (
    <article
      className={`widget widget--spotify glass ${easterEggActive ? "spotify-widget--easter-egg" : ""}`}
      aria-label="Spotify Now Playing"
    >
      <div className="spotify-widget__art">
        {nowPlaying.albumArtUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={nowPlaying.albumArtUrl} alt="" />
        ) : (
          <span className="spotify-widget__art-placeholder" aria-hidden="true">
            ♫
          </span>
        )}
      </div>
      <div className="spotify-widget__meta">
        <div>
          <p className="spotify-widget__track">{nowPlaying.title}</p>
          {nowPlaying.artist ? (
            <p className="spotify-widget__artist">{nowPlaying.artist}</p>
          ) : null}
        </div>
        {nowPlaying.isPlaying ? (
          <span className="spotify-widget__indicator" aria-label="Playing">
            ♫
          </span>
        ) : null}
      </div>
    </article>
  );
}
