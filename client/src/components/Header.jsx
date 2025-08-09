import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900 border-b border-gray-700 w-full">
      <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="flex items-center space-x-2 text-2xl font-bold font-heading text-primary-400"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">G</span>
              </div>
              <span>Growly</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('how-it-works')}
              className=" bg-blue-900 text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-md transition-all duration-200 font-medium"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className=" bg-blue-900 text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-md transition-all duration-200 font-medium"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('demo')}
              className="bg-primary-900 hover:bg-primary-700 text-white px-4 py-2 rounded-md transition-all duration-200 font-medium"
            >
              Get Demo
            </button>
            <Link
              to="/admin"
              className="text-gray-300 bg-blue-900 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-md transition-all duration-200 font-medium"
            >
              Admin
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900 border-t border-gray-700">
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors font-medium"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors font-medium"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('demo')}
                className="block w-full text-left px-3 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors font-medium"
              >
                Get Demo
              </button>
              <Link
                to="/admin"
                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin Dashboard
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
