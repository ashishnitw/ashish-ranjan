import { Link } from 'react-router-dom'
import { Coffee } from 'lucide-react'
import { getReadTimeIconCount } from '../utils/readTimeUtils'

export default function ArticleListItem({ article }) {
  return (
    <article className="article-item">
      <div className="article-item-content">
        <time className="article-date">{article.date}</time>
        <h3 className="article-title">
          <Link to={`/articles/${article.slug}`}>{article.title}</Link>
        </h3>
        <span className="article-read-time-icons" title={article.readTime}>
          {Array.from({ length: getReadTimeIconCount(article.readTime) }).map((_, i) => (
            <Coffee key={i} size={16} />
          ))}
        </span>
      </div>
    </article>
  )
}
