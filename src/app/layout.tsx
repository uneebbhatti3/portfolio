import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";

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

const siteUrl = "https://uneebbhatti.vercel.app/";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Uneeb Bhatti | Full-Stack Developer — Next.js, TypeScript & AI",
    template: "%s | Uneeb Bhatti",
  },

  description:
    "Full-stack developer based in Lahore, Pakistan, building production-focused web applications with Next.js, TypeScript, Node.js, PostgreSQL and AI integrations, with an emphasis on backend systems, product engineering and reliable user experiences.",

  applicationName: "Uneeb Bhatti",

  authors: [
    {
      name: "Uneeb Bhatti",
      url: siteUrl,
    },
  ],

  creator: "Uneeb Bhatti",
  publisher: "Uneeb Bhatti",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Uneeb Bhatti",
    title: "Uneeb Bhatti | Full-Stack Developer",
    description:
      "Full-stack developer in Lahore, Pakistan building web products with Next.js, TypeScript, Node.js and AI integrations.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Uneeb Bhatti — Full-Stack Developer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Uneeb Bhatti | Full-Stack Developer",
    description:
      "Full-stack developer building web products with Next.js, TypeScript, Node.js and AI integrations.",
    images: ["/opengraph-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Uneeb Bhatti",
  url: siteUrl,
  jobTitle: "Full-Stack Developer",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lahore",
    addressCountry: "PK",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "University of Management and Technology",
  },
  sameAs: [
    "https://github.com/uneebbhatti3",
    "https://www.linkedin.com/in/uneeb-bhatti/",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Uneeb Bhatti",
  url: siteUrl,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrains.variable} scroll-smooth scroll-pt-[calc(env(safe-area-inset-top,0px)+70px)]`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="overflow-x-hidden bg-bg pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)] font-sans text-base leading-[1.6] text-fg antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
        {clarityId && (
          <Script id="microsoft-clarity" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://clarity.ms"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${clarityId}");
            `}
          </Script>
        )}
      </body>
    </html>
  );
}
