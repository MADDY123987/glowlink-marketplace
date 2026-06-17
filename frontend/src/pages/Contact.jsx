import { faqItems } from '../data/mockData'

export default function Contact() {
  return (
    <div className="page-content contact-page">
      <section className="section-block contact-hero">
        <div>
          <span className="eyebrow">Need help?</span>
          <h1>Get in touch with GlowLink.</h1>
          <p>Reach out for partnerships, press, or salon support inquiries.</p>
        </div>
      </section>

      <div className="contact-grid">
        <section className="glass-panel contact-form-panel">
          <h2>Contact form</h2>
          <form className="contact-form">
            <label>
              Name
              <input type="text" placeholder="Your name" />
            </label>
            <label>
              Email
              <input type="email" placeholder="you@example.com" />
            </label>
            <label>
              Message
              <textarea placeholder="Tell us how we can help" rows="5" />
            </label>
            <button className="button button-primary">Send message</button>
          </form>
        </section>

        <section className="glass-panel faq-panel">
          <h2>FAQ</h2>
          {faqItems.map((item) => (
            <div key={item.question} className="faq-item">
              <strong>{item.question}</strong>
              <p>{item.answer}</p>
            </div>
          ))}
          <div className="contact-details">
            <p><strong>Email:</strong> hello@glowlink.com</p>
            <p><strong>Phone:</strong> +1 (555) 843-2286</p>
            <p><strong>Location:</strong> 240 Beauty Ave, New York, NY</p>
          </div>
        </section>
      </div>
    </div>
  )
}
