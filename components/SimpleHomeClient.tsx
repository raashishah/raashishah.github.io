"use client";

import { useEffect, useState } from "react";
import { SimpleHome } from "@/components/SimpleHome";
import type { HomeContent } from "@/lib/home-content";

type SimpleHomeClientProps = {
  initialContent: HomeContent;
};

export function SimpleHomeClient({ initialContent }: SimpleHomeClientProps) {
  const [content, setContent] = useState<HomeContent>(initialContent);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/site-content", { cache: "no-store" })
      .then((response) => response.json())
      .then((data: HomeContent) => {
        if (!cancelled) {
          setContent(data);
        }
      })
      .catch(() => {
        // Keep server-rendered content if the client fetch fails.
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return <SimpleHome {...content} />;
}
