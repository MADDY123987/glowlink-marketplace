import { NavLink } from 'react-router-dom'

const links = [
  { label: 'Home', to: '/' },
  { label: 'Salons', to: '/salons' },
  { label: 'AI Assistant', to: '/ai-assistant' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  return (
    <header className="site-header">
      <div className="brand">
        <span className="brand-mark">Glow</span>Link
      </div>
      <nav className="site-nav">
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            {link.label}
          </NavLink>
        ))}
      </nav>
      <div className="nav-actions">
        <NavLink to="/login" className="button button-secondary">Sign in</NavLink>
        <NavLink to="/register" className="button button-primary">Get started</NavLink>
      </div>
    </header>
  )
}
