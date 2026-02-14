import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Coffee } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { fetchMarkdownFile } from '../data/articlesContent'
import { getReadTimeIconCount } from '../utils/readTimeUtils'
import { ARTICLE_DETAIL } from '../config/constants'

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
    return <div className="article-detail"><p>{ARTICLE_DETAIL.LOADING}</p></div>
  }

  if (error || !metadata) {
    return (
      <div className="article-detail">
        <p>{error || ARTICLE_DETAIL.NOT_FOUND}</p>
        <Link to="/articles">{ARTICLE_DETAIL.BACK_LINK}</Link>
      </div>
    )
  }

  return (
    <article className="article-detail">
      <Link to="/articles" className="back-link">{ARTICLE_DETAIL.BACK_LINK}</Link>
      
      <header className="article-detail-header">
        <h1>{metadata.title}</h1>
        <div className="article-detail-meta">
          <time>{metadata.date}</time>
          <span className="article-detail-read-time-icons" title={metadata.readTime}>
            {Array.from({ length: getReadTimeIconCount(metadata.readTime) }).map((_, i) => (
              <Coffee key={i} size={18} />
            ))}
          </span>
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
