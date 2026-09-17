import Image from "next/image";
import { homePortrait } from "@/content/site";

export function HomePortrait() {
  return (
    <figure className="home__portrait">
      <Image
        src={homePortrait.src}
        alt={homePortrait.alt}
        width={homePortrait.width}
        height={homePortrait.height}
        sizes="(min-width: 40rem) 15rem, calc((100vw - 3rem) * 0.7)"
        className="home__portrait-image"
      />
    </figure>
  );
}
