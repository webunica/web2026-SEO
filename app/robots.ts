import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://webunica.cl';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin-blog/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
