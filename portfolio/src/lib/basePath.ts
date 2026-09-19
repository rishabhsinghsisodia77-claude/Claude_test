// next/image (unlike next/link) doesn't auto-prepend basePath to `src` -
// per Next.js docs, that's on us to do manually. NEXT_PUBLIC_BASE_PATH is
// set in next.config.ts only for the GitHub Pages build.
export function withBasePath(path: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}
