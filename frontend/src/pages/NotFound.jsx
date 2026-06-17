import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="page-content notfound-page">
      <div className="notfound-card glass-panel">
        <span className="eyebrow">404</span>
        <h1>Page not found</h1>
        <p>The page you’re looking for doesn’t exist yet. Return to the GlowLink homepage.</p>
        <Link to="/" className="button button-primary">Go home</Link>
      </div>
    </div>
  )
}
