import { userBookings, savedSalons } from '../data/mockData'

export default function Dashboard() {
  return (
    <div className="page-content dashboard-page">
      <div className="page-header">
        <span className="eyebrow">Your account</span>
        <h1>Welcome back, beauty seeker</h1>
      </div>

      <section className="dashboard-grid">
        <div className="dashboard-card glass-panel">
          <h2>Upcoming bookings</h2>
          {userBookings.map((booking) => (
            <div key={booking.id} className="booking-list-item">
              <div>
                <strong>{booking.service}</strong>
                <p>{booking.salon}</p>
              </div>
              <span>{booking.date}</span>
            </div>
          ))}
        </div>

        <div className="dashboard-card glass-panel">
          <h2>Saved salons</h2>
          {savedSalons.map((salon) => (
            <div key={salon.name} className="saved-salon-item">
              <strong>{salon.name}</strong>
              <p>{salon.location}</p>
            </div>
          ))}
        </div>

        <div className="dashboard-card glass-panel profile-panel">
          <h2>Profile settings</h2>
          <label>
            Name
            <input type="text" defaultValue="Aanya Patel" />
          </label>
          <label>
            Email
            <input type="email" defaultValue="aanya@example.com" />
          </label>
          <button className="button button-secondary">Save changes</button>
        </div>
      </section>
    </div>
  )
}
