import { useEffect, useState } from 'react'
import { Flame, Zap, Trophy, Waypoints } from 'lucide-react'
import StartScreen from './components/StartScreen.jsx'
import QuizScreen from './components/QuizScreen.jsx'
import ResultsScreen from './components/ResultsScreen.jsx'
import ContactScreen from './components/ContactScreen.jsx'

const INITIAL_STATS = { score: 0, xp: 0, streak: 0, bestStreak: 0 }

export default function App() {
  const [screen, setScreen] = useState('start') // start | quiz | results | contact
  const [run, setRun] = useState(0) // remount key for a fresh quiz run
  const [stats, setStats] = useState(INITIAL_STATS)
  const [contactFrom, setContactFrom] = useState('start')

  // Deep-linkable contact page via hash routing (works on Netlify with zero config)
  useEffect(() => {
    const applyHash = () => {
      if (window.location.hash === '#/contact') {
        setContactFrom((prev) => prev)
        setScreen('contact')
      }
    }
    applyHash()
    window.addEventListener('hashchange', applyHash)
    return () => window.removeEventListener('hashchange', applyHash)
  }, [])

  const openContact = (from) => {
    setContactFrom(from)
    window.location.hash = '#/contact'
    setScreen('contact')
  }

  const closeContact = () => {
    history.replaceState(null, '', window.location.pathname + window.location.search)
    setScreen(contactFrom === 'results' ? 'results' : 'start')
  }

  const startGame = () => {
    setStats(INITIAL_STATS)
    setRun((r) => r + 1)
    setScreen('quiz')
  }

  const inGame = screen === 'quiz'

  return (
    <div className="app-shell">
      <header className="hud">
        <div className="hud-inner">
          <div className="hud-brand">
            <span className="mark" aria-hidden="true">
              <Waypoints size={18} />
            </span>
            When To Use AI
          </div>
          {inGame && (
            <div className="hud-stats" aria-live="polite">
              <span className="hud-stat streak" title="Current streak">
                <Flame size={18} fill="currentColor" /> {stats.streak}
              </span>
              <span className="hud-stat xp" title="Experience points">
                <Zap size={18} fill="currentColor" /> {stats.xp} XP
              </span>
              <span className="hud-stat score" title="Correct answers">
                <Trophy size={18} /> {stats.score}
              </span>
            </div>
          )}
        </div>
      </header>

      <main className="screen screen-enter" key={`${screen}-${run}`}>
        {screen === 'start' && <StartScreen onStart={startGame} onContact={() => openContact('start')} />}
        {screen === 'quiz' && (
          <QuizScreen
            onStats={setStats}
            onFinish={(final) => {
              setStats(final)
              setScreen('results')
            }}
          />
        )}
        {screen === 'results' && (
          <ResultsScreen stats={stats} onRestart={startGame} onContact={() => openContact('results')} />
        )}
        {screen === 'contact' && <ContactScreen onBack={closeContact} />}
      </main>
    </div>
  )
}