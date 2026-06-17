import { hairstyles } from '../data/hairstyles'

export default function HairstyleSelector({ selectedHairstyle, onSelect, disabled }) {
  return (
    <div className="hairstyle-selector">
      <h2>Choose Your Hairstyle</h2>
      <p className="subtitle">Pick a style you'd like to try</p>
      <div className="hairstyle-grid">
        {hairstyles.map((style) => (
          <button
            key={style.id}
            className={`hairstyle-card ${selectedHairstyle === style.id ? 'active' : ''}`}
            onClick={() => onSelect(style.id)}
            disabled={disabled}
            type="button"
          >
            <div className="hairstyle-icon">{style.icon}</div>
            <h4>{style.name}</h4>
            <p>{style.description}</p>
            <div className="hairstyle-tags">
              {style.suitableFor.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
