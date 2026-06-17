import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { salons } from '../data/mockData'
import ReviewCard from '../components/ReviewCard'
import SalonCard from '../components/SalonCard'
import ServiceCard from '../components/ServiceCard'

const galleryImages = [
  'https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=1200&q=80',
]

export default function SalonDetails() {
  const { id } = useParams()
  const salon = salons.find((item) => item.id === id) || salons[0]
  const [selectedService, setSelectedService] = useState('')
  const [galleryIndex, setGalleryIndex] = useState(0)
  const navigate = useNavigate()

  const filteredServices = useMemo(
    () => salon.services.filter((service) => selectedService === '' || service.name === selectedService),
    [salon.services, selectedService],
  )

  const handleBookNow = () => {
    const serviceId = selectedService || salon.services[0]?.name
    navigate(`/booking/${salon.id}`, { state: { serviceId } })
  }

  return (
    <div className="page-content salon-details-page">
      <div className="detail-hero detail-hero-gallery">
        <div className="detail-gallery-panel">
          <img src={galleryImages[galleryIndex]} alt={`${salon.name} gallery`} className="gallery-image" />
          <div className="gallery-thumbs">
            {galleryImages.map((image, index) => (
              <button
                key={image}
                type="button"
                className={index === galleryIndex ? 'gallery-thumb active' : 'gallery-thumb'}
                onClick={() => setGalleryIndex(index)}
              >
                <img src={image} alt={`Gallery ${index + 1}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="detail-hero-copy">
          <span className="eyebrow">Featured salon</span>
          <h1>{salon.name}</h1>
          <p>{salon.description}</p>
          <div className="detail-meta">
            <span>{salon.rating} ★ Rating</span>
            <span>{salon.location}</span>
            <span>From {salon.startingPrice}</span>
          </div>
          <button className="button button-primary" onClick={handleBookNow} type="button">
            Book Now
          </button>
        </div>
      </div>

      <section className="section-block">
        <div className="section-heading">
          <div>
            <h2>Available services</h2>
            <p>Filter for the perfect salon experience.</p>
          </div>
        </div>
        <div className="service-filter-row">
          <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)}>
            <option value="">All services</option>
            {salon.services.map((service) => (
              <option key={service.name} value={service.name}>{service.name}</option>
            ))}
          </select>
        </div>
        <div className="services-grid">
          {filteredServices.map((service) => (
            <ServiceCard key={service.name} service={service} />
          ))}
        </div>
      </section>

      <div className="detail-content-grid">
        <section className="glass-panel detail-panel">
          <h2>Team & stylists</h2>
          <div className="team-list">
            {salon.team.map((member) => (
              <div key={member.name} className="team-member">
                <strong>{member.name}</strong>
                <span>{member.title}</span>
              </div>
            ))}
          </div>
          <h3>Available slots</h3>
          <div className="slots-grid">
            {salon.availability.map((time) => (
              <button key={time} className="pill pill-light" type="button">{time}</button>
            ))}
          </div>
        </section>

        <section className="glass-panel detail-panel">
          <h2>Guest reviews</h2>
          <div className="review-summary-bar">
            <strong>{salon.rating} ★</strong>
            <span>{salon.reviews.length} reviews</span>
          </div>
          <div className="reviews-grid reviews-improved">
            {salon.reviews.map((review) => (
              <ReviewCard key={review.author} review={review} />
            ))}
          </div>
        </section>
      </div>

      <section className="section-block similar-panel">
        <div className="section-heading">
          <div>
            <h2>Similar salons</h2>
            <p>Other premium salons for your next beauty treatment.</p>
          </div>
        </div>
        <div className="salon-grid">
          {salons.filter((other) => other.id !== salon.id).map((other) => (
            <SalonCard key={other.id} salon={other} />
          ))}
        </div>
      </section>
    </div>
  )
}
