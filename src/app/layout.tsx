import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Samar Kun — Systems & Full-Stack Craftsman (無心)",
  description:
    "Self-taught developer forging low-latency Rust trading systems, real-time distributed platforms, and full-stack web applications.",
  keywords: [
    "Samar Kun",
    "Systems Engineer",
    "Rust",
    "High Frequency Trading",
    "Orderbook",
    "Distributed Systems",
    "Next.js",
    "WebSockets",
    "TypeScript",
  ],
  authors: [{ name: "Samar Kun" }],
  openGraph: {
    title: "Samar Kun — Systems & Full-Stack Craftsman (無心)",
    description:
      "Forging low-latency systems, real-time architecture, and Rust trading infrastructure with razor-sharp precision.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-background text-text antialiased selection:bg-crimson/25 selection:text-white">
        {children}
      </body>
    </html>
  );
}
