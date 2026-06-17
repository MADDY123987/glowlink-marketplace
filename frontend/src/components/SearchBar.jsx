export default function SearchBar({ value, onChange, placeholder = 'Search salons, styles, treatments...' }) {
  return (
    <label className="search-bar">
      <input type="search" value={value} onChange={onChange} placeholder={placeholder} />
      <button type="button">Search</button>
    </label>
  )
}
