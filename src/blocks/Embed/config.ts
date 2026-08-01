import type { Block } from 'payload'

/**
 * Embed block for the Posts rich text editor.
 * Payload's Lexical editor has no built-in oEmbed auto-embed feature (unlike
 * WordPress core), so this recreates that behavior as a Blocks-Feature block:
 * an editor pastes a YouTube/Vimeo/Twitter/X URL and the frontend renderer
 * turns it into an embedded player.
 */
export const EmbedBlock: Block = {
  slug: 'embed',
  labels: {
    singular: 'Embed',
    plural: 'Embeds',
  },
  fields: [
    {
      name: 'url',
      type: 'text',
      required: true,
      admin: {
        description: 'Paste a YouTube, Vimeo, or Twitter/X URL to embed.',
      },
      validate: (value: string | null | undefined) => {
        if (!value) return 'A URL is required.'
        try {
          // eslint-disable-next-line no-new
          new URL(value)
          return true
        } catch {
          return 'Enter a valid URL, e.g. https://www.youtube.com/watch?v=...'
        }
      },
    },
    {
      name: 'caption',
      type: 'text',
      required: false,
      admin: {
        description: 'Optional caption shown below the embed.',
      },
    },
  ],
}
