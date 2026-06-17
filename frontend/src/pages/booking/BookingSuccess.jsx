import { Link } from 'react-router-dom'

export default function BookingSuccess() {
  return (
    <div className="page-content booking-page success-page">
      <div className="glass-panel success-card">
        <span className="eyebrow">Success</span>
        <h1>Your appointment is confirmed</h1>
        <p>GlowLink has reserved your slot. Check your dashboard for details and upcoming bookings.</p>
        <Link to="/dashboard" className="button button-primary">Go to dashboard</Link>
      </div>
    </div>
  )
}
