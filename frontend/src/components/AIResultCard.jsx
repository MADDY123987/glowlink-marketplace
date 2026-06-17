import { Link } from 'react-router-dom'
import { salons } from '../data/mockData'
import { salonsByHairstyle } from '../data/hairstyles'
import SalonCard from './SalonCard'

export default function AIResultCard({ hairstyleId, hairstyleName }) {
  const recommendedSalonIds = salonsByHairstyle(hairstyleId)
  const recommendedSalons = salons.filter((salon) => recommendedSalonIds.includes(salon.id))

  return (
    <div className="ai-result-card">
      <div className="result-message">
        <h2>Perfect! ✨</h2>
        <p>You can get this {hairstyleName} at these premium salons near you</p>
      </div>

      <div className="recommended-salons">
        {recommendedSalons.length > 0 ? (
          recommendedSalons.map((salon) => (
            <div key={salon.id} className="result-salon-item">
              <SalonCard salon={salon} compact />
              <Link to={`/booking/${salon.id}`} className="button button-primary" state={{ hairstyle: hairstyleName }}>
                Book This Stylist
              </Link>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p>No salons with this specific service yet. Explore all salons instead.</p>
            <Link to="/salons" className="button button-primary">
              Browse All Salons
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
