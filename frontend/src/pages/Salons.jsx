import { useState } from 'react'
import SearchBar from '../components/SearchBar'
import SalonCard from '../components/SalonCard'
import { salons, categories } from '../data/mockData'

export default function Salons() {
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(null)

  const filteredSalons = salons.filter((salon) => {
    const matchesQuery = salon.name.toLowerCase().includes(query.toLowerCase()) || salon.location.toLowerCase().includes(query.toLowerCase())
    const matchesCategory = selectedCategory ? salon.bestFor.includes(selectedCategory) : true
    return matchesQuery && matchesCategory
  })

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <span className="eyebrow">Find your salon</span>
          <h1>Discover salons by style, budget, and location</h1>
        </div>
        <SearchBar value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search salons, neighborhoods, looks..." />
      </div>

      <div className="filter-pill-row">
        <button className={selectedCategory === null ? 'pill active' : 'pill'} onClick={() => setSelectedCategory(null)}>All categories</button>
        {categories.map((category) => (
          <button
            key={category.title}
            className={selectedCategory === category.title ? 'pill active' : 'pill'}
            onClick={() => setSelectedCategory(category.title)}
          >
            {category.title}
          </button>
        ))}
      </div>

      <div className="salon-grid">
        {filteredSalons.map((salon) => (
          <SalonCard key={salon.id} salon={salon} />
        ))}
      </div>

      {filteredSalons.length === 0 && <p className="empty-state">No salons match your search. Try a different keyword.</p>}
    </div>
  )
}
