import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Uneeb Bhatti — Full-stack Developer",
  description:
    "Full-stack developer building products with Next.js, TypeScript and AI.",
  metadataBase: new URL("https://uneebbhatti.vercel.app"),
  openGraph: {
    title: "Uneeb Bhatti",
    description:
      "Full-stack developer building products with Next.js, TypeScript and AI.",
    type: "website",
  },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrains.variable} scroll-smooth scroll-pt-[calc(env(safe-area-inset-top,0px)+70px)]`}
    >
      <body className="overflow-x-hidden bg-bg pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)] font-sans text-base leading-[1.6] text-fg antialiased">
        {children}
      </body>
    </html>
  );
}
