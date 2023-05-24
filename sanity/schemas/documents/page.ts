import { Browser } from 'phosphor-react'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  type: 'document',
  name: 'page',
  title: 'Page',
  icon: Browser,
  fields: [
    {
      type: 'string',
      name: 'title',
      title: 'Title',
      validation: (rule) => rule.required(),
    },
    {
      type: 'slug',
      name: 'slug',
      title: 'Slug',
      validation: (rule) => rule.required(),
      options: {
        slugify: (input) => (input !== '/' ? '/' : input.replace('/', '')),
      },
    },
    {
      type: 'array',
      name: 'sections',
      title: 'Sections',
      of: [
        { type: 'CtaBanner' },
        {
          type: 'MainHero',
        },
        {
          type: 'FeaturedItems',
        },
        {
          type: 'FeaturedText',
        },
        {
          type: 'Quote',
        },
        {
          type: 'MediaModule',
        },
      ],
      validation: (rule) => rule.required(),
    },
    // TODO: Create fields to input slug and sections
  ],
  // TODO: BONUS! Configure the preview for this schema to display slug as the title and 'Page' as the subtitle
  // preview: {
  //   select: {},
  //   prepare({}) {
  //     return {}
  //   },
  // },
})
