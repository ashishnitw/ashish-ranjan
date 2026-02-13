import { articles } from '../data/articles'

export default function Articles() {
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
              <a href={article.link}>{article.title}</a>
            </h3>
            <p className="article-excerpt">{article.excerpt}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
