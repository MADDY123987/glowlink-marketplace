import { useState } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import CategoryCard from '../components/CategoryCard'
import SalonCard from '../components/SalonCard'
import TestimonialCard from '../components/TestimonialCard'
import { LocationStatusUI } from '../components/LocationStatus'
import { categories, salons, testimonials } from '../data/mockData'

export default function Home() {
  const [search, setSearch] = useState('')
  const [locationStatus, setLocationStatus] = useState('idle')
  const [userLocation, setUserLocation] = useState(null)
  const [nearbySalons, setNearbySalons] = useState([])
  
  const featured = salons.slice(0, 2)

  const handleLocationRequest = () => {
    if (!navigator.geolocation) {
      setLocationStatus('denied')
      return
    }

    setLocationStatus('requesting')
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
        setLocationStatus('granted')
        // Mock: show all salons as nearby
        setNearbySalons(salons)
      },
      () => {
        setLocationStatus('denied')
      }
    )
  }

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">AI-powered beauty marketplace</span>
          <h1>Discover Your Perfect Beauty Experience</h1>
          <p>Browse premium salons, compare services, and book appointments with confidence.</p>
          <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
          <div className="hero-actions">
            <Link to="/salons" className="button button-primary">Explore salons</Link>
            <Link to="/ai-hairstyle-preview" className="button button-secondary">Try hairstyles</Link>
          </div>
        </div>
        <div className="hero-image" />
      </section>

      <section className="section-block">
        <div className="section-heading">
          <span>Popular categories</span>
          <Link to="/salons" className="link-muted">See all</Link>
        </div>
        <div className="categories-grid">
          {categories.map((category) => (
            <CategoryCard key={category.title} {...category} />
          ))}
        </div>
      </section>

      <section className="section-block glass-panel">
        <div className="section-heading">
          <div>
            <h2>Featured salons</h2>
            <p>Trusted salons with top-rated experiences and curated beauty services.</p>
          </div>
          <Link to="/salons" className="link-muted">View all salons</Link>
        </div>
        <div className="salon-grid">
          {featured.map((salon) => (
            <SalonCard key={salon.id} salon={salon} />
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div>
            <h2>What beauty lovers say</h2>
            <p>Real reviews from people who found their glow with GlowLink.</p>
          </div>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </div>
      </section>

      <section className="section-block salons-near-section">
        <div className="section-heading">
          <div>
            <h2>Salons near you</h2>
            <p>Find beauty services in your area with just one tap.</p>
          </div>
        </div>
        <LocationStatusUI
          locationStatus={locationStatus}
          userLocation={userLocation}
          error={null}
          onRequestLocation={handleLocationRequest}
        />
        {locationStatus === 'granted' && nearbySalons.length > 0 && (
          <div className="nearby-cta">
            <Link to="/nearby-salons" className="button button-primary">
              View All {nearbySalons.length} Salons
            </Link>
            <p style={{ color: 'var(--muted)', margin: 0, alignSelf: 'center' }}>
              Showing salons within your area
            </p>
          </div>
        )}
      </section>

      <section className="section-block" style={{ background: 'linear-gradient(135deg, rgba(255, 143, 212, 0.12), rgba(156, 140, 255, 0.1))', borderRadius: '2rem', padding: '2.5rem', marginBottom: '2rem' }}>
        <div className="section-heading" style={{ marginBottom: '1.5rem' }}>
          <div>
            <h2>Try hairstyles before you book</h2>
            <p>Our AI technology lets you preview how different hairstyles look on you.</p>
          </div>
        </div>
        <Link to="/ai-hairstyle-preview" className="button button-primary">
          Launch AI Preview ✨
        </Link>
      </section>

      <section className="cta-panel">
        <div>
          <h2>Bring your beauty bookings into one elegant experience.</h2>
          <p>GlowLink makes discovery, review browsing, and appointment booking feel effortless.</p>
        </div>
        <Link to="/register" className="button button-primary">Start your beauty journey</Link>
      </section>
    </div>
  )
}
