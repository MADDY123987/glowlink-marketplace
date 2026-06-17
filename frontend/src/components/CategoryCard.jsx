export default function CategoryCard({ title, icon }) {
  return (
    <div className="category-card">
      <div className="category-icon">{icon}</div>
      <p>{title}</p>
    </div>
  )
}
