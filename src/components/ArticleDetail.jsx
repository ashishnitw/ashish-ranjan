import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { fetchMarkdownFile } from '../data/articlesContent'

export default function ArticleDetail() {
  const { slug } = useParams()
  const [metadata, setMetadata] = useState(null)
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchMarkdownFile(slug)
      .then(({ metadata, content }) => {
        setMetadata(metadata)
        setContent(content)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [slug])

  if (loading) {
    return <div className="article-detail"><p>Loading...</p></div>
  }

  if (error || !metadata) {
    return (
      <div className="article-detail">
        <p>{error || 'Article not found'}</p>
        <Link to="/writings">← Back to all articles</Link>
      </div>
    )
  }

  return (
    <article className="article-detail">
      <Link to="/writings" className="back-link">← Back to all articles</Link>
      
      <header className="article-detail-header">
        <h1>{metadata.title}</h1>
        <div className="article-detail-meta">
          <time>{metadata.date}</time>
          <span>{metadata.readTime}</span>
        </div>
      </header>

      <div className="article-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown>
      </div>
    </article>
  )
}
