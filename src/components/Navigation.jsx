import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/logo.jpg'
import { NAVIGATION } from '../config/constants'

export default function Navigation() {
  const location = useLocation()

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <img src={logo} alt="Logo" className="logo-image" />
        </Link>
        <div className="nav-links">
          <Link
            to="/writings"
            className={`nav-link ${location.pathname === '/writings' ? 'active' : ''}`}
          >
            {NAVIGATION.WRITING}
          </Link>
        </div>
      </div>
    </nav>
  )
}
