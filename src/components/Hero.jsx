import { profile } from '../data/profile'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          Hi, I'm {profile.name}
        </h1>
        <p className="hero-description">
          {profile.description}
        </p>
        <div className="hero-stats">
          {profile.stats.map((stat, index) => (
            <div key={index} className="stat">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
