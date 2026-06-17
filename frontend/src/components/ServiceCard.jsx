export default function ServiceCard({ service }) {
  return (
    <div className="service-card">
      <div className="service-card-header">
        <h4>{service.name}</h4>
        <span>{service.duration}</span>
      </div>
      <p>{service.description}</p>
      <span className="service-price">{service.price}</span>
    </div>
  )
}
