/**
 * Customizes how content types are grouped/ordered in the Studio's sidebar.
 * Currently the default auto-generated list — worth revisiting once
 * menuSection/menuItem/contact types exist (e.g. group items under their
 * section). See ../doc.md.
 */
import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items(S.documentTypeListItems())
