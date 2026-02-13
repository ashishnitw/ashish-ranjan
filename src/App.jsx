import { Routes, Route } from 'react-router-dom'
import Hero from './components/Hero'
import Articles from './components/Articles'
import Navigation from './components/Navigation'
import Footer from './components/Footer'

function App() {
  return (
    <div className="app">
      <Navigation />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/writings" element={<Articles />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
