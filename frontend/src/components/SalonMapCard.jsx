import { Link } from 'react-router-dom'

export default function SalonMapCard({ salon, distance, userLocation, isSelected, onSelect }) {
  return (
    <div className={`salon-map-card ${isSelected ? 'selected' : ''}`} onClick={onSelect}>
      <div className="card-header">
        <h3>{salon.name}</h3>
        <div className="distance-badge">
          <span className="distance-value">{distance}</span>
          <span className="distance-unit">away</span>
        </div>
      </div>

      <div className="card-body">
        <img src={salon.image} alt={salon.name} className="salon-image" />

        <div className="card-details">
          <div className="rating">
            <span className="stars">⭐ {salon.rating}</span>
            <span className="reviews">({salon.reviews.length})</span>
          </div>

          <p className="location">📍 {salon.location}</p>

          <div className="price-range">Starting from {salon.startingPrice}</div>

          <p className="description">{salon.description}</p>

          <div className="salon-services">
            <div className="service-tag">{salon.services.length} Services</div>
            <div className="team-tag">{salon.team.length} Stylists</div>
          </div>
        </div>

        <Link to={`/salons/${salon.id}`} className="button button-primary button-full">
          View Details
        </Link>
      </div>
    </div>
  )
}
