import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://vibe-website2.vercel.app', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: 'https://vibe-website2.vercel.app/meniu', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://vibe-website2.vercel.app/rezervari', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://vibe-website2.vercel.app/locatie', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://vibe-website2.vercel.app/sarbatori', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: 'https://vibe-website2.vercel.app/confidentialitate', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: 'https://vibe-website2.vercel.app/cookies', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: 'https://vibe-website2.vercel.app/termeni', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
  ]
}
