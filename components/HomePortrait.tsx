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
        sizes="(min-width: 40rem) 22rem, calc(100vw - 3rem)"
        className="home__portrait-image"
      />
    </figure>
  );
}
