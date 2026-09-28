let lockedScrollY: number | null = null;

export function lockPageForSheet() {
  if (lockedScrollY !== null) {
    return;
  }

  const y = window.scrollY;
  lockedScrollY = y;
  const { body, documentElement } = document;
  documentElement.classList.add("home--sheet-scroll-lock");
  body.style.position = "fixed";
  body.style.top = `-${y}px`;
  body.style.left = "0";
  body.style.right = "0";
  body.style.width = "100%";
}

export function getSheetScrollAnchor() {
  return lockedScrollY ?? window.scrollY;
}

export function unlockPageForSheet() {
  if (lockedScrollY === null) {
    return;
  }

  const y = lockedScrollY;
  lockedScrollY = null;
  const { body, documentElement } = document;
  body.style.position = "";
  body.style.top = "";
  body.style.left = "";
  body.style.right = "";
  body.style.width = "";
  documentElement.classList.remove("home--sheet-scroll-lock");
  window.scrollTo(0, y);
}

/** Re-apply the anchor if a history update moves the page after the sheet unlocks. */
export function holdSheetScroll(y: number) {
  const restore = () => {
    if (lockedScrollY !== null) {
      return;
    }
    if (Math.abs(window.scrollY - y) > 1) {
      window.scrollTo(0, y);
    }
  };

  window.requestAnimationFrame(restore);
  window.setTimeout(restore, 0);
  window.setTimeout(restore, 100);
}
