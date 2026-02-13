import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getAllArticles } from '../utils/markdown'

export default function Articles() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getAllArticles()
      .then(articles => {
        setArticles(articles)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <section className="articles">
        <div className="articles-header">
          <h2 className="articles-title">Writing</h2>
          <p className="articles-subtitle">Thoughts on web development, design, and technology</p>
        </div>
        <p>Loading articles...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="articles">
        <div className="articles-header">
          <h2 className="articles-title">Writing</h2>
          <p className="articles-subtitle">Thoughts on web development, design, and technology</p>
        </div>
        <p>Error loading articles: {error}</p>
      </section>
    )
  }

  return (
    <section className="articles">
      <div className="articles-header">
        <h2 className="articles-title">Writing</h2>
        <p className="articles-subtitle">Thoughts on web development, design, and technology</p>
      </div>
      
      <div className="articles-list">
        {articles.map(article => (
          <article key={article.id} className="article-item">
            <div className="article-meta">
              <time className="article-date">{article.date}</time>
              <span className="article-read-time">{article.readTime}</span>
            </div>
            <h3 className="article-title">
              <Link to={`/writings/${article.slug}`}>{article.title}</Link>
            </h3>
            <p className="article-excerpt">{article.excerpt}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
