import { Link, useLocation } from 'react-router-dom'

export default function Navigation() {
  const location = useLocation()

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          A
        </Link>
        <div className="nav-links">
          <Link
            to="/writings"
            className={`nav-link ${location.pathname === '/writings' ? 'active' : ''}`}
          >
            Writing
          </Link>
        </div>
      </div>
    </nav>
  )
}
