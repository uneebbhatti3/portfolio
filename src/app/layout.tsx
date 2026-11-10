import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import './marquee.css';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from 'next/script';
import {
  lastUpdated,
  siteDescription,
  siteUrl,
  skillGroups,
  socialLinks,
} from '@/lib/data';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});
const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

const siteTitle = 'Uneeb Bhatti | Full-Stack Developer, Next.js & AI Agents';

// Date of the first commit in this repository.
const siteCreated = '2026-08-13';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: siteTitle,
    template: '%s | Uneeb Bhatti',
  },

  description: siteDescription,

  applicationName: 'Uneeb Bhatti',

  authors: [
    {
      name: 'Uneeb Bhatti',
      url: `${siteUrl}/`,
    },
  ],

  creator: 'Uneeb Bhatti',
  publisher: 'Uneeb Bhatti',

  alternates: {
    canonical: '/',
  },

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${siteUrl}/`,
    siteName: 'Uneeb Bhatti',
    title: siteTitle,
    description: siteDescription,
  },

  // Images come from the opengraph-image / twitter-image file conventions in
  // src/app, which take priority over config and carry their own dimensions.
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
  },

  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  category: 'technology',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

// One connected graph lets search engines and AI crawlers resolve the page,
// the site and the person as the same entity.
const personId = `${siteUrl}/#person`;
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      name: 'Uneeb Bhatti',
      url: `${siteUrl}/`,
      inLanguage: 'en',
      publisher: { '@id': personId },
    },
    {
      '@type': 'ProfilePage',
      '@id': `${siteUrl}/#profile`,
      url: `${siteUrl}/`,
      name: siteTitle,
      description: siteDescription,
      dateCreated: siteCreated,
      dateModified: lastUpdated,
      isPartOf: { '@id': `${siteUrl}/#website` },
      mainEntity: { '@id': personId },
    },
    {
      '@type': 'Person',
      '@id': personId,
      name: 'Uneeb Bhatti',
      url: `${siteUrl}/`,
      image: `${siteUrl}/me.jpeg`,
      jobTitle: 'Full-Stack Developer',
      description: siteDescription,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Lahore',
        addressCountry: 'PK',
      },
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'University of Management and Technology',
      },
      knowsAbout: skillGroups.flatMap((group) =>
        group.items.map((item) => item.label),
      ),
      sameAs: socialLinks.map((link) => link.href),
    },
  ],
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
            __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
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
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${clarityId}");
            `}
          </Script>
        )}
      </body>
    </html>
  );
}
