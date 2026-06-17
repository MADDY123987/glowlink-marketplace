import { Link } from 'react-router-dom'

export default function ForgotPassword() {
  return (
    <div className="auth-page">
      <div className="auth-panel glass-panel">
        <span className="eyebrow">Reset access</span>
        <h1>Forgot your password?</h1>
        <p>Enter your email and we’ll send a reset link right away.</p>
        <form className="auth-form">
          <label>
            Email
            <input type="email" placeholder="you@example.com" />
          </label>
          <button className="button button-primary">Send reset link</button>
        </form>
        <p className="auth-footnote">
          Remembered your password? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
