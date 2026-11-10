import type { MetadataRoute } from 'next';
import { lastUpdated, siteUrl } from '@/lib/data';

// Only real, indexable pages belong here; section anchors (#work) are not URLs to Google.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(lastUpdated),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
