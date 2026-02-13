# Quick Reference Guide - Article System

## 🎯 Key Concepts

### Markdown Frontmatter
Each article file starts with YAML metadata:
```markdown
---
title: Article Title
excerpt: Short description
date: Feb 13, 2026
readTime: 5 min
slug: article-slug
---

# Article Title
Content here...
```

## 📂 File Locations

| Purpose | Location |
|---------|----------|
| Article content | `public/articles/*.md` |
| Parsing utilities | `src/utils/markdown.js` |
| Article list component | `src/components/Articles.jsx` |
| Single article component | `src/components/ArticleDetail.jsx` |
| Management script | `scripts/articles-list.mjs` |

## 🔧 Common Tasks

### Add a New Article
1. Create `public/articles/my-article.md`
2. Add frontmatter and content
3. Add slug to `getAllArticles()` in `markdown.js`

### Display Article List
```jsx
import { getAllArticles } from '../utils/markdown'
const articles = await getAllArticles()
```

### Display Single Article
```jsx
import { fetchMarkdownFile } from '../utils/markdown'
const { metadata, content } = await fetchMarkdownFile('article-slug')
```

### List All Articles (CLI)
```bash
node scripts/articles-list.mjs
```

## 📚 Frontmatter Fields

| Field | Type | Example | Required |
|-------|------|---------|----------|
| title | string | "My Article" | ✅ Yes |
| excerpt | string | "Brief description" | ✅ Yes |
| date | string | "Feb 13, 2026" | ✅ Yes |
| readTime | string | "5 min" | ✅ Yes |
| slug | string | "my-article" | ✅ Yes |

## 🚀 Core Functions

### `parseFrontmatter(content)`
```javascript
const { metadata, content } = parseFrontmatter(markdownString)
// metadata: { title, excerpt, date, readTime, slug, ... }
// content: "# Article Title\n\nContent..."
```

### `fetchMarkdownFile(slug)`
```javascript
const { metadata, content } = await fetchMarkdownFile('article-slug')
// Fetches from: /articles/article-slug.md
```

### `getAllArticles()`
```javascript
const articles = await getAllArticles()
// Returns: [{ id, title, excerpt, date, readTime, slug }, ...]
```

## 🎨 Styling

Article styles are in `src/styles.css`:
- `.article-detail` - Main article container
- `.article-detail-header` - Title and metadata
- `.article-content` - Markdown content
- `.article-content h2`, `h3`, etc. - Heading styles
- `.article-content code` - Inline code
- `.article-content pre` - Code blocks
- `.article-content blockquote` - Quotes

## 🔗 Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | Hero | Home page |
| `/writings` | Articles | Article list |
| `/writings/:slug` | ArticleDetail | Single article |

## 💡 Tips

1. **Slug must be unique** - Used for routing and file naming
2. **Frontmatter is case-sensitive** - Use exact keys shown above
3. **Markdown content starts after `---`** - Everything before is metadata
4. **slugs use hyphens** - Not underscores or spaces
5. **Date format is flexible** - But keep it consistent

## ❓ FAQ

**Q: Can I have special characters in frontmatter values?**
A: Keep values simple. If needed, wrap in quotes: `title: "My: Article"`

**Q: What if I forget a required field?**
A: The article will show as empty or cause an error. Check `articles-list.mjs` output.

**Q: How do I change an article's slug?**
A: Rename the file, update the slug in frontmatter, update the array in `markdown.js`.

**Q: Can I add custom frontmatter fields?**
A: Yes! They'll be parsed and available in `metadata` object.

**Q: Where should I put article images?**
A: In `public/articles/` or `public/images/` and reference them in markdown.

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Article not appearing | Check slug is in `getAllArticles()` array |
| Frontmatter not parsing | Verify format: `---` on own lines |
| 404 error loading article | Check filename matches slug exactly |
| Styling looks wrong | Check markdown is inside `.article-content` div |

---

For detailed docs, see `ARTICLES_README.md` and `ARTICLE_SYSTEM.md`
