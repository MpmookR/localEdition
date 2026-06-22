/**
 * The read client the Next.js app uses to fetch menu/contact content from
 * Sanity via GROQ queries (CDN-cached). Menu and contact pages will import
 * `client` from here to pull data at render time. See ../../doc.md.
 */
import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
