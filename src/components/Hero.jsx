import { Link } from 'react-router-dom'
import { profile } from '../data/profile'
import { getAllArticles } from '../data/articlesContent'
import ArticleListItem from './ArticleListItem'

export default function Hero() {
  const latestArticles = getAllArticles().slice(0, 3)

  return (
    <section className="hero">
      <div className="hero-content">
        <h3 className="hero-title">
          Hi, I'm {profile.name}
        </h3>
        <p className="hero-description">
          {profile.description}
        </p>
      </div>

      {latestArticles.length > 0 && (
        <div className="hero-articles">
          <h2 className="hero-articles-title">Latest Articles</h2>
          <div className="hero-articles-list">
            {latestArticles.map(article => (
              <ArticleListItem key={article.id} article={article} />
            ))}
          </div>
          <Link to="/articles" className="view-all-articles-link">
            View all articles →
          </Link>
        </div>
      )}
    </section>
  )
}
