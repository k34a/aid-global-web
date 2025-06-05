// app/robots.ts
import { ngoDetails } from '@/config'
import { type MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${ngoDetails.contact.website}/sitemap.xml`,
    host: ngoDetails.contact.website,
  }
}
