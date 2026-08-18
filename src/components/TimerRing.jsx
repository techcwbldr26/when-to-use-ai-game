import { ROUND_SECONDS } from '../data/questions.js'

const SIZE = 64
const STROKE = 6
const R = (SIZE - STROKE) / 2
const CIRC = 2 * Math.PI * R

/**
 * Duolingo-style circular countdown. Green > 5s, amber > 3s, red pulse <= 3s.
 * @param {number} remaining seconds left (float)
 * @param {boolean} running whether the clock is ticking
 */
export default function TimerRing({ remaining, running }) {
  const frac = Math.max(0, Math.min(1, remaining / ROUND_SECONDS))
  const state = !running ? '' : remaining <= 3 ? 'danger' : remaining <= 5 ? 'warn' : ''
  const color = state === 'danger' ? 'var(--red)' : state === 'warn' ? 'var(--yellow)' : 'var(--green)'

  return (
    <div className={`timer-wrap ${state}`} role="timer" aria-label={`${Math.ceil(remaining)} seconds left`}>
      <svg width={SIZE} height={SIZE}>
        <circle className="timer-track" cx={SIZE / 2} cy={SIZE / 2} r={R} fill="none" strokeWidth={STROKE} />
        <circle
          className="timer-bar"
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={R}
          fill="none"
          strokeWidth={STROKE}
          stroke={color}
          strokeDasharray={CIRC}
          strokeDashoffset={CIRC * (1 - frac)}
        />
      </svg>
      <span className="timer-num">{running ? Math.ceil(remaining) : ROUND_SECONDS}</span>
    </div>
  )
}