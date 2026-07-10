import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Providers } from "./providers";
import "../styles.css";

export const metadata: Metadata = {
  title: "vares - AI Creator Platform",
  description: "Affordable, community-driven AI image generation for creators and teams.",
  openGraph: {
    title: "vares - AI Creator Platform",
    description:
      "Generate, remix, and monetize AI art with a creator ecosystem built around community.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
