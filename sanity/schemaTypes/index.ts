/**
 * THE content model registry — currently empty. Every document/object type
 * (menuSection, menuItem, contact/siteSettings) must be defined and added to
 * `types` below; the Studio has nothing to manage until this exists. This is
 * the most important file to fill in next. See ../../doc.md.
 */
import { type SchemaTypeDefinition } from 'sanity'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [],
}
