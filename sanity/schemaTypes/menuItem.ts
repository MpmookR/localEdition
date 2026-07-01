import {BottleIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

const spiritOptions = [
  {title: 'Gin', value: 'gin'},
  {title: 'Vodka', value: 'vodka'},
  {title: 'Rum', value: 'rum'},
  {title: 'Tequila / Mezcal', value: 'tequilaMezcal'},
  {title: 'Whiskey / Bourbon', value: 'whiskeyBourbon'},
  {title: 'Brandy / Cognac', value: 'brandyCognac'},
  {title: 'Liqueur / Aperitif', value: 'liqueurAperitif'},
  {title: 'Vermouth / Fortified wine', value: 'vermouthFortifiedWine'},
  {title: 'Wine / Sparkling wine', value: 'wineSparkling'},
  {title: 'Beer', value: 'beer'},
  {title: 'Sake / Soju', value: 'sakeSoju'},
  {title: 'Non-alcoholic', value: 'nonAlcoholic'},
]

export const menuItem = defineType({
  name: 'menuItem',
  title: 'Menu Item',
  type: 'document',
  icon: BottleIcon,
  fieldsets: [
    {name: 'english', title: 'English'},
    {name: 'thai', title: 'Thai'},
    {name: 'menu', title: 'Menu Details'},
  ],
  fields: [
    defineField({
      name: 'nameEn',
      title: 'Name (English)',
      type: 'string',
      fieldset: 'english',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'nameTh',
      title: 'Name (Thai)',
      type: 'string',
      fieldset: 'thai',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ingredientsEn',
      title: 'Main Ingredients (English)',
      type: 'text',
      rows: 2,
      fieldset: 'english',
      description: 'Customer-facing ingredient list, e.g. Gin, Campari, sweet vermouth.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ingredientsTh',
      title: 'Main Ingredients (Thai)',
      type: 'text',
      rows: 2,
      fieldset: 'thai',
      description: 'Customer-facing ingredient list in Thai.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'descriptionEn',
      title: 'Description (English)',
      type: 'text',
      rows: 3,
      fieldset: 'english',
    }),
    defineField({
      name: 'descriptionTh',
      title: 'Description (Thai)',
      type: 'text',
      rows: 3,
      fieldset: 'thai',
    }),
    defineField({
      name: 'price',
      title: 'Price (THB)',
      type: 'number',
      fieldset: 'menu',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'section',
      title: 'Menu Section',
      type: 'reference',
      to: [{type: 'menuSection'}],
      fieldset: 'menu',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'spirits',
      title: 'Spirits',
      type: 'array',
      fieldset: 'menu',
      description: 'Used for filtering. Select every spirit/base that applies.',
      of: [
        defineArrayMember({
          type: 'string',
          options: {list: spiritOptions},
        }),
      ],
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      fieldset: 'menu',
      initialValue: 'available',
      options: {
        layout: 'radio',
        list: [
          {title: 'Available', value: 'available'},
          {title: 'Temporarily hidden', value: 'hidden'},
          {title: 'Sold out', value: 'soldOut'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isFeatured',
      title: 'Special of the Month',
      type: 'boolean',
      fieldset: 'menu',
      description: 'Highlights this item at the top of the menu page. Only one item should be flagged at a time.',
      initialValue: false,
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      fieldset: 'menu',
      initialValue: 0,
      validation: (rule) => rule.required().integer().min(0),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: 'Menu order',
      name: 'menuOrderAsc',
      by: [{field: 'sortOrder', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'nameEn',
      subtitle: 'section.titleEn',
      price: 'price',
      media: 'image',
    },
    prepare({title, subtitle, price, media}) {
      return {
        title,
        subtitle: `${subtitle ?? 'No section'} - ${price ?? '?'} THB`,
        media,
      }
    },
  },
})

// Example document this schema produces:
// {
//   _id: 'def456',
//   _type: 'menuItem',
//   nameEn: 'Negroni',
//   nameTh: 'เนโกรนี',
//   ingredientsEn: 'Gin, Campari, sweet vermouth',
//   ingredientsTh: 'จิน, คัมปาริ, สวีทเวอร์มุท',
//   descriptionEn: 'A bittersweet classic, equal parts gin, Campari, and vermouth.',
//   descriptionTh: 'ค็อกเทลคลาสสิกรสขมหวาน',
//   price: 380,
//   section: { _type: 'reference', _ref: 'abc123' }, // -> menuSection
//   spirits: ['gin', 'liqueurAperitif', 'vermouthFortifiedWine'],
//   status: 'available',
//   isFeatured: false,
//   sortOrder: 0,
//   image: {
//     _type: 'image',
//     asset: { _type: 'reference', _ref: 'image-xyz-800x800-jpg' },
//     alt: 'Negroni in a rocks glass with an orange peel garnish',
//   },
// }
