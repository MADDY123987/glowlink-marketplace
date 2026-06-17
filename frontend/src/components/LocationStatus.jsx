import { useEffect, useState } from 'react'

export default function LocationStatus() {
  const [locationStatus, setLocationStatus] = useState('idle') // idle -> requesting -> granted -> denied
  const [userLocation, setUserLocation] = useState(null)
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
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        })
        setLocationStatus('granted')
        setError(null)
      },
      (error) => {
        console.error('Geolocation error:', error)
        setError(error.message)
        setLocationStatus('denied')
      }
    )
  }

  return {
    locationStatus,
    userLocation,
    error,
    requestLocation
  }
}

// UI Component
export function LocationStatusUI({ locationStatus, userLocation, error, onRequestLocation }) {
  if (locationStatus === 'granted' && userLocation) {
    return (
      <div className="location-status granted">
        <span className="location-icon">📍</span>
        <div>
          <p className="status-label">Location enabled</p>
          <p className="status-detail">Showing salons near you</p>
        </div>
      </div>
    )
  }

  if (locationStatus === 'requesting') {
    return (
      <div className="location-status requesting">
        <span className="location-icon spinner">⏳</span>
        <div>
          <p className="status-label">Requesting location...</p>
          <p className="status-detail">Finding salons near you</p>
        </div>
      </div>
    )
  }

  if (locationStatus === 'denied' || error) {
    return (
      <div className="location-status denied">
        <span className="location-icon">❌</span>
        <div>
          <p className="status-label">Location access denied</p>
          <p className="status-detail">Enable location to see nearby salons</p>
        </div>
        <button onClick={onRequestLocation} className="button button-small">
          Enable Location
        </button>
      </div>
    )
  }

  return (
    <div className="location-status idle">
      <span className="location-icon">📍</span>
      <div>
        <p className="status-label">Find salons near you</p>
        <p className="status-detail">Allow location access to see nearby salons</p>
      </div>
      <button onClick={onRequestLocation} className="button button-primary button-small">
        Enable Location
      </button>
    </div>
  )
}
