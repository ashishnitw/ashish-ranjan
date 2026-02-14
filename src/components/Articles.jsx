import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Coffee } from 'lucide-react'
import { getAllArticles } from '../data/articlesContent'
import { getReadTimeIconCount } from '../utils/readTimeUtils'
import { ARTICLES } from '../config/constants'

export default function Articles() {
  const [searchQuery, setSearchQuery] = useState('')
  const articles = getAllArticles()

  const filteredArticles = useMemo(() => {
    if (!searchQuery.trim()) return articles

    const query = searchQuery.toLowerCase()
    return articles.filter(article => 
      article.title.toLowerCase().includes(query)
    )
  }, [searchQuery, articles])

  return (
    <section className="articles">
      <div className="articles-header">
        <h2 className="articles-title">{ARTICLES.TITLE}</h2>
        <p className="articles-subtitle">{ARTICLES.SUBTITLE}</p>
        
        <div className="articles-search">
          <input
            type="text"
            placeholder="Search articles..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search articles"
          />
        </div>
      </div>
      
      {filteredArticles.length > 0 ? (
        <div className="articles-list">
          {filteredArticles.map(article => (
            <article key={article.id} className="article-item">
              <div className="article-item-content">
                <time className="article-date">{article.date}</time>
                <h3 className="article-title">
                  <Link to={`/articles/${article.slug}`}>{article.title}</Link>
                </h3>
                <span className="article-read-time-icons" title={article.readTime}>
                  {Array.from({ length: getReadTimeIconCount(article.readTime) }).map((_, i) => (
                    <Coffee key={i} size={18} />
                  ))}
                </span>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="articles-empty">
          <p>No articles found matching "{searchQuery}"</p>
          <button 
            className="clear-search-btn"
            onClick={() => setSearchQuery('')}
          >
            Clear search
          </button>
        </div>
      )}
    </section>
  )
}
