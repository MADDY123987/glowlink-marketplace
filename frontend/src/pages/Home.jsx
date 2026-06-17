import { useState } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import CategoryCard from '../components/CategoryCard'
import SalonCard from '../components/SalonCard'
import TestimonialCard from '../components/TestimonialCard'
import { categories, salons, testimonials } from '../data/mockData'

export default function Home() {
  const [search, setSearch] = useState('')
  const featured = salons.slice(0, 2)

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
            <Link to="/ai-assistant" className="button button-secondary">Meet AI stylist</Link>
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
