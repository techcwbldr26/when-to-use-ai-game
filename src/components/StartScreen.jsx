import { Bird, Timer, Layers, Brain, Target, Sparkles } from 'lucide-react'
import { TOTAL, ROUND_SECONDS } from '../data/questions.js'

export default function StartScreen({ onStart, onContact }) {
  return (
    <div className="start-hero">
      <div className="mascot" aria-hidden="true">
        <Bird size={72} color="#fff" strokeWidth={2.4} />
      </div>

      <h1 className="start-title">
        Playing this game —<br />
        <span className="accent">Could save you $$$$$$.</span>
      </h1>

      <p className="start-sub">
        A {TOTAL}-round architecture challenge. Match every system problem to Humans,
        Rules&nbsp;/&nbsp;Code, Machine&nbsp;Learning, or Generative&nbsp;AI — before the clock hits zero.
      </p>

      <div className="rule-cards" aria-label="Evaluation criteria">
        <div className="rule-card"><span className="dot" style={{ background: 'var(--green)' }} />Accuracy</div>
        <div className="rule-card"><span className="dot" style={{ background: 'var(--yellow)' }} />Cost</div>
        <div className="rule-card"><span className="dot" style={{ background: 'var(--blue)' }} />Complexity</div>
        <div className="rule-card"><span className="dot" style={{ background: 'var(--red)' }} />Risk</div>
      </div>

      <div className="start-meta">
        <span className="chip"><Layers size={15} /> {TOTAL} rounds</span>
        <span className="chip timer"><Timer size={15} /> {ROUND_SECONDS}s per round</span>
        <span className="chip"><Sparkles size={15} /> XP + streaks</span>
      </div>

      <div style={{ marginTop: 28, display: 'grid', gap: 12, justifyItems: 'center' }}>
        <button className="btn big block" style={{ maxWidth: 340 }} onClick={onStart}>
          Start the quiz
        </button>
        <button className="btn white" style={{ maxWidth: 340, width: '100%' }} onClick={onContact}>
          Meet the creator
        </button>
      </div>

      <p className="footer-note">
        AI is not the default solution for everything. Start with the problem, then weigh the trade-offs.
      </p>
    </div>
  )
}