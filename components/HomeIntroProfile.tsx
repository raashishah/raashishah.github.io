import Image from "next/image";
import { CursorHeatmapSvg } from "@/components/CursorHeatmapSvg";
import { cursorProfile } from "@/content/site";

type HomeIntroProfileProps = {
  introName: string;
  introRole: string;
  introTagline: string;
  introSubline: string;
};

export function HomeIntroProfile({
  introName,
  introRole,
  introTagline,
  introSubline,
}: HomeIntroProfileProps) {
  const { avatar } = cursorProfile;

  return (
    <a
      className="home__intro-profile"
      href={cursorProfile.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${cursorProfile.label} (opens in new tab)`}
    >
      <div className="home__intro-profile-copy">
        <div className="home__intro-profile-head">
          <Image
            src={avatar.src}
            alt=""
            aria-hidden="true"
            width={avatar.width}
            height={avatar.height}
            className="home__intro-profile-avatar"
          />
          <h2 className="home__line home__line--name">
            <span className="home__intro-name">{`${introName},`}</span>
            <span className="home__intro-role">{` ${introRole}`}</span>
          </h2>
        </div>
        <div className="home__intro-profile-lede">
          <p className="home__line home__line--tagline">{introTagline}</p>
          <p className="home__line home__line--subline">{introSubline}</p>
        </div>
      </div>
      <span className="home__intro-profile-heatmap-wrap">
        <CursorHeatmapSvg />
      </span>
    </a>
  );
}
