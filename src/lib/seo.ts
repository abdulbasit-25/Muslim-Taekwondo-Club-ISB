import { club } from "@/content/site";

export const siteUrl = "https://muslim-taekwondo-club-isb.vercel.app";
export const socialImageUrl = `${siteUrl}/og-image.jpg`;

export const canonicalLink = (path: string) => ({
  rel: "canonical",
  href: `${siteUrl}${path}`,
});

export const meta = (title: string, description: string, path: string) => {
  const canonicalUrl = `${siteUrl}${path}`;
  const imageAlt = `${club.name} — Taekwondo and martial arts in Islamabad`;

  return [
    { title },
    { name: "description", content: description },
    { name: "robots", content: "index, follow" },
    { name: "googlebot", content: "index, follow" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: canonicalUrl },
    { property: "og:site_name", content: club.name },
    { property: "og:locale", content: "en_PK" },
    { property: "og:image", content: socialImageUrl },
    { property: "og:image:secure_url", content: socialImageUrl },
    { property: "og:image:type", content: "image/jpeg" },
    { property: "og:image:width", content: "899" },
    { property: "og:image:height", content: "899" },
    { property: "og:image:alt", content: imageAlt },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: socialImageUrl },
    { name: "twitter:image:alt", content: imageAlt },
    { name: "theme-color", content: "#ffffff" },
  ];
};
