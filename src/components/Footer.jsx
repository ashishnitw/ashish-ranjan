import { profile } from '../data/profile'
import { FOOTER } from '../config/constants'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">{FOOTER.COPYRIGHT_TEXT} {profile.name}</p>
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
