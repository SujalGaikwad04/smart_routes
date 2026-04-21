import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import './About.css'

/* ── Data ── */
const problemCards = [
  { num: '01', icon: 'trending_up', title: 'Traffic Never Stops Changing', desc: 'An accident, a broken signal, or peak-hour rush can render the best route completely useless in under 60 seconds.' },
  { num: '02', icon: 'layers', title: '50+ Routes Simultaneously', desc: 'Managing one route is trivial. Managing 50+ at the same time, each with unique constraints, is exponentially harder.' },
  { num: '03', icon: 'bolt', title: 'Sub-3-Second Response', desc: 'Drivers expect re-routes instantly. A 5-second delay means they\'ve already driven past the optimal turn.' },
  { num: '04', icon: 'hub', title: 'Cascading Road Effects', desc: 'A single congested segment can impact dozens of routes that share that road. The system must think holistically.' },
]

const stackItems = [
  { icon: 'code', name: 'Python', desc: 'Core engine', color: '#3572A5' },
  { icon: 'api', name: 'FastAPI', desc: 'Backend API', color: '#009485' },
  { icon: 'hub', name: 'NetworkX', desc: 'Graph engine', color: '#8B5CF6' },
  { icon: 'map', name: 'OSMnx', desc: 'Road data', color: '#F59E0B' },
  { icon: 'psychology', name: 'Scikit-learn', desc: 'ML models', color: '#F97316' },
  { icon: 'web', name: 'React.js', desc: 'Frontend', color: '#61DBFB' },
  { icon: 'map', name: 'Leaflet.js', desc: 'Map render', color: '#4CAF50' },
  { icon: 'storage', name: 'Pandas', desc: 'Data layer', color: '#E94D35' },
]

const principles = [
  { icon: 'speed',       label: 'Real-Time',      desc: 'Every decision within 2 seconds' },
  { icon: 'lightbulb',  label: 'Explainable',     desc: 'Plain-English justification for each reroute' },
  { icon: 'verified',   label: 'Compliant',        desc: 'No third-party AI APIs — 100% custom ML' },
  { icon: 'route',      label: 'Scalable',         desc: 'Handles 50+ concurrent routes with ease' },
]

const journey = [
  { phase: 'Phase 1', title: 'City Road Graph', desc: 'Loaded Mumbai\'s full road network as a weighted graph using OSMnx + NetworkX.' },
  { phase: 'Phase 2', title: 'Dynamic Weights', desc: 'Traffic API data continuously updates edge weights on every road segment.' },
  { phase: 'Phase 3', title: 'ML Prediction', desc: 'Scikit-learn models trained on historical data to predict congestion before it hits.' },
  { phase: 'Phase 4', title: 'FastAPI Backend', desc: 'High-performance REST API serves rerouting decisions in under 2 seconds.' },
  { phase: 'Phase 5', title: 'React Dashboard', desc: 'Live dashboard with Leaflet map, real-time route updates, and explainable outputs.' },
]

export default function About() {
  return (
    <div className="about-page">
      <Navbar />

      {/* ══ HERO ══ */}
      <section className="ab-hero">
        <div className="ab-hero-bg" aria-hidden="true">
          <div className="ab-hero-orb orb-1" />
          <div className="ab-hero-orb orb-2" />
          <div className="ab-hero-grid" />
        </div>
        <div className="container ab-hero-inner">
          <div className="ab-hero-badge fade-in-up">
            <span className="material-icons-round" style={{ fontSize: 14 }}>emoji_events</span>
            Hackathon Project · Smart Routing Domain
          </div>
          <h1 className="ab-hero-h1 fade-in-up" style={{ animationDelay: '60ms' }}>
            Building the Brain<br />
            <span className="ab-hero-gradient">Behind 50+ Routes</span>
          </h1>
          <p className="ab-hero-sub fade-in-up" style={{ animationDelay: '120ms' }}>
            SmartFlow is an autonomous route optimization system that manages a fleet of 50+ live routes
            across Mumbai — continuously adapting to traffic, accidents, and congestion without any
            human intervention.
          </p>
          <div className="ab-hero-stats fade-in-up" style={{ animationDelay: '180ms' }}>
            {[['50+', 'Routes'], ['2.4s', 'Reroute Time'], ['98%', 'On-Time'], ['31%', 'Fuel Saved']].map(([v, l]) => (
              <div key={l} className="ab-stat">
                <span className="ab-stat-val">{v}</span>
                <span className="ab-stat-lbl">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PROBLEM ══ */}
      <section className="ab-section ab-problems">
        <div className="container">
          <div className="ab-section-label">The Challenge</div>
          <h2 className="ab-section-h2">Why is this <span className="ab-underline">hard?</span></h2>
          <div className="ab-prob-grid">
            {problemCards.map((p, i) => (
              <div key={p.num} className="ab-prob-card fade-in-up" style={{ animationDelay: `${i * 60}ms` }}>
                <div className="ab-prob-num">{p.num}</div>
                <div className="ab-prob-icon-wrap">
                  <span className="material-icons-round ab-prob-icon">{p.icon}</span>
                </div>
                <h3 className="ab-prob-title">{p.title}</h3>
                <p className="ab-prob-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ HOW WE SOLVE IT (visual split) ══ */}
      <section className="ab-section ab-solve">
        <div className="container ab-solve-grid">
          <div className="ab-solve-left">
            <div className="ab-section-label">The Solution</div>
            <h2 className="ab-section-h2">A living, breathing<br /><span className="ab-underline">road network</span></h2>
            <p className="ab-solve-body">
              SmartFlow treats every road in Mumbai as a node in a live graph. Each road segment has a
              real-time <strong>"cost"</strong> — how long it currently takes to travel it. When traffic increases
              the cost of a segment, the pathfinding engine instantly finds a cheaper path around it.
            </p>
            <p className="ab-solve-body" style={{ marginTop: '1rem' }}>
              This runs in parallel for every active route. No route waits for another. No human
              needs to intervene. And every decision comes with a plain-English explanation.
            </p>
            <div className="ab-solve-pills">
              {['Dynamic edge weights', 'Sub-2s rerouting', 'Parallel processing', 'Explainable AI'].map(t => (
                <span key={t} className="ab-pill">{t}</span>
              ))}
            </div>
          </div>

          <div className="ab-solve-right">
            {/* Animated network diagram */}
            <div className="ab-network-viz">
              <NetworkDiagram />
            </div>
          </div>
        </div>
      </section>

      {/* ══ JOURNEY / TIMELINE ══ */}
      <section className="ab-section ab-journey">
        <div className="container">
          <div className="ab-section-label">Development Path</div>
          <h2 className="ab-section-h2">How we built it</h2>
          <div className="ab-timeline">
            {journey.map((j, i) => (
              <div key={j.phase} className="ab-tl-item fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="ab-tl-left">
                  <div className="ab-tl-dot">{i + 1}</div>
                  {i < journey.length - 1 && <div className="ab-tl-line" />}
                </div>
                <div className="ab-tl-body">
                  <span className="ab-tl-phase">{j.phase}</span>
                  <h3 className="ab-tl-title">{j.title}</h3>
                  <p className="ab-tl-desc">{j.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TECH STACK ══ */}
      <section className="ab-section ab-stack">
        <div className="container">
          <div className="ab-section-label">Technology</div>
          <h2 className="ab-section-h2">Full stack, zero compromise</h2>
          <div className="ab-stack-grid">
            {stackItems.map((s, i) => (
              <div key={s.name} className="ab-stack-card fade-in-up" style={{ animationDelay: `${i * 40}ms` }}>
                <div className="ab-stack-icon-wrap" style={{ background: s.color + '18', borderColor: s.color + '30' }}>
                  <span className="material-icons-round ab-stack-icon" style={{ color: s.color }}>{s.icon}</span>
                </div>
                <span className="ab-stack-name">{s.name}</span>
                <span className="ab-stack-desc">{s.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PRINCIPLES ══ */}
      <section className="ab-section ab-principles">
        <div className="container">
          <div className="ab-section-label">Core Values</div>
          <h2 className="ab-section-h2">Design principles</h2>
          <div className="ab-prin-grid">
            {principles.map((p, i) => (
              <div key={p.label} className="ab-prin-card fade-in-up" style={{ animationDelay: `${i * 60}ms` }}>
                <span className="material-icons-round ab-prin-icon">{p.icon}</span>
                <h3 className="ab-prin-label">{p.label}</h3>
                <p className="ab-prin-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="ab-cta">
        <div className="ab-cta-glow" />
        <div className="container ab-cta-inner">
          <h2 className="ab-cta-h2">Experience SmartFlow live</h2>
          <p className="ab-cta-sub">Open the dashboard to see all 50+ Mumbai routes being managed in real-time.</p>
          <div className="ab-cta-actions">
            <Link to="/dashboard" className="btn btn-primary ab-cta-btn" id="about-cta-btn">
              <span className="material-icons-round">open_in_new</span>
              Open Dashboard
            </Link>
            <Link to="/" className="ab-cta-link" id="about-home-link">
              <span className="material-icons-round">arrow_back</span>
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

/* ── Animated Network Diagram (pure CSS/JSX) ── */
function NetworkDiagram() {
  const nodes = [
    { id: 'A', x: 50,  y: 20,  label: 'Andheri',   status: 'best' },
    { id: 'B', x: 80,  y: 50,  label: 'BKC',        status: 'best' },
    { id: 'C', x: 20,  y: 55,  label: 'Bandra',     status: 'rerouting' },
    { id: 'D', x: 50,  y: 80,  label: 'Dadar',      status: 'best' },
    { id: 'E', x: 15,  y: 80,  label: 'Worli',      status: 'delayed' },
    { id: 'F', x: 75,  y: 85,  label: 'Kurla',      status: 'rerouting' },
  ]
  const edges = [
    { from: 'A', to: 'B', status: 'best' },
    { from: 'A', to: 'C', status: 'rerouting' },
    { from: 'C', to: 'D', status: 'best' },
    { from: 'B', to: 'F', status: 'rerouting' },
    { from: 'D', to: 'E', status: 'delayed' },
    { from: 'D', to: 'F', status: 'best' },
  ]

  const statusColor = { best: '#4ae183', rerouting: '#ffb783', delayed: '#ff5449' }

  return (
    <div className="net-diag">
      <svg viewBox="0 0 100 100" className="net-svg" preserveAspectRatio="xMidYMid meet">
        {edges.map((e, i) => {
          const from = nodes.find(n => n.id === e.from)
          const to   = nodes.find(n => n.id === e.to)
          return (
            <line
              key={i}
              x1={from.x} y1={from.y}
              x2={to.x}   y2={to.y}
              stroke={statusColor[e.status]}
              strokeWidth="1.2"
              strokeDasharray={e.status === 'rerouting' ? '3 2' : undefined}
              opacity="0.7"
              className="net-edge"
            />
          )
        })}
        {nodes.map(n => (
          <g key={n.id} className="net-node-g">
            <circle
              cx={n.x} cy={n.y} r="4"
              fill={statusColor[n.status]}
              stroke="white"
              strokeWidth="1"
              className="net-node"
            />
            <text
              x={n.x} y={n.y + 8}
              textAnchor="middle"
              fontSize="4"
              fill="#e0e3e6"
              fontFamily="Manrope, sans-serif"
              fontWeight="600"
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>

      <div className="net-legend">
        {Object.entries(statusColor).map(([s, c]) => (
          <div key={s} className="net-leg-item">
            <span className="net-leg-dot" style={{ background: c }} />
            <span className="net-leg-lbl">{s}</span>
          </div>
        ))}
      </div>

      {/* Live ping indicator */}
      <div className="net-live">
        <span className="live-pulse" style={{ background: '#4ae183' }} />
        <span>Live Network State</span>
      </div>
    </div>
  )
}
