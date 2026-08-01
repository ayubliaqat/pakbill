import type { CollectionConfig, Where } from 'payload'
import {
  lexicalEditor,
  FixedToolbarFeature,
  EXPERIMENTAL_TableFeature,
  BlocksFeature,
} from '@payloadcms/richtext-lexical'
import { EmbedBlock } from '../blocks/Embed/config'

/**
 * Recursively extracts plain text from a Lexical rich-text JSON tree.
 * Used for automated reading-time calculation.
 */
function extractPlainTextFromLexical(node: any): string {
  if (!node) return ''
  let text = ''
  if (typeof node.text === 'string') {
    text += `${node.text} `
  }
  if (Array.isArray(node.children)) {
    for (const child of node.children) {
      text += extractPlainTextFromLexical(child)
    }
  }
  return text
}

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'category', 'featured', 'publishedAt'],
    // Custom admin styling to provide a generous, distraction-free writing canvas
    // matching modern CMS standards (Ghost/Notion/Gutenberg) without nested scrollbars.
    style: `
      .field-type.rich-text .rich-text__editor {
        min-height: 550px;
      }
      .field-type.rich-text .rich-text__content {
        min-height: 520px;
      }
    `,
  },

  versions: {
    drafts: {
      autosave: {
        interval: 2000,
      },
    },
    maxPerDoc: 50,
  },

  access: {
    read: ({ req }) => {
      if (req.user) return true

      const publishedFilter: Where = {
        and: [
          { status: { equals: 'published' } },
          { publishedAt: { less_than_equal: new Date().toISOString() } },
        ],
      }

      return publishedFilter
    },
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },

  hooks: {
    beforeChange: [
      ({ data }) => {
        // Fallback for social sharing tags if left empty by editors
        if (data?.advancedSeo) {
          if (!data.advancedSeo.ogTitle) {
            data.advancedSeo.ogTitle = data.meta?.title || data.title
          }
          if (!data.advancedSeo.ogDescription) {
            data.advancedSeo.ogDescription = data.meta?.description || data.excerpt
          }
        }
        return data
      },
    ],
  },

  fields: [
    // =========================================================================
    // TOP-LEVEL TABS STRUCTURE (Content, SEO, Advanced)
    // =========================================================================
    {
      type: 'tabs',
      tabs: [
        // ---------------------------------------------------------------------
        // 1. CONTENT TAB (Writer-First Layout: Title -> Slug -> Editor -> Excerpt -> Image)
        // ---------------------------------------------------------------------
        {
          label: 'Content',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              maxLength: 120,
              admin: {
                description: 'The main post title displayed on the frontend.',
              },
            },
            {
              name: 'slug',
              type: 'text',
              required: true,
              unique: true,
              admin: {
                description: 'URL permalink identifier. Auto-generated from title if left blank.',
              },
              hooks: {
                beforeValidate: [
                  ({ value, data }) => {
                    if (value) return value
                    if (data?.title) {
                      return data.title
                        .toLowerCase()
                        .trim()
                        .replace(/[^a-z0-9\s-]/g, '')
                        .replace(/\s+/g, '-')
                        .replace(/-+/g, '-')
                        .replace(/^-+|-+$/g, '')
                    }
                    return value
                  },
                ],
              },
            },
            {
              name: 'content',
              type: 'richText',
              required: true,
              editor: lexicalEditor({
                features: ({ defaultFeatures }) => [
                  ...defaultFeatures,
                  FixedToolbarFeature(),
                  EXPERIMENTAL_TableFeature(),
                  BlocksFeature({
                    blocks: [EmbedBlock],
                  }),
                ],
              }),
            },
            {
              name: 'excerpt',
              type: 'textarea',
              maxLength: 300,
              admin: {
                description:
                  'Short summary shown on blog cards (recommended 150-200 characters). Written after drafting content.',
              },
            },
            {
              name: 'featuredImage',
              type: 'upload',
              relationTo: 'media',
              required: false,
              admin: {
                description: 'Primary header or card image for the post.',
              },
            },
          ],
        },

        // ---------------------------------------------------------------------
        // 2. SEO TAB (Yoast / Rank Math Inspired Optimization)
        // ---------------------------------------------------------------------
        {
          label: 'SEO',
          fields: [
            {
              name: 'meta',
              label: 'Search Engine Listing (Meta)',
              type: 'group',
              admin: {
                description:
                  'Configure how this post appears in Google search engine results pages.',
              },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  maxLength: 60,
                  admin: {
                    description:
                      'SEO Meta Title. Recommended length: max 60 characters for optimal display.',
                  },
                },
                {
                  name: 'description',
                  type: 'textarea',
                  maxLength: 160,
                  admin: {
                    description: 'SEO Meta Description. Recommended length: max 160 characters.',
                  },
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description:
                      'Default sharing image for search engines and general social graphs.',
                  },
                },
              ],
            },
            {
              name: 'advancedSeo',
              label: 'Advanced SEO & Social Sharing',
              type: 'group',
              admin: {
                description:
                  'Control crawler directives, structured data schemas, and Open Graph overrides.',
              },
              fields: [
                {
                  name: 'canonicalUrl',
                  type: 'text',
                  required: false,
                  admin: {
                    description: 'Custom canonical URL override if syndicated from another source.',
                  },
                  validate: (value: string | null | undefined) => {
                    if (!value) return true
                    try {
                      new URL(value)
                      return true
                    } catch {
                      return 'Enter a full valid URL, e.g. https://example.com/blog/my-post'
                    }
                  },
                },
                {
                  name: 'noIndex',
                  type: 'checkbox',
                  label: 'Hide from search engines (noindex)',
                  defaultValue: false,
                  admin: {
                    description: 'Instructs search engine crawlers not to index this page.',
                  },
                },
                {
                  name: 'schemaType',
                  type: 'select',
                  defaultValue: 'Article',
                  options: [
                    { label: 'Article', value: 'Article' },
                    { label: 'BlogPosting', value: 'BlogPosting' },
                    { label: 'NewsArticle', value: 'NewsArticle' },
                    { label: 'HowTo', value: 'HowTo' },
                    { label: 'FAQPage', value: 'FAQPage' },
                  ],
                  admin: {
                    description: 'Schema.org structured data JSON-LD format type.',
                  },
                },
                {
                  name: 'ogTitle',
                  type: 'text',
                  maxLength: 70,
                  admin: {
                    description:
                      'Open Graph title for Facebook/LinkedIn. Recommended ≤ 70 characters.',
                  },
                },
                {
                  name: 'ogDescription',
                  type: 'textarea',
                  maxLength: 200,
                  admin: {
                    description: 'Open Graph description override. Recommended ≤ 200 characters.',
                  },
                },
                {
                  name: 'twitterCard',
                  type: 'select',
                  defaultValue: 'summary_large_image',
                  options: [
                    { label: 'Summary', value: 'summary' },
                    { label: 'Summary with Large Image', value: 'summary_large_image' },
                  ],
                  admin: {
                    description: 'Twitter/X card display type.',
                  },
                },
              ],
            },
          ],
        },

        // ---------------------------------------------------------------------
        // 3. ADVANCED TAB (Performance, Structure, Editorial Notes)
        // ---------------------------------------------------------------------
        {
          label: 'Advanced',
          fields: [
            {
              name: 'readingTime',
              type: 'number',
              admin: {
                readOnly: true,
                description: 'Auto-calculated from body content length (~200 words/min).',
              },
              hooks: {
                beforeChange: [
                  ({ siblingData }) => {
                    const plainText = extractPlainTextFromLexical(siblingData?.content?.root)
                    const wordCount = plainText.trim().split(/\s+/).filter(Boolean).length
                    return Math.max(1, Math.ceil(wordCount / 200))
                  },
                ],
              },
            },
            {
              name: 'showTableOfContents',
              type: 'checkbox',
              label: 'Show Table of Contents',
              defaultValue: false,
              admin: {
                description:
                  'Automatically generate and render an in-page TOC block from headings.',
              },
            },
            {
              name: 'relatedPosts',
              type: 'relationship',
              relationTo: 'posts',
              hasMany: true,
              required: false,
              admin: {
                description: 'Manually curated related posts displayed at the article footer.',
              },
              filterOptions: ({ id }) => {
                return id ? { id: { not_equals: id } } : true
              },
            },
            {
              name: 'faqs',
              type: 'array',
              label: 'FAQ Section',
              required: false,
              admin: {
                description:
                  'Populates interactive accordions and FAQPage structured JSON-LD schema.',
              },
              fields: [
                { name: 'question', type: 'text', required: true },
                { name: 'answer', type: 'textarea', required: true },
              ],
            },
            {
              name: 'redirectUrl',
              type: 'text',
              required: false,
              admin: {
                description: 'Optional 301 redirect target path if this post is retired or merged.',
              },
              validate: (value: string | null | undefined) => {
                if (!value) return true
                try {
                  new URL(value, 'https://placeholder.local')
                  return true
                } catch {
                  return 'Enter a valid URL or path (e.g. /blog/new-slug or https://example.com/path).'
                }
              },
            },
            {
              name: 'internalNotes',
              type: 'textarea',
              required: false,
              admin: {
                description:
                  'Internal editorial notes — strictly restricted to backend team members.',
              },
              access: {
                read: ({ req }) => Boolean(req.user),
              },
            },
          ],
        },
      ],
    },

    // =========================================================================
    // COMPACT PERSISTENT SIDEBAR CONTROLS
    // =========================================================================
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      defaultValue: 'draft',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
        description: 'Schedule publishing date/time. Auto-fills upon publishing if left blank.',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData.status === 'published' && !value) {
              return new Date().toISOString()
            }
            return value
          },
        ],
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Sticky (Pin to Top)',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: false,
      hasMany: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      required: false,
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
