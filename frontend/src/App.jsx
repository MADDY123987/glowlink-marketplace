import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout'
import Home from './pages/Home'
import Salons from './pages/Salons'
import SalonDetails from './pages/SalonDetails'
import Booking from './pages/Booking'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import Dashboard from './pages/Dashboard'
import AIAssistant from './pages/AIAssistant'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import './index.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="salons" element={<Salons />} />
          <Route path="salons/:id" element={<SalonDetails />} />
          <Route path="booking/*" element={<Booking />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="ai-assistant" element={<AIAssistant />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
