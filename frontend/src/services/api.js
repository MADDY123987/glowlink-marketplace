import axios from 'axios'

const apiClient = axios.create({
  baseURL: '/api',
  timeout: 8000,
  headers: { 'Content-Type': 'application/json' },
})

export async function fetchSalons() {
  const response = await apiClient.get('/salons')
  return response.data
}

export async function fetchSalonDetails(id) {
  const response = await apiClient.get(`/salons/${id}`)
  return response.data
}

export async function submitBooking(booking) {
  const response = await apiClient.post('/bookings', booking)
  return response.data
}

export default apiClient
