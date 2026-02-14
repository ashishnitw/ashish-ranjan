import { Routes, Route } from 'react-router-dom'
import Hero from './components/Hero'
import Articles from './components/Articles'
import ArticleDetail from './components/ArticleDetail'
import Navigation from './components/Navigation'
import Footer from './components/Footer'

function App() {
  return (
    <div className="app">
      <Navigation />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:slug" element={<ArticleDetail />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
