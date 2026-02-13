import { useState } from 'react'
import Hero from './components/Hero'
import Articles from './components/Articles'
import Navigation from './components/Navigation'
import Footer from './components/Footer'

function App() {
  const [activeSection, setActiveSection] = useState('hero')

  return (
    <div className="app">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="main-content">
        {activeSection === 'hero' && <Hero />}
        {activeSection === 'articles' && <Articles />}
      </main>
      <Footer />
    </div>
  )
}

export default App
