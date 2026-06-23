import type { StructureResolver } from "sanity/structure";

// This file defines the structure of the Sanity Studio content editor, including how documents are organized and displayed in the sidebar. It uses Sanity's Structure Builder API to create a custom structure for the content types defined in the schema.

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.documentTypeListItem("menuSection").title("Menu Sections"),
      S.documentTypeListItem("menuItem").title("All Menu Items"),
      S.listItem()
        .title("Menu Items by Section")
        .child(
          S.documentTypeList("menuSection")
            .title("Choose a Section")
            .child((sectionId) =>
              S.documentList()
                .title("Items")
                .filter('_type == "menuItem" && section._ref == $sectionId')
                .params({ sectionId }),
            ),
        ),
      S.divider(),
      S.listItem()
        .title("Site Settings")
        .schemaType("siteSettings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Site Settings"),
        ),
    ]);
