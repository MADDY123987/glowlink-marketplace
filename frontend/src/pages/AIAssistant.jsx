import { useState } from 'react'
import { aiRecommendations } from '../data/mockData'

const suggested = [
  { title: 'Bold balayage', description: 'A modern hair color suggestion with soft transitions.' },
  { title: 'Glow facial ritual', description: 'Skin treatment plan for a luminous complexion.' },
  { title: 'Soft glam makeup', description: 'Evening look with polished, natural radiance.' },
]

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    { id: 1, from: 'assistant', text: 'Hi there! Tell me about your beauty goals today.' },
  ])
  const [draft, setDraft] = useState('')

  const submitMessage = () => {
    if (!draft.trim()) return
    setMessages((prev) => [...prev, { id: prev.length + 1, from: 'user', text: draft }])
    setMessages((prev) => [...prev, { id: prev.length + 2, from: 'assistant', text: 'I recommend a fresh glow facial paired with a soft balayage treatment.' }])
    setDraft('')
  }

  return (
    <div className="page-content ai-page">
      <div className="page-header">
        <span className="eyebrow">Beauty AI</span>
        <h1>Your personalized AI beauty assistant</h1>
      </div>

      <div className="ai-layout">
        <section className="assistant-panel glass-panel">
          <div className="assistant-messages">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.from}`}>
                {message.text}
              </div>
            ))}
          </div>
          <div className="assistant-input">
            <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Ask about hairstyles, skin rituals, or salon picks..." />
            <button className="button button-primary" onClick={submitMessage}>Send</button>
          </div>
        </section>

        <aside className="recommendation-panel glass-panel">
          <h2>Beauty recommendations</h2>
          <p>Suggested looks and treatments crafted by GlowLink AI.</p>
          <div className="recommendation-list">
            {aiRecommendations.map((item) => (
              <div key={item.title} className="recommendation-card">
                <strong>{item.title}</strong>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}
