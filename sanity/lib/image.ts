/**
 * Builds public URLs from Sanity image references via `urlFor()`. Needed
 * anywhere a menu item or page needs to render a photo. See ../../doc.md.
 */
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url'

import { dataset, projectId } from '../env'

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset })

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source)
}
