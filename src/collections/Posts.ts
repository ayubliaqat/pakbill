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
    // LEFT SIDE: MAIN WRITING AREA (Writer-First / Distraction-Free Focus)
    // Order: Title -> Permalink Slug -> Rich Text Editor
    // =========================================================================
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

    // =========================================================================
    // RIGHT SIDEBAR: PUBLISH PANEL & SETTINGS GROUPS (Content, SEO, Advanced)
    // =========================================================================

    // --- 1. Publish Controls (Always visible at the top) ---
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

    // --- 2. Content Tab Sidebar Section (Excerpt, Image, Taxonomy, Author) ---
    {
      name: 'excerpt',
      type: 'textarea',
      maxLength: 300,
      admin: {
        position: 'sidebar',
        description: 'Short summary shown on blog cards (recommended 150-200 characters).',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        position: 'sidebar',
        description: 'Primary header or card image for the post.',
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

    // --- 3. SEO Tab Sidebar Section (Meta Listing & Advanced SEO / OpenGraph) ---
    {
      name: 'meta',
      label: 'SEO Meta',
      type: 'group',
      admin: {
        position: 'sidebar',
        description: 'Configure how this post appears in Google search engine results pages.',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          maxLength: 60,
          admin: {
            description: 'SEO Meta Title. Recommended: max 60 characters.',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          maxLength: 160,
          admin: {
            description: 'SEO Meta Description. Recommended: max 160 characters.',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Default sharing image for search engines and social graphs.',
          },
        },
      ],
    },
    {
      name: 'advancedSeo',
      label: 'Advanced SEO & Social',
      type: 'group',
      admin: {
        position: 'sidebar',
        description: 'Control crawler directives, JSON-LD schemas, and Open Graph overrides.',
      },
      fields: [
        {
          name: 'canonicalUrl',
          type: 'text',
          required: false,
          admin: {
            description: 'Custom canonical URL override if syndicated.',
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
            description: 'Instructs search crawler bots not to index this page.',
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
            description: 'Open Graph title for social shares. Recommended ≤ 70 chars.',
          },
        },
        {
          name: 'ogDescription',
          type: 'textarea',
          maxLength: 200,
          admin: {
            description: 'Open Graph description override. Recommended ≤ 200 chars.',
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

    // --- 4. Advanced Tab Sidebar Section (Performance, FAQs, Redirects, Notes) ---
    {
      name: 'readingTime',
      type: 'number',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Auto-calculated from body length (~200 words/min).',
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
        position: 'sidebar',
        description: 'Auto-generate and render an in-page TOC block from headings.',
      },
    },
    {
      name: 'relatedPosts',
      type: 'relationship',
      relationTo: 'posts',
      hasMany: true,
      required: false,
      admin: {
        position: 'sidebar',
        description: 'Manually curated related posts displayed at article footer.',
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
        position: 'sidebar',
        description: 'Populates interactive accordions and FAQPage structured JSON-LD.',
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
        position: 'sidebar',
        description: 'Optional 301 redirect target path if post is retired.',
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
        position: 'sidebar',
        description: 'Internal editorial notes — strictly restricted to backend team.',
      },
      access: {
        read: ({ req }) => Boolean(req.user),
      },
    },
  ],
}
