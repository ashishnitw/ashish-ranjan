import { Link } from 'react-router-dom'
import { articles } from '../data/articles'
import { ARTICLES } from '../config/constants'

export default function Articles() {
  return (
    <section className="articles">
      <div className="articles-header">
        <h2 className="articles-title">{ARTICLES.TITLE}</h2>
        <p className="articles-subtitle">{ARTICLES.SUBTITLE}</p>
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
