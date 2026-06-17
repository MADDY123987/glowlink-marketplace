import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useToast } from '../components/ToastProvider'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const toast = useToast()

  const handleSubmit = (event) => {
    event.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please enter both email and password.')
      toast.warning('Fill in both email and password.')
      return
    }

    toast.success('Login successful. Welcome back!')
    navigate('/dashboard')
  }

  return (
    <div className="auth-page">
      <div className="auth-panel glass-panel">
        <span className="eyebrow">Welcome back</span>
        <h1>Sign in to GlowLink</h1>
        <form className="auth-form" onSubmit={handleSubmit}>
          {error && <div className="alert alert-error">{error}</div>}
          <label>
            Email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
          </label>
          <label>
            Password
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
          </label>
          <button className="button button-primary" type="submit">Continue</button>
        </form>
        <Link to="/forgot-password" className="link-muted">Forgot password?</Link>
        <p className="auth-footnote">
          New to GlowLink? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </div>
  )
}
