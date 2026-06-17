import { Link } from 'react-router-dom'

export default function Register() {
  return (
    <div className="auth-page">
      <div className="auth-panel glass-panel">
        <span className="eyebrow">Join GlowLink</span>
        <h1>Create your account</h1>
        <form className="auth-form">
          <label>
            Full name
            <input type="text" placeholder="Your name" />
          </label>
          <label>
            Email
            <input type="email" placeholder="you@example.com" />
          </label>
          <label>
            Password
            <input type="password" placeholder="Create password" />
          </label>
          <button className="button button-primary">Create account</button>
        </form>
        <p className="auth-footnote">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
