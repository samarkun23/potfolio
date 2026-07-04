import type { NextConfig } from "next";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
//import rehypePrettyCode from "rehype-pretty-code";

const nextConfig: NextConfig = {
    output: "export",
    pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
    images: {
        unoptimized: true,
        remotePatterns: [
            { protocol: "https", hostname: "github-readme-stats.vercel.app" },
            { protocol: "https", hostname: "ghchart.rshah.org" },
        ],
    }
};

export default nextConfig;
