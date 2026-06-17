# GlowLink Frontend: Code Changes for Demo & MVP

**Purpose:** Specific, actionable code modifications to fix demo blockers and prepare for Keycloak integration

---

## PRIORITY 1: DEMO BLOCKERS (Do These First)

### 1. Expand Mock Data (10 mins) 
**File:** `src/data/mockData.js`  
**Change:** Add 10 more salons to avoid empty search results

**Current:** 2 salons  
**After:** 12 salons

```javascript
// Add these to the salons array
{
  id: 'salon-03',
  name: 'Glow & Groom Studio',
  rating: 4.7,
  location: 'Midtown · 0.5 mi',
  startingPrice: '$60',
  image: 'https://images.unsplash.com/photo-1562196657-0d7e7e6c9f0f?auto=format&fit=crop&w=900&q=80',
  description: 'Modern unisex salon with trendy cuts and vibrant colors.',
  services: [
    { name: 'Fade Haircut', description: 'Sharp, clean lines.', price: '$35', duration: '30 min' },
    { name: 'Undercut Design', description: 'Precision undercut styling.', price: '$50', duration: '45 min' },
  ],
  team: [
    { name: 'James Park', title: 'Master Barber' },
    { name: 'Chris Miguel', title: 'Stylist' },
  ],
  reviews: [
    { author: 'Marcus', rating: 5, comment: 'Best barber in town.' },
    { author: 'Alex', rating: 4.8, comment: 'Quick and professional.' },
  ],
  availability: ['9:00 AM', '10:30 AM', '1:00 PM', '3:30 PM'],
  bestFor: ['Haircut', 'Makeup'],
},
// ... add 9 more similar salons with different names, services, locations
```

**Why:** Demo shows "no results" when searching because only 2 salons exist.

---

### 2. Fix Contact Form Submission (20 mins)
**File:** `src/pages/Contact.jsx`

**Current Code:**
```javascript
export default function Contact() {
  return (
    <div className="contact-grid">
      <section className="glass-panel contact-form-panel">
        <h2>Contact form</h2>
        <form className="contact-form">
          {/* No onSubmit handler */}
          <label>
            Name
            <input type="text" placeholder="Your name" />
          </label>
          {/* ... other fields ... */}
          <button className="button button-primary">Send message</button>
        </form>
      </section>
    </div>
  )
}
```

**Fixed Code:**
```javascript
import { useState } from 'react'
import { faqItems } from '../data/mockData'
import { useToast } from '../components/ToastProvider'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.warning('Please fill in all fields')
      return
    }

    setLoading(true)
    try {
      // TODO: Replace with real API call after backend ready
      // await apiClient.post('/contact', formData)
      
      toast.success('Message sent! We\'ll get back to you soon.')
      setFormData({ name: '', email: '', message: '' })
    } catch (err) {
      toast.error('Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-content contact-page">
      {/* ... hero section ... */}
      <div className="contact-grid">
        <section className="glass-panel contact-form-panel">
          <h2>Contact form</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              Name
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name" 
              />
            </label>
            <label>
              Email
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com" 
              />
            </label>
            <label>
              Message
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us how we can help" 
                rows="5" 
              />
            </label>
            <button 
              className="button button-primary" 
              type="submit"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send message'}
            </button>
          </form>
        </section>

        <section className="glass-panel faq-panel">
          {/* ... FAQ ... */}
        </section>
      </div>
    </div>
  )
}
```

**Why:** Currently clicking submit does nothing. Users need feedback that message was sent.

---

### 3. Add Price to Booking Summary (30 mins)
**File:** `src/pages/booking/BookingFlow.jsx`

**Current Code:**
```javascript
const summary = useMemo(
  () => ({
    salon: salon.name,
    service,
    stylist,
    date,
    time,
  }),
  [salon.name, service, stylist, date, time],
)
```

**Fixed Code:**
```javascript
const summary = useMemo(() => {
  const selectedService = salon.services.find(s => s.name === service)
  return {
    salon: salon.name,
    service,
    stylist,
    date,
    time,
    price: selectedService?.price || 'TBD',
    duration: selectedService?.duration || 'TBD',
    total: selectedService?.price || '$0.00', // In real app: calculate with tax
  }
}, [salon.name, service, stylist, date, time, salon.services])
```

**Update Summary Step Display:**
```javascript
{step === 4 && (
  <div>
    <h2>Booking summary</h2>
    <div className="summary-details">
      <div className="summary-row">
        <span>Salon:</span>
        <strong>{summary.salon}</strong>
      </div>
      <div className="summary-row">
        <span>Service:</span>
        <strong>{summary.service}</strong>
      </div>
      <div className="summary-row">
        <span>Stylist:</span>
        <strong>{summary.stylist}</strong>
      </div>
      <div className="summary-row">
        <span>Duration:</span>
        <strong>{summary.duration}</strong>
      </div>
      <div className="summary-row">
        <span>Date:</span>
        <strong>{summary.date}</strong>
      </div>
      <div className="summary-row">
        <span>Time:</span>
        <strong>{summary.time}</strong>
      </div>
      {/* NEW: Show price breakdown */}
      <div className="summary-divider"></div>
      <div className="summary-row highlight">
        <span>Service Price:</span>
        <strong>{summary.price}</strong>
      </div>
      <div className="summary-row highlight">
        <span>Total:</span>
        <strong style={{ fontSize: '1.2em' }}>{summary.total}</strong>
      </div>
    </div>

    <button 
      className="button button-primary full-width"
      onClick={handleSubmit}
      disabled={loading}
    >
      {loading ? 'Booking...' : 'Confirm & Book Now'}
    </button>
  </div>
)}
```

**Add CSS:**
```css
.summary-details {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin: 1.5rem 0;
  padding: 1rem;
  background: rgba(255,255,255,0.05);
  border-radius: 0.5rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
}

.summary-row.highlight {
  border-top: 1px solid rgba(255,255,255,0.2);
  padding-top: 1rem;
  font-size: 1.1em;
}

.summary-divider {
  height: 1px;
  background: rgba(255,255,255,0.2);
  margin: 0.5rem 0;
}

.full-width {
  width: 100%;
}
```

**Why:** Users don't know how much the booking costs. Shows incomplete flow.

---

### 4. Improve Register Form (30 mins)
**File:** `src/pages/Register.jsx`

**Current Code:**
```javascript
export default function Register() {
  return (
    <div className="auth-page">
      <div className="auth-panel glass-panel">
        <span className="eyebrow">Join GlowLink</span>
        <h1>Create your account</h1>
        <form className="auth-form">
          {/* No validation, no submission handler */}
          <label>
            Full name
            <input type="text" placeholder="Your name" />
          </label>
          {/* ... more fields ... */}
          <button className="button button-primary">Create account</button>
        </form>
      </div>
    </div>
  )
}
```

**Fixed Code:**
```javascript
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useToast } from '../components/ToastProvider'

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const toast = useToast()

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required'
    }

    if (!formData.email.includes('@')) {
      newErrors.email = 'Please enter a valid email'
    }

    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      toast.warning('Please fix the errors below')
      return
    }

    setLoading(true)
    try {
      // TODO: Replace with real Keycloak registration call
      // const response = await keycloak.register({
      //   username: formData.email,
      //   email: formData.email,
      //   firstName: formData.name.split(' ')[0],
      //   lastName: formData.name.split(' ')[1] || ''
      // })

      toast.success('Account created! Please sign in.')
      navigate('/login')
    } catch (err) {
      toast.error('Failed to create account. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-panel glass-panel">
        <span className="eyebrow">Join GlowLink</span>
        <h1>Create your account</h1>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Full name
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name" 
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </label>
          <label>
            Email
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com" 
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </label>
          <label>
            Password
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create password (min 8 chars)" 
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </label>
          <label>
            Confirm password
            <input 
              type="password" 
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password" 
            />
            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
          </label>
          <button 
            className="button button-primary" 
            type="submit"
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>
        <p className="auth-footnote">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
```

**Add CSS:**
```css
.error {
  display: block;
  color: #ff6b6b;
  font-size: 0.85em;
  margin-top: 0.25rem;
}
```

**Why:** Currently form is stub-only. Adding validation shows thoughtfulness.

---

### 5. Enhance AI Assistant (1 hour)
**File:** `src/pages/AIAssistant.jsx`

**Current Code:**
```javascript
const submitMessage = () => {
  if (!draft.trim()) return
  setMessages((prev) => [...prev, { id: prev.length + 1, from: 'user', text: draft }])
  setMessages((prev) => [...prev, { 
    id: prev.length + 2, 
    from: 'assistant', 
    text: 'I recommend a fresh glow facial paired with a soft balayage treatment.' // ← ALWAYS THIS
  }])
  setDraft('')
}
```

**Fixed Code:**
```javascript
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { aiRecommendations, salons } from '../data/mockData'

const suggestions = [
  { 
    keywords: ['balayage', 'blonde', 'color', 'highlights'],
    recommendation: 'A fresh balayage with soft, natural highlights would look stunning.',
    salons: ['salon-01'] // Luxe Glow Studio
  },
  { 
    keywords: ['facial', 'skin', 'skincare', 'glow'],
    recommendation: 'A luxe facial treatment would give you that radiant glow you\'re looking for.',
    salons: ['salon-02'] // Velvet Bloom Salon
  },
  { 
    keywords: ['pixie', 'short', 'cut', 'bob'],
    recommendation: 'A precision short cut would be perfect. I recommend our expert stylists for that.',
    salons: ['salon-01']
  },
  { 
    keywords: ['makeup', 'glam', 'evening', 'wedding'],
    recommendation: 'Professional makeup styling to make you feel confident and beautiful.',
    salons: ['salon-02']
  }
]

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    { id: 1, from: 'assistant', text: 'Hi there! Tell me about your beauty goals today.' },
  ])
  const [draft, setDraft] = useState('')
  const navigate = useNavigate()

  const getRecommendation = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase()
    
    // Find matching suggestion
    const match = suggestions.find(s => 
      s.keywords.some(keyword => lowerMessage.includes(keyword))
    )

    if (match) {
      return match
    }

    // Default response
    return {
      recommendation: 'That sounds great! I recommend exploring our featured salons below to find the perfect match.',
      salons: ['salon-01', 'salon-02']
    }
  }

  const submitMessage = async () => {
    if (!draft.trim()) return

    const userMessage = draft
    setMessages((prev) => [...prev, { 
      id: prev.length + 1, 
      from: 'user', 
      text: userMessage 
    }])

    // Simulate AI thinking
    await new Promise(resolve => setTimeout(resolve, 500))

    const recommendation = getRecommendation(userMessage)
    const matchingSalons = salons.filter(s => recommendation.salons.includes(s.id))
    
    const assistantMessage = `${recommendation.recommendation} ${
      matchingSalons.length > 0 
        ? `I found ${matchingSalons.length} perfect salon(s) for you!`
        : ''
    }`

    setMessages((prev) => [...prev, { 
      id: prev.length + 2, 
      from: 'assistant', 
      text: assistantMessage,
      matchingSalons: matchingSalons
    }])

    setDraft('')
  }

  const handleBookService = (salonId, serviceName) => {
    navigate(`/booking/${salonId}`, { state: { serviceId: serviceName } })
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submitMessage()
    }
  }

  return (
    <div className="page-content ai-page">
      <div className="page-header">
        <span className="eyebrow">Beauty AI</span>
        <h1>Your personalized AI beauty assistant</h1>
      </div>

      <div className="ai-layout">
        <section className="assistant-panel glass-panel">
          <div className="assistant-messages">
            {messages.map((message) => (
              <div key={message.id}>
                <div className={`message ${message.from}`}>
                  {message.text}
                </div>
                
                {/* Show matching salons if AI message has them */}
                {message.from === 'assistant' && message.matchingSalons && (
                  <div className="matched-salons">
                    {message.matchingSalons.map((salon) => (
                      <div key={salon.id} className="matched-salon-card">
                        <div>
                          <strong>{salon.name}</strong>
                          <p>{salon.location}</p>
                        </div>
                        <button 
                          className="button button-small"
                          onClick={() => handleBookService(salon.id, salon.services[0]?.name)}
                        >
                          Book
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="assistant-input">
            <input 
              value={draft} 
              onChange={(e) => setDraft(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about hairstyles, skin rituals, or salon picks..." 
            />
            <button 
              className="button button-primary" 
              onClick={submitMessage}
              disabled={!draft.trim()}
            >
              Send
            </button>
          </div>
        </section>

        <aside className="recommendation-panel glass-panel">
          <h2>Beauty recommendations</h2>
          <p>Suggested looks and treatments crafted by GlowLink AI.</p>
          <div className="recommendation-list">
            {aiRecommendations.map((item) => (
              <div key={item.title} className="recommendation-card">
                <strong>{item.title}</strong>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}
```

**Add CSS:**
```css
.matched-salons {
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.matched-salon-card {
  background: rgba(255,255,255,0.1);
  padding: 0.75rem;
  border-radius: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.matched-salon-card strong {
  display: block;
  margin-bottom: 0.25rem;
}

.matched-salon-card p {
  font-size: 0.85em;
  opacity: 0.8;
  margin: 0;
}

.button-small {
  padding: 0.5rem 1rem;
  font-size: 0.9em;
}
```

**Why:** AI responses are currently generic. This makes it actually respond to user input.

---

## PRIORITY 2: PREPARATION FOR KEYCLOAK (Do These Next)

### 6. Prepare API Client for Keycloak (15 mins)
**File:** `src/services/api.js`

**Current Code:**
```javascript
import axios from 'axios'

const apiClient = axios.create({
  baseURL: '/api',
  timeout: 8000,
  headers: { 'Content-Type': 'application/json' },
})

export async function fetchSalons() {
  const response = await apiClient.get('/salons')
  return response.data
}

// ... other functions

export default apiClient
```

**Add Keycloak Integration Points:**
```javascript
import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 8000,
  headers: { 'Content-Type': 'application/json' },
})

// WILL BE ADDED AFTER KEYCLOAK INTEGRATION
// import keycloak from './keycloak'
// 
// apiClient.interceptors.request.use((config) => {
//   if (keycloak?.token) {
//     config.headers.Authorization = `Bearer ${keycloak.token}`
//   }
//   return config
// })
//
// apiClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response?.status === 401 && keycloak) {
//       try {
//         await keycloak.refreshToken()
//         return apiClient.request(error.config)
//       } catch (err) {
//         keycloak.logout()
//       }
//     }
//     return Promise.reject(error)
//   }
// )

// API endpoints
export async function fetchSalons() {
  const response = await apiClient.get('/salons')
  return response.data
}

export async function fetchSalonDetails(id) {
  const response = await apiClient.get(`/salons/${id}`)
  return response.data
}

export async function submitBooking(booking) {
  const response = await apiClient.post('/bookings', booking)
  return response.data
}

// NEW: User endpoints (prepared for integration)
export async function getUserProfile() {
  const response = await apiClient.get('/user/profile')
  return response.data
}

export async function updateUserProfile(data) {
  const response = await apiClient.put('/user/profile', data)
  return response.data
}

export async function getUserBookings() {
  const response = await apiClient.get('/user/bookings')
  return response.data
}

export async function cancelBooking(bookingId) {
  const response = await apiClient.delete(`/bookings/${bookingId}`)
  return response.data
}

export async function submitContact(data) {
  const response = await apiClient.post('/contact', data)
  return response.data
}

export default apiClient
```

**Add .env.local:**
```
VITE_API_BASE_URL=http://localhost:3000/api
VITE_KEYCLOAK_URL=http://localhost:8080
VITE_KEYCLOAK_REALM=glowlink
VITE_KEYCLOAK_CLIENT=glowlink-frontend
```

**Why:** Prepares API for Keycloak auth headers without breaking current mock flow.

---

### 7. Stub Login/Register for Keycloak (1 hour)
**File:** `src/pages/Login.jsx`

**Current Code:**
```javascript
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
```

**Updated for Keycloak (Future):**
```javascript
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useToast } from '../components/ToastProvider'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const toast = useToast()

  // TODO: After Keycloak integration
  // useEffect(() => {
  //   const keycloak = window.keycloak
  //   if (keycloak?.authenticated) {
  //     navigate('/dashboard')
  //   }
  // }, [navigate])

  const handleKeycloakLogin = () => {
    // TODO: After Keycloak integration
    // window.keycloak.login()
    toast.info('Keycloak login coming soon. Using demo mode.')
    navigate('/dashboard')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please enter both email and password.')
      toast.warning('Fill in both email and password.')
      return
    }

    // For demo: accept any email/password
    // After Keycloak: remove this and use Keycloak login above
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
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="you@example.com" 
            />
          </label>
          <label>
            Password
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="••••••••" 
            />
          </label>
          <button className="button button-primary" type="submit">
            Continue
          </button>
        </form>
        <Link to="/forgot-password" className="link-muted">
          Forgot password?
        </Link>
        <p className="auth-footnote">
          New to GlowLink? <Link to="/register">Create an account</Link>
        </p>
        
        {/* TODO: Add after Keycloak setup */}
        {/* <div className="divider">or</div>
        <button className="button button-secondary full-width" onClick={handleKeycloakLogin}>
          Sign in with SSO
        </button> */}
      </div>
    </div>
  )
}
```

**Why:** Prepares login page for future Keycloak integration without breaking current demo.

---

### 8. Fix Dashboard Hardcoded User (30 mins)
**File:** `src/pages/Dashboard.jsx`

**Current Code:**
```javascript
export default function Dashboard() {
  return (
    <label>
      Name
      <input type="text" defaultValue="Aanya Patel" />  // ← HARDCODED
    </label>
  )
}
```

**Fixed Code (With Comments for Keycloak):**
```javascript
import { useEffect, useState } from 'react'
import { useToast } from '../components/ToastProvider'
import { userBookings, savedSalons } from '../data/mockData'

export default function Dashboard() {
  const [user, setUser] = useState({
    name: 'Demo User',
    email: 'user@example.com',
    phone: ''
  })
  const [bookings, setBookings] = useState(userBookings)
  const [salons, setSalons] = useState(savedSalons)
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  useEffect(() => {
    // TODO: After Keycloak integration, replace with real data
    // const keycloak = window.keycloak
    // if (keycloak?.idTokenParsed) {
    //   setUser({
    //     name: `${keycloak.idTokenParsed.given_name} ${keycloak.idTokenParsed.family_name}`,
    //     email: keycloak.idTokenParsed.email,
    //     phone: ''
    //   })
    // }
    // fetchUserBookings()
    // fetchUserSalons()
  }, [])

  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setUser(prev => ({ ...prev, [name]: value }))
  }

  const handleSaveProfile = async () => {
    setLoading(true)
    try {
      // TODO: Call API endpoint after Keycloak integration
      // await updateUserProfile(user)
      
      toast.success('Profile updated successfully!')
    } catch (err) {
      toast.error('Failed to save profile.')
    } finally {
      setLoading(false)
    }
  }

  const handleCancelBooking = async (bookingId) => {
    // TODO: Implement after backend
    toast.warning('Cancellation feature coming soon')
  }

  return (
    <div className="page-content dashboard-page">
      <div className="page-header">
        <span className="eyebrow">Your account</span>
        <h1>Welcome back, {user.name}</h1>
      </div>

      <section className="dashboard-grid">
        <div className="dashboard-card glass-panel">
          <h2>Upcoming bookings</h2>
          {bookings.length > 0 ? (
            <>
              {bookings.map((booking) => (
                <div key={booking.id} className="booking-list-item">
                  <div>
                    <strong>{booking.service}</strong>
                    <p>{booking.salon}</p>
                    <span className="booking-date">{booking.date} at {booking.time}</span>
                  </div>
                  <div className="booking-actions">
                    <button className="link-muted" onClick={() => handleCancelBooking(booking.id)}>
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p className="empty-state">No upcoming bookings. <a href="/salons">Browse salons</a></p>
          )}
        </div>

        <div className="dashboard-card glass-panel">
          <h2>Saved salons</h2>
          {salons.length > 0 ? (
            <>
              {salons.map((salon) => (
                <div key={salon.name} className="saved-salon-item">
                  <strong>{salon.name}</strong>
                  <p>{salon.location}</p>
                </div>
              ))}
            </>
          ) : (
            <p className="empty-state">No saved salons yet.</p>
          )}
        </div>

        <div className="dashboard-card glass-panel profile-panel">
          <h2>Profile settings</h2>
          <label>
            Name
            <input 
              type="text" 
              name="name"
              value={user.name}
              onChange={handleProfileChange}
            />
          </label>
          <label>
            Email
            <input 
              type="email" 
              name="email"
              value={user.email}
              onChange={handleProfileChange}
              disabled // Email typically managed by Keycloak
            />
          </label>
          <label>
            Phone
            <input 
              type="tel" 
              name="phone"
              value={user.phone}
              onChange={handleProfileChange}
              placeholder="(555) 123-4567"
            />
          </label>
          <button 
            className="button button-secondary"
            onClick={handleSaveProfile}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save changes'}
          </button>
        </div>
      </section>
    </div>
  )
}
```

**Add CSS:**
```css
.booking-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.booking-date {
  display: block;
  font-size: 0.85em;
  opacity: 0.7;
  margin-top: 0.25rem;
}

.empty-state {
  padding: 1rem;
  text-align: center;
  opacity: 0.6;
}

.empty-state a {
  color: inherit;
  text-decoration: underline;
}
```

**Why:** Hardcoded "Aanya Patel" looks bad in demo. Now shows generic "Demo User" until Keycloak integration.

---

### 9. Create Keycloak Service File (Stub) (10 mins)
**File:** `src/services/keycloak.js`

```javascript
// This file will be populated after Keycloak is configured
// For now, exports stub to prevent import errors

let keycloakInstance = null

export const initKeycloak = async () => {
  // TODO: Initialize Keycloak after configuration
  // const Keycloak = window.Keycloak
  // keycloakInstance = new Keycloak({
  //   url: import.meta.env.VITE_KEYCLOAK_URL,
  //   realm: import.meta.env.VITE_KEYCLOAK_REALM,
  //   clientId: import.meta.env.VITE_KEYCLOAK_CLIENT
  // })
  // 
  // return await keycloakInstance.init({
  //   onLoad: 'login-required',
  //   flow: 'standard'
  // })
  
  console.warn('Keycloak not initialized. Using demo mode.')
  return true
}

export const getKeycloak = () => keycloakInstance

export default keycloakInstance
```

**Why:** Prepares import structure for when Keycloak is added.

---

## SUMMARY: What To Do

### ✅ For Demo (4 hours total)
1. **Expand mockData** (10 min) - Add 10 more salons
2. **Contact form** (20 min) - Add submission handler
3. **Booking price** (30 min) - Show total in summary
4. **Register validation** (30 min) - Add form checks
5. **AI Assistant** (60 min) - Match keywords to salons
6. **API client prep** (15 min) - Add Keycloak comments
7. **Dashboard improvements** (30 min) - Better user display
8. **Login stubs** (15 min) - Comment out Keycloak for future

**Total: ~3-4 hours**

### ✅ For MVP (2-3 days)
1. Install keycloak-js
2. Initialize Keycloak in App.jsx
3. Wire 5 API endpoints
4. Create ProtectedRoute component
5. Add logout button
6. Test token refresh

### ✅ For Production (2 weeks)
1. Payment integration
2. Real AI backend
3. Admin dashboard
4. Email notifications
5. Review system
