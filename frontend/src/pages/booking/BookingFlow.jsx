import { useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { salons } from '../../data/mockData'
import { submitBooking } from '../../services/api'
import { useToast } from '../../components/ToastProvider'

const steps = ['service', 'stylist', 'date', 'time', 'summary']

export default function BookingFlow() {
  const { salonId } = useParams()
  const location = useLocation()
  const salon = salons.find((item) => item.id === salonId) || salons[0]
  const initialService = location.state?.serviceId || salon.services[0]?.name || ''
  const [step, setStep] = useState(0)
  const [service, setService] = useState(initialService)
  const [stylist, setStylist] = useState(salon.team[0]?.name || '')
  const [date, setDate] = useState('2026-06-22')
  const [time, setTime] = useState(salon.availability[0] || '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const toast = useToast()

  const summary = useMemo(
    () => ({
      salon: salon.name,
      service,
      stylist,
      date,
      time,
    }),
    [salon.name, service, stylist, date, time],
  )

  const handleSubmit = async () => {
    if (!service || !stylist || !date || !time) {
      setError('Please complete all steps before booking.')
      toast.warning('Complete all booking details first.')
      return
    }

    setLoading(true)
    setError('')

    try {
      await submitBooking({ salonId: salon.id, service, stylist, date, time })
      toast.success('Booking confirmed!')
      navigate('success')
    } catch (err) {
      setError('Unable to complete booking. Please try again.')
      toast.error('Booking failed. Please retry.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-content booking-page">
      <div className="page-header">
        <span className="eyebrow">Booking journey</span>
        <h1>Book {salon.name}</h1>
      </div>

      <div className="booking-progress">
        {steps.map((label, index) => (
          <div key={label} className={`progress-step ${index <= step ? 'active' : ''}`}>
            <span>{index + 1}</span>
            <p>{label}</p>
          </div>
        ))}
      </div>

      <div className="booking-card glass-panel">
        {error && <div className="alert alert-error">{error}</div>}

        {step === 0 && (
          <div>
            <h2>Select a service</h2>
            {salon.services.map((item) => (
              <button
                key={item.name}
                className={service === item.name ? 'service-option active' : 'service-option'}
                onClick={() => setService(item.name)}
                type="button"
              >
                <div>
                  <strong>{item.name}</strong>
                  <p>{item.description}</p>
                </div>
                <span>{item.price}</span>
              </button>
            ))}
          </div>
        )}

        {step === 1 && (
          <div>
            <h2>Choose stylist</h2>
            {salon.team.map((member) => (
              <button
                key={member.name}
                className={stylist === member.name ? 'service-option active' : 'service-option'}
                onClick={() => setStylist(member.name)}
                type="button"
              >
                <div>
                  <strong>{member.name}</strong>
                  <p>{member.title}</p>
                </div>
              </button>
            ))}
          </div>
        )}

        {step === 2 && (
          <div>
            <h2>Select date</h2>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="form-input"
            />
          </div>
        )}

        {step === 3 && (
          <div>
            <h2>Select time</h2>
            <div className="slots-grid">
              {salon.availability.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  className={time === slot ? 'pill active' : 'pill'}
                  onClick={() => setTime(slot)}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="booking-summary">
            <h2>Booking summary</h2>
            <div className="summary-row"><span>Salon</span><strong>{summary.salon}</strong></div>
            <div className="summary-row"><span>Service</span><strong>{summary.service}</strong></div>
            <div className="summary-row"><span>Stylist</span><strong>{summary.stylist}</strong></div>
            <div className="summary-row"><span>Date</span><strong>{summary.date}</strong></div>
            <div className="summary-row"><span>Time</span><strong>{summary.time}</strong></div>
            <button className="button button-primary" onClick={handleSubmit} disabled={loading} type="button">
              {loading ? 'Booking...' : 'Confirm appointment'}
            </button>
          </div>
        )}
      </div>

      <div className="booking-actions">
        <button className="button button-secondary" disabled={step === 0 || loading} onClick={() => setStep((prev) => Math.max(prev - 1, 0))} type="button">
          Back
        </button>
        {step < steps.length - 1 ? (
          <button className="button button-primary" onClick={() => setStep((prev) => Math.min(prev + 1, steps.length - 1))} disabled={loading} type="button">
            Next
          </button>
        ) : null}
      </div>
    </div>
  )
}
