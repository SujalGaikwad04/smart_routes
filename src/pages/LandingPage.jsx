import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import './LandingPage.css'

const stats = [
  { value: '50+', label: 'Active Routes', icon: 'route' },
  { value: '2.4s', label: 'Avg Reroute Time', icon: 'speed' },
  { value: '98%', label: 'On-Time Rate', icon: 'verified' },
  { value: '31%', label: 'Fuel Saved', icon: 'eco' },
]

const features = [
  {
    icon: 'hub',
    title: 'Real-Time Network Graph',
    description: 'Treats every road as a node in a live, connected network that dynamically re-weights edges based on sensor data and traffic feeds.',
    chip: 'Core Engine',
    chipType: 'best',
  },
  {
    icon: 'traffic',
    title: 'Live Traffic Adaptation',
    description: 'Continuously ingests traffic API data and re-scores route segments, automatically marking congested roads as high-cost paths to avoid.',
    chip: 'Dynamic',
    chipType: 'alert',
  },
  {
    icon: 'compare_arrows',
    title: 'Route Comparison (Before / After)',
    description: 'Each reroute decision is recorded with a before/after snapshot so operators can audit and validate every change the system makes.',
    chip: 'Explainable',
    chipType: 'best',
  },
  {
    icon: 'priority_high',
    title: 'Priority Route Handling',
    description: 'Emergency vehicles and VIP deliveries get a dedicated priority lane in the optimizer — they are always resolved first, regardless of load.',
    chip: 'Priority',
    chipType: 'alert',
  },
  {
    icon: 'batch_prediction',
    title: 'Parallel Multi-Route Engine',
    description: 'Handles 50+ simultaneous routes without bottlenecks by processing each route concurrently with shared road-state awareness.',
    chip: 'Scalable',
    chipType: 'best',
  },
  {
    icon: 'psychology',
    title: 'Explainable Decisions',
    description: 'Every reroute comes with a plain-English reason such as "avoids 14-min traffic on NH-8" or "saves 6km via alternate arterial road".',
    chip: 'Transparent',
    chipType: 'best',
  },
]

const techStack = [
  { name: 'Python', desc: 'Core engine language', icon: 'code' },
  { name: 'FastAPI', desc: 'High-performance backend', icon: 'api' },
  { name: 'OSMnx + NetworkX', desc: 'Road graph intelligence', icon: 'hub' },
  { name: 'Scikit-learn', desc: 'Predictive ML models', icon: 'psychology' },
  { name: 'React.js', desc: 'Frontend interface', icon: 'web' },
  { name: 'Leaflet.js', desc: 'Interactive map rendering', icon: 'map' },
]

export default function LandingPage() {
  return (
    <div className="landing">
      <Navbar />

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-bg-grid" aria-hidden="true" />
        <div className="hero-bg-glow" aria-hidden="true" />
        <div className="container">
          <div className="hero-content fade-in-up">
            <div className="hero-eyebrow">
              <span className="chip chip-best">
                <span className="material-icons-round" style={{ fontSize: '12px' }}>fiber_manual_record</span>
                Live System Active
              </span>
            </div>

            <h1 className="hero-headline">
              Smart Route Optimization
              <span className="hero-headline-accent"> in Real-Time</span>
            </h1>

            <p className="hero-description">
              An AI-powered system managing 50+ routes simultaneously — continuously
              adapting to traffic, congestion, and road conditions so every driver
              always has the fastest path.
            </p>

            <div className="hero-actions">
              <Link to="/dashboard" className="btn btn-primary hero-btn-primary" id="cta-dashboard">
                <span className="material-icons-round">dashboard</span>
                Open Dashboard
              </Link>
              <Link to="/about" className="btn btn-secondary hero-btn-secondary" id="cta-about">
                <span className="material-icons-round">info</span>
                Learn More
              </Link>
            </div>
          </div>

          {/* ── Floating Route Card Preview ── */}
          <div className="hero-card-preview fade-in-up" style={{ animationDelay: '100ms' }}>
            <div className="preview-card">
              <div className="preview-card-header">
                <span className="material-icons-round preview-icon">route</span>
                <div>
                  <p className="preview-label">Active Route</p>
                  <p className="preview-title">Andheri → Dadar</p>
                </div>
                <span className="chip chip-best">Best</span>
              </div>
              <div className="preview-metrics">
                <div className="preview-metric">
                  <span className="preview-metric-value">22 min</span>
                  <span className="preview-metric-label">ETA</span>
                </div>
                <div className="preview-divider" />
                <div className="preview-metric">
                  <span className="preview-metric-value">14.2 km</span>
                  <span className="preview-metric-label">Distance</span>
                </div>
                <div className="preview-divider" />
                <div className="preview-metric">
                  <span className="preview-metric-value" style={{ color: 'var(--color-secondary)' }}>-8 min</span>
                  <span className="preview-metric-label">Time Saved</span>
                </div>
              </div>
              <div className="preview-update">
                <span className="preview-pulse" />
                <span className="preview-update-text">Rerouted 42s ago — traffic on Western Express Hwy</span>
              </div>
            </div>

            <div className="preview-card-mini">
              <div className="mini-route">
                <span className="material-icons-round" style={{ fontSize: '16px', color: 'var(--color-outline)' }}>circle</span>
                <div className="mini-route-info">
                  <span className="mini-route-name">Bandra → Kurla</span>
                  <span className="chip chip-alert" style={{ fontSize: '10px', padding: '2px 6px' }}>Rerouting</span>
                </div>
                <span className="mini-route-eta">18 min</span>
              </div>
              <div className="mini-route">
                <span className="material-icons-round" style={{ fontSize: '16px', color: 'var(--color-secondary)' }}>circle</span>
                <div className="mini-route-info">
                  <span className="mini-route-name">Thane → Vashi</span>
                  <span className="chip chip-best" style={{ fontSize: '10px', padding: '2px 6px' }}>On Track</span>
                </div>
                <span className="mini-route-eta">34 min</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, i) => (
              <div key={stat.label} className="stat-card fade-in-up" style={{ animationDelay: `${i * 60}ms` }}>
                <span className="material-icons-round stat-icon">{stat.icon}</span>
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <p className="section-eyebrow">Core Capabilities</p>
            <h2 className="section-title">Built for Real-World Complexity</h2>
            <p className="section-subtitle">
              Every feature is engineered around the chaos of real city roads —
              where conditions change every minute and no two routes are the same.
            </p>
          </div>

          <div className="features-grid">
            {features.map((f, i) => (
              <div key={f.title} className="feature-card fade-in-up" style={{ animationDelay: `${i * 50}ms` }}>
                <div className="feature-icon-wrap">
                  <span className="material-icons-round feature-icon">{f.icon}</span>
                </div>
                <div className="feature-body">
                  <div className="feature-title-row">
                    <h3 className="feature-title">{f.title}</h3>
                    <span className={`chip chip-${f.chipType}`}>{f.chip}</span>
                  </div>
                  <p className="feature-desc">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="how-section">
        <div className="container">
          <div className="section-header">
            <p className="section-eyebrow">System Logic</p>
            <h2 className="section-title">How It Works</h2>
          </div>
          <div className="how-steps">
            {[
              { step: '01', icon: 'hub', title: 'Map as Network', desc: 'Every road and intersection is mapped as a connected graph. Each road segment has a "cost" — how long it takes to travel.' },
              { step: '02', icon: 'sensors', title: 'Live Conditions Feed', desc: 'Traffic APIs, sensor data, and IoT streams continuously update the cost of each road segment in real time.' },
              { step: '03', icon: 'psychology', title: 'Smart Pathfinding', desc: 'The system finds the path with the lowest total cost. When traffic raises the cost of a road, it automatically re-paths around it.' },
              { step: '04', icon: 'notifications_active', title: 'Instant Reroute', desc: 'Drivers receive updated routes instantly. The system logs every decision with a plain-language explanation.' },
            ].map((s, i) => (
              <div key={s.step} className="how-step fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="how-step-number">{s.step}</div>
                <div className="how-step-icon-wrap">
                  <span className="material-icons-round how-step-icon">{s.icon}</span>
                </div>
                <h3 className="how-step-title">{s.title}</h3>
                <p className="how-step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tech Stack ── */}
      <section className="tech-section">
        <div className="container">
          <div className="section-header">
            <p className="section-eyebrow">Technology</p>
            <h2 className="section-title">Full Tech Stack</h2>
          </div>
          <div className="tech-grid">
            {techStack.map((t, i) => (
              <div key={t.name} className="tech-card fade-in-up" style={{ animationDelay: `${i * 50}ms` }}>
                <span className="material-icons-round tech-icon">{t.icon}</span>
                <span className="tech-name">{t.name}</span>
                <span className="tech-desc">{t.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="cta-banner">
        <div className="container">
          <div className="cta-inner">
            <div className="cta-text">
              <h2 className="cta-title">Ready to Optimize Your Routes?</h2>
              <p className="cta-desc">Open the live dashboard to see all 50+ routes, real-time reroutes, and priority handling in action.</p>
            </div>
            <Link to="/dashboard" className="btn btn-primary cta-action" id="cta-banner-btn">
              <span className="material-icons-round">open_in_new</span>
              Go to Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            <div className="footer-brand">
              <span className="navbar-logo" style={{ width: 28, height: 28, fontSize: 14 }}>
                <span className="material-icons-round" style={{ fontSize: 14 }}>route</span>
              </span>
              <span style={{ fontWeight: 700, fontSize: 'var(--font-body-md)' }}>SmartFlow Route Optimizer</span>
            </div>
            <p className="footer-copy">© 2026 SmartFlow. Built for the Hackathon.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
