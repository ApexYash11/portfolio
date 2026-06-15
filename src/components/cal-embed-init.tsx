"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";

export function CalEmbedInit() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        theme: "dark",
        styles: { branding: { brandColor: "#000000" } },
      });
    })();
  }, []);
  return null;
}
