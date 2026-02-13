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
 * Fetch and parse a markdown file
 * @param {string} slug - The article slug
 * @returns {Promise<Object>} { metadata, content }
 */
export async function fetchMarkdownFile(slug) {
  try {
    const response = await fetch(`/articles/${slug}.md`)
    if (!response.ok) {
      throw new Error('Failed to fetch article')
    }
    const text = await response.text()
    return parseFrontmatter(text)
  } catch (error) {
    throw new Error(`Error loading article: ${error.message}`)
  }
}

/**
 * Get all available articles by reading from a manifest or directory
 * For static sites, we'll return the articles list that needs to be maintained
 * @returns {Promise<Array>} Array of article metadata
 */
export async function getAllArticles() {
  // List of all articles - this could be auto-generated at build time
  const articleSlugs = [
    'building-clean-portfolio',
    'minimalist-web-design',
    'javascript-best-practices',
    'css-grid-vs-flexbox',
    'react-hooks-guide',
    'performance-optimization'
  ]

  const articles = await Promise.all(
    articleSlugs.map(async (slug) => {
      try {
        const { metadata } = await fetchMarkdownFile(slug)
        return {
          ...metadata,
          slug,
          id: articleSlugs.indexOf(slug) + 1
        }
      } catch (error) {
        console.error(`Failed to load article ${slug}:`, error)
        return null
      }
    })
  )

  return articles.filter(article => article !== null)
}
