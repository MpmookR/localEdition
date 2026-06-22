import {MenuIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const menuSection = defineType({
  name: 'menuSection',
  title: 'Menu Section',
  type: 'document',
  icon: MenuIcon,
  fields: [
    defineField({
      name: 'titleEn',
      title: 'Title (English)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'titleTh',
      title: 'Title (Thai)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'titleEn'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'descriptionEn',
      title: 'Description (English)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'descriptionTh',
      title: 'Description (Thai)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      initialValue: 0,
      validation: (rule) => rule.required().integer().min(0),
    }),
    defineField({
      name: 'isVisible',
      title: 'Show on Menu',
      type: 'boolean',
      initialValue: true,
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
      title: 'titleEn',
      subtitle: 'titleTh',
      sortOrder: 'sortOrder',
    },
    prepare({title, subtitle, sortOrder}) {
      return {
        title,
        subtitle: `${sortOrder ?? 0} - ${subtitle ?? 'Missing Thai title'}`,
      }
    },
  },
})

// Example document this schema produces:
// {
//   _id: 'abc123',
//   _type: 'menuSection',
//   titleEn: 'Signature Cocktails',
//   titleTh: 'ค็อกเทลซิกเนเจอร์',
//   slug: { _type: 'slug', current: 'signature-cocktails' },
//   descriptionEn: 'Our house creations, made in-house.',
//   descriptionTh: 'เครื่องดื่มซิกเนเจอร์ของบาร์',
//   sortOrder: 0,
//   isVisible: true,
// }
