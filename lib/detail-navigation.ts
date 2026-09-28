import {
  getHrefWithDetail,
  type DetailSlug,
} from "@/lib/detail-routes";
import { holdSheetScroll, rememberScrollForDetailOpen } from "@/lib/sheet-scroll";

/** Open a detail panel in place without an App Router navigation. */
export function openDetailInPlace(slug: DetailSlug) {
  const scrollY = window.scrollY;
  const nextHref = getHrefWithDetail(window.location.href, slug);
  if (nextHref === `${window.location.pathname}${window.location.search}${window.location.hash}`) {
    return;
  }
  rememberScrollForDetailOpen();
  window.history.pushState(null, "", nextHref);
  holdSheetScroll(scrollY);
}
