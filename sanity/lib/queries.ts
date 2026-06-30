/**
 * Central home for every GROQ query the app runs. Keeping them here (instead
 * of inline in pages) means one query isn't redefined per page, and
 * `defineQuery` lets `sanity typegen generate` pick them up to produce
 * matching result types in sanity.types.ts.
 */
import { defineQuery } from "next-sanity";

export const menuSectionsQuery = defineQuery(`
  *[_type == "menuSection"] | order(sortOrder asc){
    _id,
    titleEn,
    titleTh,
    "items": *[_type == "menuItem" && references(^._id)] | order(sortOrder asc){
      _id,
      nameEn,
      nameTh,
      ingredientsEn,
      ingredientsTh,
      price
    }
  }
`);

export const siteSettingsQuery = defineQuery(`
  *[_type == "siteSettings"][0]{
    barName,
    introEn,
    introTh,
    addressEn{ line1, line2, city, province, postal },
    addressTh{ line1, line2, city, province, postal },
    openDaysEn,
    openDaysTh,
    openTimeEn,
    openTimeTh,
    mapUrl,
    mapEmbedUrl,
    phone,
    email,
    socialLinks
  }
`);
