const articles = [
  {
    id: 1,
    title: 'Building a Clean Portfolio with React',
    excerpt: 'A guide to creating a minimal, elegant portfolio website using React and Vite.',
    date: 'Feb 10, 2026',
    readTime: '5 min',
    link: '#'
  },
  {
    id: 2,
    title: 'The Art of Minimalist Web Design',
    excerpt: 'Exploring principles of minimalism in modern web design and why less is more.',
    date: 'Feb 5, 2026',
    readTime: '7 min',
    link: '#'
  },
  {
    id: 3,
    title: 'JavaScript Best Practices in 2026',
    excerpt: 'Essential patterns and practices for writing clean, maintainable JavaScript code.',
    date: 'Jan 28, 2026',
    readTime: '8 min',
    link: '#'
  },
  {
    id: 4,
    title: 'CSS Grid vs Flexbox: When to Use Each',
    excerpt: 'A practical comparison of two powerful CSS layout tools and how to choose between them.',
    date: 'Jan 20, 2026',
    readTime: '6 min',
    link: '#'
  },
  {
    id: 5,
    title: 'React Hooks: A Complete Guide',
    excerpt: 'Understanding React hooks and how to use them to build powerful functional components.',
    date: 'Jan 12, 2026',
    readTime: '10 min',
    link: '#'
  },
  {
    id: 6,
    title: 'Performance Optimization Techniques',
    excerpt: 'Tips and tricks to optimize your React applications for better performance.',
    date: 'Jan 5, 2026',
    readTime: '9 min',
    link: '#'
  }
]

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
