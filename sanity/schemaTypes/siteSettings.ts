import {CogIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'barName',
      title: 'Bar Name',
      type: 'string',
      initialValue: 'Local Edition',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'introEn',
      title: 'Intro Text (English)',
      type: 'text',
      initialValue: 'Local Edition began with a simple love for cocktails and the feeling of a night that moves slowly. The bar was built to be a safe, easygoing space where you can relax, speak softly over gentle music, watch old films on the wall, and enjoy a cocktail made with care. It is a place for unhurried conversations, soft evenings, and a glass that feels personal. Pull up a stool. Tonight’s edition is yours to write together.',
      rows: 3,
    }),
    defineField({
      name: 'introTh',
      title: 'Intro Text (Thai)',
      type: 'text',
      initialValue: 'Local Edition เริ่มต้นจากความรักในค็อกเทลและค่ำคืนที่เคลื่อนไหวอย่างช้า ๆ บาร์แห่งนี้ถูกสร้างขึ้นเพื่อเป็นพื้นที่ที่ปลอดภัยและผ่อนคลาย ที่ซึ่งคุณสามารถพักผ่อน พูดคุยกันอย่างนุ่มนวลไปกับเสียงเพลงเบา ๆ ชมภาพยนตร์เก่า ๆ บนผนัง และเพลิดเพลินกับค็อกเทลที่ปรุงด้วยความใส่ใจ เป็นสถานที่สำหรับการสนทนาอย่างไม่เร่งรีบ ค่ำคืนที่แสนอ่อนโยน และแก้วที่รู้สึกเป็นส่วนตัว เชิญมานั่งบนเก้าอี้บาร์ คืนนี้คือฉบับของคุณที่จะเขียนร่วมกัน',
      rows: 3,
    }),
    defineField({
      name: 'addressEn',
      title: 'Address (English)',
      type: 'text',
      initialValue: '20 Rajyindee Soi 6',
      rows: 2,
    }),
    defineField({
      name: 'addressTh',
      title: 'Address (Thai)',
      type: 'text',
      initialValue: '20 ถนนราษฎร์ยินดี ซอย 6',
      rows: 2,
    }),
    defineField({
      name: 'openDaysEn',
      title: 'Open Days (English)',
      type: 'string',
      initialValue: 'Wed - Sun',
    }),
    defineField({
      name: 'openDaysTh',
      title: 'Open Days (Thai)',
      type: 'string',
      initialValue: 'พุธ - อาทิตย์',
    }),
    defineField({
      name: 'openTimeEn',
      title: 'Open Time (English)',
      type: 'string',
      initialValue: '7 PM - Midnight',
    }),
    defineField({
      name: 'openTimeTh',
      title: 'Open Time (Thai)',
      type: 'string',
      initialValue: '19:00 - เที่ยงคืน',
    }),
    defineField({
      name: 'mapUrl',
      title: 'Google Maps URL',
      type: 'url',
      initialValue: 'https://maps.app.goo.gl/ANDrSvrZsjYj23Ks6',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      initialValue: '+66 88 613 4282',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'url',
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'barName',
    },
  },
})

// Example document this schema produces (typically a single singleton document):
// {
//   _id: 'siteSettings',
//   _type: 'siteSettings',
//   barName: 'Local Edition',
//   introEn: 'A cocktail bar tucked away in the heart of the city.',
//   introTh: 'บาร์ค็อกเทลใจกลางเมือง',
//   addressEn: '123 Sukhumvit Soi 11, Bangkok',
//   addressTh: '123 สุขุมวิท ซอย 11 กรุงเทพ',
//   openDaysEn: 'Wed - Sun',
//   openDaysTh: 'พุธ - อาทิตย์',
//   openTimeEn: '7 PM - Midnight',
//   openTimeTh: '19:00 - เที่ยงคืน',
//   mapUrl: 'https://maps.google.com/?q=...',
//   phone: '+66 2 123 4567',
//   socialLinks: [
//     { label: 'Instagram', url: 'https://instagram.com/localedition' },
//   ],
// }
