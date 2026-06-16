"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";

export function CalEmbedInit() {
  useEffect(() => {
    let active = true;
    (async function () {
      try {
        const cal = await getCalApi();
        if (!active) return;
        cal("ui", {
          theme: "dark",
          styles: { branding: { brandColor: "#000000" } },
        });
      } catch {}
    })();
    return () => { active = false; };
  }, []);
  return null;
}
