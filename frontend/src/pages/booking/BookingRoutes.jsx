import { Routes, Route } from 'react-router-dom'
import BookingFlow from './BookingFlow'
import BookingSuccess from './BookingSuccess'

export default function BookingRoutes() {
  return (
    <Routes>
      <Route path=":salonId" element={<BookingFlow />} />
      <Route path=":salonId/success" element={<BookingSuccess />} />
    </Routes>
  )
}
