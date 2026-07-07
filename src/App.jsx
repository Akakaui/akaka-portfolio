import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import MobileNav from './components/MobileNav'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import WorkPage from './pages/WorkPage'
import PlaygroundPage from './pages/PlaygroundPage'
import ContactPage from './pages/ContactPage'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light')
  const navigate = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const pages = {
    home: <HomePage navigate={navigate} />,
    about: <AboutPage navigate={navigate} />,
    work: <WorkPage />,
    playground: <PlaygroundPage navigate={navigate} />,
    contact: <ContactPage />,
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar currentPage={currentPage} navigate={navigate} theme={theme} toggleTheme={toggleTheme} />
      <TopBar />
      <main className="flex-1 min-h-screen pb-8 main-content">
        {pages[currentPage]}
      </main>
      <MobileNav currentPage={currentPage} navigate={navigate} />
    </div>
  )
}

export default App
