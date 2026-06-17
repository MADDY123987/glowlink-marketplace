import { Link } from 'react-router-dom'

export default function SalonCard({ salon }) {
  return (
    <article className="salon-card">
      <img src={salon.image} alt={salon.name} />
      <div className="salon-card-body">
        <div className="salon-card-row">
          <h3>{salon.name}</h3>
          <span className="rating">{salon.rating} ★</span>
        </div>
        <p>{salon.location}</p>
        <p className="salon-price">Starts at <strong>{salon.startingPrice}</strong></p>
        <Link to={`/salons/${salon.id}`} className="button button-secondary block-button">Book</Link>
      </div>
    </article>
  )
}
