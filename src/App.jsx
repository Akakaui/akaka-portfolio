import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import MobileNav from './components/MobileNav'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import WorkPage from './pages/WorkPage'
import PlaygroundPage from './pages/PlaygroundPage'
import ContactPage from './pages/ContactPage'
import ProjectPage from './pages/ProjectPage'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [currentProject, setCurrentProject] = useState(null)
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light')
  const navigate = (page, data = null) => {
    if (page === 'project' && data) {
      setCurrentProject(data)
    }
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const pages = {
    home: <HomePage navigate={navigate} />,
    about: <AboutPage navigate={navigate} />,
    work: <WorkPage navigate={navigate} />,
    playground: <PlaygroundPage navigate={navigate} />,
    contact: <ContactPage />,
    project: <ProjectPage navigate={navigate} project={currentProject} />
  }

  const bgImages = {
    home: 'url(/images/bg-earth-night.png)',
    about: 'url(/images/bg-astronaut.png)',
    work: 'url(/images/bg-earth-night.png)', 
    playground: 'none',
    contact: 'url(/images/bg-sunrise.png)',
    project: 'url(/images/bg-earth-night.png)'
  }

  return (
    <div className="flex min-h-screen" style={{
      backgroundImage: theme === 'dark' ? bgImages[currentPage] : 'none',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      backgroundRepeat: 'no-repeat'
    }}>
      <Sidebar currentPage={currentPage} navigate={navigate} theme={theme} toggleTheme={toggleTheme} />
      <TopBar />
      <main className="flex-1 min-h-screen pb-8 main-content" style={{ zIndex: 1, position: 'relative' }}>
        {pages[currentPage]}
      </main>
      <MobileNav currentPage={currentPage} navigate={navigate} />
    </div>
  )
}

export default App
