import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'MediaModule',
  title: 'Media Module',
  type: 'object',
  fields: [
    {
      type: 'string',
      name: 'heading',
      title: 'Heading',
    },
    {
      name: 'cta',
      title: 'Cta',
      type: 'Cta',
    },
    {
      type: 'string',
      name: 'body',
      title: 'Body',
    },
    {
      type: 'image',
      name: 'Image',
      title: 'Image',
      validation: (rule) => rule.required(),
    },
    {
      type: 'string',
      name: 'imageAlt',
      title: 'Image Alt',
    },
    {
      type: 'boolean',
      name: 'imageOnRight',
      title: 'Image On Right',
      initialValue: false,
    },
    {
      type: 'boolean',
      name: 'isDark',
      title: 'Is Dark',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'heading',
      media: 'image',
    },
    prepare({ title, media }) {
      return {
        subtitle: 'Media Module',
        title,
        media,
      }
    },
  },
})
