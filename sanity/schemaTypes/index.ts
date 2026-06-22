import {type SchemaTypeDefinition} from 'sanity'

import {menuItem} from './menuItem'
import {menuSection} from './menuSection'
import {siteSettings} from './siteSettings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [menuSection, menuItem, siteSettings],
}
