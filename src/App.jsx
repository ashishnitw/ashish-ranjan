import { useState } from 'react'
import Hero from './components/Hero'
import Articles from './components/Articles'
import Contact from './components/Contact'
import Navigation from './components/Navigation'

function App() {
  const [activeSection, setActiveSection] = useState('hero')

  return (
    <div className="app">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="main-content">
        {activeSection === 'hero' && <Hero />}
        {activeSection === 'articles' && <Articles />}
        {activeSection === 'contact' && <Contact />}
      </main>
      <footer className="footer">
        <p>&copy; 2026 Ashish Ranjan. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
