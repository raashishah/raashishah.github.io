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
    <div className="home__intro-profile">
      <div className="home__intro-profile-head">
        <Image
          src={avatar.src}
          alt=""
          aria-hidden="true"
          width={avatar.width}
          height={avatar.height}
          className="home__intro-profile-avatar"
        />
        <div className="home__intro-profile-stack">
          <p className="home__line home__line--name">
            <span className="home__intro-name">{`${introName},`}</span>
            <span className="home__intro-role">{` ${introRole}`}</span>
          </p>
          <p className="home__line home__line--tagline">{introTagline}</p>
        </div>
      </div>
      <p className="home__line home__line--subline">{introSubline}</p>
      <a
        className="home__intro-profile-heatmap-link"
        href={cursorProfile.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${cursorProfile.label} (opens in new tab)`}
      >
        <CursorHeatmapSvg />
      </a>
    </div>
  );
}
