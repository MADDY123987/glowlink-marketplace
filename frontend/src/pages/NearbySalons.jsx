import { useState, useEffect } from 'react'
import { salons } from '../data/mockData'
import SalonMapCard from '../components/SalonMapCard'
import LocationStatus from '../components/LocationStatus'

// Mock function to calculate distance (in production, this would use actual geolocation)
const calculateDistance = () => {
  return (Math.random() * 5 + 0.5).toFixed(1)
}

export default function NearbySalons() {
  const [locationStatus, setLocationStatus] = useState('idle')
  const [userLocation, setUserLocation] = useState(null)
  const [nearbySalons, setNearbySalons] = useState([])
  const [selectedSalonId, setSelectedSalonId] = useState(null)
  const [error, setError] = useState(null)

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser')
      setLocationStatus('denied')
      return
    }

    setLocationStatus('requesting')
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        }
        setUserLocation(location)
        setLocationStatus('granted')
        setError(null)

        // Mock: show all salons with calculated distances
        const salonsWithDistance = salons.map((salon) => ({
          ...salon,
          distance: calculateDistance()
        }))

        setNearbySalons(salonsWithDistance.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance)))
      },
      (error) => {
        console.error('Geolocation error:', error)
        setError(error.message)
        setLocationStatus('denied')
      }
    )
  }

  const handleLocationRequest = () => {
    requestLocation()
  }

  return (
    <div className="page-content nearby-salons-page">
      <div className="nearby-header">
        <span className="eyebrow">📍 Location Services</span>
        <h1>Salons Near You</h1>
        <p>Find and book your favorite salons in your area</p>
      </div>

      <div className="location-permission">
        <LocationStatus
          locationStatus={locationStatus}
          userLocation={userLocation}
          error={error}
          onRequestLocation={handleLocationRequest}
        />
      </div>

      {locationStatus === 'granted' && nearbySalons.length > 0 && (
        <div className="nearby-salons-container">
          <div className="map-placeholder">
            <div className="map-content">
              <div className="map-icon">🗺️</div>
              <h3>Interactive Map Coming Soon</h3>
              <p>Google Maps integration will show salon locations and real-time directions</p>
              <div className="map-stats">
                <div className="stat">
                  <span className="number">{nearbySalons.length}</span>
                  <span className="label">Salons found</span>
                </div>
                <div className="stat">
                  <span className="number">{parseFloat(nearbySalons[0]?.distance || 0).toFixed(1)}mi</span>
                  <span className="label">Closest</span>
                </div>
              </div>
            </div>
          </div>

          <div className="salons-list">
            <h2>All Salons ({nearbySalons.length})</h2>
            <div className="salons-grid">
              {nearbySalons.map((salon) => (
                <SalonMapCard
                  key={salon.id}
                  salon={salon}
                  distance={`${salon.distance} mi`}
                  userLocation={userLocation}
                  isSelected={selectedSalonId === salon.id}
                  onSelect={() => setSelectedSalonId(salon.id)}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {locationStatus === 'denied' && (
        <div className="empty-state permission-denied">
          <div className="empty-icon">📍</div>
          <h2>Location access required</h2>
          <p>Enable location services to see salons near you</p>
          <button onClick={handleLocationRequest} className="button button-primary">
            Enable Location
          </button>
        </div>
      )}

      {locationStatus === 'granted' && nearbySalons.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h2>No salons found</h2>
          <p>Looks like there are no salons in your area yet</p>
        </div>
      )}
    </div>
  )
}
