export const salons = [
  {
    id: 'salon-01',
    name: 'Luxe Glow Studio',
    rating: 4.9,
    location: 'Downtown · 1.2 mi',
    startingPrice: '$55',
    image: 'https://images.unsplash.com/photo-1522336572468-79d41f2a82f8?auto=format&fit=crop&w=900&q=80',
    description: 'A curated destination for balayage, spa therapy, and bridal beauty looks.',
    services: [
      { name: 'Signature Cut', description: 'Precision haircut with styling.', price: '$65', duration: '50 min' },
      { name: 'Blonde Glow', description: 'Luxury color with gloss finish.', price: '$120', duration: '90 min' },
      { name: 'HydraFacial', description: 'Deep cleansing + glow boost.', price: '$95', duration: '60 min' },
    ],
    team: [
      { name: 'Mia Carter', title: 'Lead Stylist' },
      { name: 'Hana Lee', title: 'Color Specialist' },
    ],
    reviews: [
      { author: 'Sofia', rating: 5, comment: 'The best haircut experience I’ve ever had.' },
      { author: 'Nina', rating: 5, comment: 'The staff made my booking seamless and my glow lasted weeks.' },
    ],
    availability: ['10:00 AM', '12:30 PM', '3:00 PM', '5:30 PM'],
    bestFor: ['Haircut', 'Color', 'Makeup'],
  },
  {
    id: 'salon-02',
    name: 'Velvet Bloom Salon',
    rating: 4.8,
    location: 'Uptown · 0.9 mi',
    startingPrice: '$48',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
    description: 'Soft luxury salon with mindfulness rituals and natural beauty treatments.',
    services: [
      { name: 'Crystal Facial', description: 'Glow-enhancing skincare ritual.', price: '$80', duration: '55 min' },
      { name: 'Nail Art Luxe', description: 'Customized manicure with polish designs.', price: '$45', duration: '40 min' },
      { name: 'Bridal Glam', description: 'Full glamour service for special days.', price: '$180', duration: '120 min' },
    ],
    team: [
      { name: 'Zoe Martin', title: 'Beauty Director' },
      { name: 'Kira Sun', title: 'Esthetician' },
    ],
    reviews: [
      { author: 'Lina', rating: 5, comment: 'I loved the attention to detail and calming atmosphere.' },
      { author: 'Maya', rating: 4.9, comment: 'GlowLink made it so easy to pick the perfect service.' },
    ],
    availability: ['9:30 AM', '11:00 AM', '2:00 PM', '4:15 PM'],
    bestFor: ['Skin', 'Spa', 'Nails'],
  },
]

export const testimonials = [
  { name: 'Ellie', role: 'Fashion Creator', quote: 'GlowLink helped me find a salon that perfectly matched my beauty routine.' },
  { name: 'Avery', role: 'Entrepreneur', quote: 'The booking flow felt premium and effortless. I love the AI suggestions.' },
  { name: 'Noor', role: 'Beauty Editor', quote: 'A fresh, polished marketplace with all the salon options I need.' },
]

export const categories = [
  { title: 'Haircut', icon: '✂️' },
  { title: 'Hair Coloring', icon: '🎨' },
  { title: 'Makeup', icon: '💄' },
  { title: 'Skincare', icon: '🌿' },
  { title: 'Spa', icon: '🧖‍♀️' },
  { title: 'Nails', icon: '💅' },
]

export const aiRecommendations = [
  { title: 'Glass Skin Reset', description: 'A treatment plan for hydrated, radiant skin.' },
  { title: 'Soft Blonde Refresh', description: 'A color strategy for luminous, natural highlights.' },
  { title: 'Date Night Glam', description: 'Makeup and styling cues for flawless evening looks.' },
]

export const faqItems = [
  { question: 'How do I book a salon service?', answer: 'Search salons, choose a service, select a time, and confirm your appointment.' },
  { question: 'Can I change my booking?', answer: 'Yes. Use the dashboard to manage upcoming bookings and request changes.' },
  { question: 'What is the AI assistant?', answer: 'It offers beauty suggestions tailored to your profile and style goals.' },
]

export const userBookings = [
  { id: 'booking-01', salon: 'Luxe Glow Studio', service: 'Blonde Glow', date: 'June 22, 2026', time: '11:00 AM', status: 'Confirmed' },
  { id: 'booking-02', salon: 'Velvet Bloom Salon', service: 'Crystal Facial', date: 'July 1, 2026', time: '2:00 PM', status: 'Pending' },
]

export const savedSalons = [
  { name: 'Luxe Glow Studio', location: 'Downtown' },
  { name: 'Velvet Bloom Salon', location: 'Uptown' },
]
