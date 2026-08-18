import { useState } from 'react'
import { Mail, CalendarCheck, Lightbulb, Hammer, ArrowLeft } from 'lucide-react'

// lucide-react 1.x removed brand icons — inline the LinkedIn mark instead.
const Linkedin = ({ size = 18, className }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.55V9h3.57v11.45z" />
  </svg>
)

const EMAIL = 'peacedude@gmail.com'
const LINKEDIN = 'https://www.linkedin.com/in/gregorykennedymindfuldude/'

const ACTIONS = [
  {
    id: 'lesson',
    label: 'Book A Lesson with Gregory',
    icon: CalendarCheck,
    cls: '',
    blurb: 'Learn the When-To-Use-AI decision framework live, one-on-one.'
  },
  {
    id: 'discuss',
    label: 'Discuss your AI Project Idea',
    icon: Lightbulb,
    cls: 'blue',
    blurb: 'Stress-test whether your idea needs AI — or just good rules.'
  },
  {
    id: 'build',
    label: 'Build my Project',
    icon: Hammer,
    cls: 'yellow',
    blurb: 'Hire Gregory to architect and ship your hybrid AI system.'
  }
]

export default function ContactScreen({ onBack }) {
  const [open, setOpen] = useState(null)

  return (
    <div>
      <div className="contact-card">
        <div className="avatar" aria-hidden="true">GK</div>
        <h2 className="q-title" style={{ textAlign: 'center' }}>Gregory Kennedy</h2>
        <p className="q-prompt" style={{ textAlign: 'center', maxWidth: 440, margin: '10px auto 0' }}>
          Creator of <strong>When To Use AI</strong>. I help teams choose the right tool —
          not just the newest one. Pick a path and reach out directly.
        </p>

        <div className="contact-btns">
          {ACTIONS.map((a) => {
            const Icon = a.icon
            const isOpen = open === a.id
            return (
              <div key={a.id}>
                <button className={`btn ${a.cls} block`} onClick={() => setOpen(isOpen ? null : a.id)} aria-expanded={isOpen}>
                  <Icon size={17} style={{ verticalAlign: '-3px' }} /> {a.label}
                </button>
                {isOpen && (
                  <div className="reveal-box" role="region" aria-label={`Contact details for ${a.label}`}>
                    <h4>{a.label}</h4>
                    <p style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 700, color: 'var(--ink-2)' }}>{a.blurb}</p>
                    <div className="reveal-links">
                      <a className="reveal-link" href={`mailto:${EMAIL}?subject=${encodeURIComponent(a.label)}`}>
                        <Mail className="ic" size={18} /> {EMAIL}
                      </a>
                      <a className="reveal-link" href={LINKEDIN} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="ic" size={18} /> {LINKEDIN}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: 20 }}>
        <button className="btn white" onClick={onBack}>
          <ArrowLeft size={16} style={{ verticalAlign: '-3px' }} /> Back to the game
        </button>
      </div>
    </div>
  )
}