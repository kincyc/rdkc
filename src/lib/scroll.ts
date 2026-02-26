import { siteConfig } from "@/config/siteConfig";

export function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({
    behavior: siteConfig.scroll.smoothScroll ? "smooth" : "auto",
    block: "start",
  });
}