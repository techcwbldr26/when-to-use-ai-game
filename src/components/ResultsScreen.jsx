import { useEffect } from 'react'
import confetti from 'canvas-confetti'
import { Trophy, Flame, Zap, Target, RotateCcw, Mail } from 'lucide-react'
import { TOTAL } from '../data/questions.js'

export default function ResultsScreen({ stats, onRestart, onContact }) {
  const { score, xp, bestStreak } = stats
  const pct = Math.round((score / TOTAL) * 100)
  const tier = score >= 16 ? 'gold' : score >= 10 ? 'silver' : 'bronze'
  const league = tier === 'gold' ? 'Diamond League' : tier === 'silver' ? 'Silver League' : 'Bronze League'

  const summary =
    score >= 16
      ? 'Excellent judgement. You can distinguish deterministic execution, structured pattern recognition, unstructured synthesis, and human accountability — while keeping Accuracy, Cost, Complexity, and Risk in view.'
      : score >= 10
        ? 'Strong foundation. Revisit the trade-offs: Rules offer determinism, ML recognizes structured patterns, GenAI synthesizes unstructured data, and Humans own ambiguous high-stakes decisions.'
        : 'A useful reminder: AI is not the default. Start with the system problem, then weigh Accuracy, Cost, Complexity, and Risk before selecting the appropriate paradigm.'

  useEffect(() => {
    if (score >= 16) {
      const end = Date.now() + 1200
      const frame = () => {
        confetti({ particleCount: 6, angle: 60, spread: 60, origin: { x: 0 }, colors: ['#58cc02', '#ffc800', '#1cb0f6', '#ce82ff'] })
        confetti({ particleCount: 6, angle: 120, spread: 60, origin: { x: 1 }, colors: ['#58cc02', '#ffc800', '#1cb0f6', '#ce82ff'] })
        if (Date.now() < end) requestAnimationFrame(frame)
      }
      frame()
    }
  }, [score])

  return (
    <div className="results-card">
      <div className={`league-medal ${tier}`} aria-hidden="true">
        <Trophy size={44} />
      </div>
      <span className="round-label" style={{ color: 'var(--blue)' }}>{league}</span>
      <h2 className="final-score">{score} / {TOTAL}</h2>
      <p style={{ margin: '8px auto 0', maxWidth: 480, color: 'var(--muted)', fontWeight: 700, lineHeight: 1.55 }}>
        {summary}
      </p>

      <div className="stat-row">
        <div className="stat-box xp"><div className="v">{xp}</div><div className="l"><Zap size={12} style={{ verticalAlign: '-2px' }} /> XP earned</div></div>
        <div className="stat-box streak"><div className="v">{bestStreak}</div><div className="l"><Flame size={12} style={{ verticalAlign: '-2px' }} /> Best streak</div></div>
        <div className="stat-box acc"><div className="v">{pct}%</div><div className="l"><Target size={12} style={{ verticalAlign: '-2px' }} /> Accuracy</div></div>
      </div>

      <div className="takeaway">
        <h3>The hybrid architecture</h3>
        <p>
          Use GenAI as a translation layer for unstructured text, hand state-changing execution to
          Rules / Code, and escalate ambiguous or accountable cases to Humans.
        </p>
      </div>

      <div className="results-actions">
        <button className="btn" onClick={onRestart}>
          <RotateCcw size={16} style={{ verticalAlign: '-3px' }} /> Play again
        </button>
        <button className="btn blue" onClick={onContact}>
          <Mail size={16} style={{ verticalAlign: '-3px' }} /> Contact Gregory
        </button>
      </div>
    </div>
  )
}