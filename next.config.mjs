// GitHub Pages serves this project site under /Hiired, so the static export
// needs that base path — but only for the Pages build, so local `npm run dev`
// and `npm run start` stay at the root.
const isPages = process.env.GITHUB_PAGES === "true";
const repo = "/Hiired";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  images: { unoptimized: true },
  basePath: isPages ? repo : "",
  // Ensure each route is emitted as a folder with index.html (GitHub Pages friendly).
  trailingSlash: true,
};

export default nextConfig;
