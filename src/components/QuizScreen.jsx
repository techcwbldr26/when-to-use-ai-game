import { useCallback, useEffect, useRef, useState } from 'react'
import confetti from 'canvas-confetti'
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react'
import { QUESTIONS, OPTIONS, TOTAL, ROUND_SECONDS } from '../data/questions.js'
import TimerRing from './TimerRing.jsx'

const KEYS = ['1', '2', '3', '4']

export default function QuizScreen({ onStats, onFinish }) {
  const [idx, setIdx] = useState(0)
  const [phase, setPhase] = useState('answering') // answering | feedback
  const [selected, setSelected] = useState(null) // chosen option or null on timeout
  const [remaining, setRemaining] = useState(ROUND_SECONDS)
  const statsRef = useRef({ score: 0, xp: 0, streak: 0, bestStreak: 0 })
  const deadlineRef = useRef(null)

  const q = QUESTIONS[idx]
  const answered = phase === 'feedback'
  const isCorrect = answered && selected === q.correct

  // ---- 10-second countdown (deadline-based, drift-proof) ----
  useEffect(() => {
    if (phase !== 'answering') return
    deadlineRef.current = performance.now() + ROUND_SECONDS * 1000
    setRemaining(ROUND_SECONDS)
    const t = setInterval(() => {
      const left = Math.max(0, (deadlineRef.current - performance.now()) / 1000)
      setRemaining(left)
      if (left <= 0) {
        clearInterval(t)
        answer(null, 0) // time out → counts as a miss
      }
    }, 100)
    return () => clearInterval(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, phase])

  // ---- keyboard shortcuts 1-4 ----
  useEffect(() => {
    const onKey = (e) => {
      if (phase !== 'answering') return
      const i = KEYS.indexOf(e.key)
      if (i > -1) answer(OPTIONS[i], remainingRef.current)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, idx])

  const remainingRef = useRef(ROUND_SECONDS)
  remainingRef.current = remaining

  const answer = useCallback((choice, timeLeft) => {
    if (phase !== 'answering') return
    const correct = choice === QUESTIONS[idx].correct
    const s = statsRef.current
    if (correct) {
      s.score += 1
      s.streak += 1
      s.bestStreak = Math.max(s.bestStreak, s.streak)
      s.xp += 10 + Math.ceil(timeLeft) // speed bonus XP
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.7 }, colors: ['#58cc02', '#ffc800', '#1cb0f6'] })
    } else {
      s.streak = 0
    }
    setSelected(choice)
    setPhase('feedback')
    onStats({ ...s })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, idx])

  const next = () => {
    if (idx + 1 >= TOTAL) {
      onFinish({ ...statsRef.current })
    } else {
      setIdx(idx + 1)
      setPhase('answering')
      setSelected(null)
    }
  }

  return (
    <div>
      <div className="quiz-top">
        <TimerRing remaining={remaining} running={phase === 'answering'} />
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span className="round-label">Round {idx + 1} · {q.label}</span>
            <span className="round-label">{idx + 1} / {TOTAL}</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${(idx / TOTAL) * 100}%` }} />
          </div>
        </div>
      </div>

      <article className="quiz-card">
        <h2 className="q-title">{q.title}</h2>
        <p className="q-prompt">{q.prompt}</p>

        {q.pipeline && (
          <div className="pipeline" aria-label="Hybrid architecture pipeline">
            {q.pipeline.map((node, i) => (
              <span key={node} style={{ display: 'contents' }}>
                {i > 0 && <span className="pipe-arrow">→</span>}
                <span
                  className={`pipe-node ${node.startsWith('Rules') ? 'rules' : node.startsWith('Humans') ? 'humans' : ''}`}
                >
                  {node}
                </span>
              </span>
            ))}
          </div>
        )}

        <div className="options" role="group" aria-label="Answer options">
          {OPTIONS.map((opt, i) => {
            let cls = 'option'
            if (answered) {
              if (opt === q.correct) cls += ' correct'
              else if (opt === selected) cls += ' incorrect'
              else cls += ' dimmed'
            }
            return (
              <button
                key={opt}
                className={cls}
                disabled={answered}
                onClick={() => answer(opt, remainingRef.current)}
              >
                <span className="key">{KEYS[i]}</span>
                {opt}
              </button>
            )
          })}
        </div>

        {answered && (
          <div className={`feedback ${isCorrect ? 'good' : 'bad'}`} aria-live="polite">
            <div className="feedback-head">
              {isCorrect ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
              {selected === null ? "Time's up!" : isCorrect ? 'Excellent!' : 'Not quite.'}{' '}
              {!isCorrect && <span style={{ fontWeight: 800, fontSize: 15 }}>→ {q.correct}</span>}
            </div>
            <p className="feedback-body">
              <strong>{q.feedbackTitle}</strong> {q.feedback}
            </p>
            <button className={`btn ${isCorrect ? '' : 'blue'}`} onClick={next}>
              {idx + 1 >= TOTAL ? 'See results' : 'Continue'} <ArrowRight size={16} style={{ verticalAlign: '-3px' }} />
            </button>
          </div>
        )}
      </article>
    </div>
  )
}