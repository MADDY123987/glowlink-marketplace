import { testimonials } from '../data/mockData'

export default function About() {
  return (
    <div className="page-content about-page">
      <section className="section-block hero-block about-hero">
        <div>
          <span className="eyebrow">GlowLink story</span>
          <h1>Building a smarter way to discover beauty.</h1>
          <p>GlowLink connects people with premier salons and AI-guided recommendations for modern self-care.</p>
        </div>
      </section>

      <section className="section-block glass-panel">
        <div className="about-grid">
          <div>
            <h2>Mission</h2>
            <p>To empower every beauty seeker with personalized salon options and seamless booking experiences.</p>
          </div>
          <div>
            <h2>Vision</h2>
            <p>To become the leading beauty marketplace combining premium salons with intelligent recommendations.</p>
          </div>
          <div>
            <h2>Why choose GlowLink</h2>
            <p>Enjoy curated salons, transparent prices, AI insights, and a polished new way to book beauty services.</p>
          </div>
        </div>
      </section>

      <section className="section-block">
        <h2>Meet the team</h2>
        <div className="team-grid">
          {['Noor', 'Aanya', 'Mia', 'Zoe'].map((name) => (
            <div key={name} className="team-card">
              <div className="team-avatar">{name.charAt(0)}</div>
              <strong>{name}</strong>
              <p>Beauty specialist</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-block">
        <h2>What our customers say</h2>
        <div className="testimonials-grid">
          {testimonials.map((item) => (
            <div key={item.name} className="testimonial-card">
              <p>“{item.quote}”</p>
              <strong>{item.name}</strong>
              <span>{item.role}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
