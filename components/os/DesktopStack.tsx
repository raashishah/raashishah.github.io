"use client";

import Image from "next/image";
import { useOS } from "./OSProvider";

export function PhotosStack({ onClick }: { onClick?: () => void }) {
  return (
    <button type="button" className="desktop-stack" onClick={onClick} aria-label="Photos, open About">
      <div className="desktop-stack__layers">
        <Image
          src="/img/pro.jpeg"
          alt=""
          width={56}
          height={56}
          className="desktop-stack__img"
        />
        <Image
          src="/img/casual.jpeg"
          alt=""
          width={56}
          height={56}
          className="desktop-stack__img"
        />
      </div>
      <span className="desktop-stack__label">Photos</span>
    </button>
  );
}

export function ConnectStack({ onClick }: { onClick?: () => void }) {
  const { setConnectOpen } = useOS();

  return (
    <button
      type="button"
      className="desktop-stack"
      onClick={onClick ?? (() => setConnectOpen(true))}
      aria-label="Connect"
    >
      <div className="desktop-stack__layers desktop-stack__layers--connect">
        <div className="desktop-stack__connect-mark" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </div>
      <span className="desktop-stack__label">Connect</span>
    </button>
  );
}
