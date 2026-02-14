// Import all markdown files as raw text
const articleModules = import.meta.glob('./articles/*.md', { query: '?raw', import: 'default', eager: true })

const articleContents = {}

// Build the articleContents object from the glob imports
for (const [path, content] of Object.entries(articleModules)) {
  const slug = path.replace('./articles/', '').replace('.md', '')
  articleContents[slug] = content
}

/**
 * Parse YAML frontmatter from Markdown content
 * @param {string} content - The markdown file content
 * @returns {Object} { metadata, content } - Parsed metadata and remaining content
 */
export function parseFrontmatter(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/
  const match = content.match(frontmatterRegex)

  if (!match) {
    return { metadata: {}, content }
  }

  const [, frontmatterStr, markdownContent] = match
  const metadata = {}

  // Parse YAML-like frontmatter
  frontmatterStr.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':')
    if (colonIndex > -1) {
      const key = line.substring(0, colonIndex).trim()
      const value = line.substring(colonIndex + 1).trim()
      metadata[key] = value
    }
  })

  return { metadata, content: markdownContent.trim() }
}

/**
 * Get all articles with metadata
 * @returns {Array} Array of articles with id, metadata, and slug
 */
export function getAllArticles() {
  const articles = Object.entries(articleContents)
    .map(([slug, content], index) => {
      const { metadata } = parseFrontmatter(content)
      return {
        id: index + 1,
        slug,
        ...metadata
      }
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  return articles
}

/**
 * Get article content by slug
 * @param {string} slug - The article slug
 * @returns {Promise<Object>} { metadata, content }
 */
export async function fetchMarkdownFile(slug) {
  try {
    const content = articleContents[slug]
    if (!content) {
      throw new Error('Article not found')
    }
    return parseFrontmatter(content)
  } catch (error) {
    throw new Error(`Error loading article: ${error.message}`)
  }
}
