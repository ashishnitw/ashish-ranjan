export default function Navigation({ activeSection, setActiveSection }) {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <button
          onClick={() => setActiveSection('hero')}
          className="nav-logo"
        >
          Ashish Ranjan
        </button>
        <div className="nav-links">
          <button
            className={`nav-link ${activeSection === 'articles' ? 'active' : ''}`}
            onClick={() => setActiveSection('articles')}
          >
            Writing
          </button>
          <button
            className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
            onClick={() => setActiveSection('contact')}
          >
            Contact
          </button>
        </div>
      </div>
    </nav>
  )
}
