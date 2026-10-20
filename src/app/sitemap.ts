import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://fluxindia.in";
  const currentDate = new Date();

  const routes = [
    "",
    "/solutions",
    "/solutions/switchboard-solutions",
    "/about",
    "/contact",
    "/bom",
    "/work",
    "/blog",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
