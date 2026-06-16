import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Samar Kun — Full Stack Developer",
  description:
    "Self-taught developer building full-stack applications, real-time systems, automation platforms, and Rust trading infrastructure.",
  keywords: [
    "Samar Kun",
    "Full Stack Developer",
    "Rust",
    "Next.js",
    "Web3",
    "TypeScript",
  ],
  authors: [{ name: "Samar Kun" }],
  openGraph: {
    title: "Samar Kun — Full Stack Developer",
    description:
      "Self-taught developer building full-stack applications, real-time systems, and Rust trading infrastructure.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-text antialiased">{children}</body>
    </html>
  );
}
