import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  const location = useLocation()

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <span className="navbar-logo">
            <span className="material-icons-round">route</span>
          </span>
          <span className="navbar-title">SmartFlow</span>
        </Link>

        <div className="navbar-links">
          <Link to="/" className={`navbar-link ${location.pathname === '/' ? 'active' : ''}`}>
            Home
          </Link>
          <Link to="/dashboard" className={`navbar-link ${location.pathname === '/dashboard' ? 'active' : ''}`}>
            Dashboard
          </Link>
          <Link to="/about" className={`navbar-link ${location.pathname === '/about' ? 'active' : ''}`}>
            About
          </Link>
        </div>

        <Link to="/dashboard" className="btn btn-primary navbar-cta">
          <span className="material-icons-round" style={{ fontSize: '18px' }}>bolt</span>
          Open Dashboard
        </Link>
      </div>
    </nav>
  )
}
