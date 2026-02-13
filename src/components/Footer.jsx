import { profile } from '../data/profile'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">&copy; 2026 {profile.name}</p>
        <div className="footer-links">
          {profile.contactLinks.map(link => (
            <a
              key={link.id}
              href={link.url}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="footer-link"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
