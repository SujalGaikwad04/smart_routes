import { useState, useEffect, useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  MapContainer,
  TileLayer,
  Polyline,
  CircleMarker,
  Tooltip,
  useMap,
} from 'react-leaflet'
import L from 'leaflet'
import Navbar from '../components/Navbar'
import './Dashboard.css'

// Fix default Leaflet icon paths in Vite
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

/* ─────────────────────────────────────────────
   Route definitions with real Mumbai lat/lng
───────────────────────────────────────────── */
const INITIAL_ROUTES = [
  {
    id: 'R01', from: 'Andheri', to: 'Dadar',
    fromPos: [19.1197, 72.8464], toPos: [19.0196, 72.8479],
    waypoints: [[19.1197, 72.8464], [19.0800, 72.8400], [19.0600, 72.8450], [19.0196, 72.8479]],
    eta: 22, distance: 14.2, status: 'best', saved: 8,
    reason: 'Avoids traffic on Western Express Hwy — faster via link road', priority: false,
  },
  {
    id: 'R02', from: 'Bandra', to: 'Kurla',
    fromPos: [19.0596, 72.8295], toPos: [19.0728, 72.8826],
    waypoints: [[19.0596, 72.8295], [19.0650, 72.8500], [19.0680, 72.8700], [19.0728, 72.8826]],
    eta: 18, distance: 9.6, status: 'rerouting', saved: 5,
    reason: 'LBS Marg congested — rerouting via Dharavi', priority: false,
  },
  {
    id: 'R03', from: 'Thane', to: 'Vashi',
    fromPos: [19.2183, 72.9781], toPos: [19.0771, 73.0028],
    waypoints: [[19.2183, 72.9781], [19.1700, 72.9900], [19.1200, 73.0000], [19.0771, 73.0028]],
    eta: 34, distance: 21.3, status: 'best', saved: 0,
    reason: 'Clear route via Airoli bridge — no congestion detected', priority: false,
  },
  {
    id: 'R04', from: 'Borivali', to: 'Churchgate',
    fromPos: [19.2307, 72.8567], toPos: [18.9355, 72.8252],
    waypoints: [[19.2307, 72.8567], [19.1500, 72.8400], [19.0800, 72.8400], [19.0000, 72.8300], [18.9355, 72.8252]],
    eta: 52, distance: 38.1, status: 'delayed', saved: -6,
    reason: 'Sea Link closed — forced via Sion causing significant delay', priority: true,
  },
  {
    id: 'R05', from: 'Malad', to: 'Ghatkopar',
    fromPos: [19.1874, 72.8481], toPos: [19.0860, 72.9081],
    waypoints: [[19.1874, 72.8481], [19.1600, 72.8700], [19.1300, 72.8900], [19.0860, 72.9081]],
    eta: 27, distance: 17.8, status: 'best', saved: 11,
    reason: 'JVLR flyover clear — 11 min faster than alternate', priority: false,
  },
  {
    id: 'R06', from: 'Chembur', to: 'Nariman Point',
    fromPos: [19.0621, 72.8990], toPos: [18.9258, 72.8216],
    waypoints: [[19.0621, 72.8990], [19.0400, 72.8700], [19.0000, 72.8500], [18.9600, 72.8300], [18.9258, 72.8216]],
    eta: 41, distance: 26.4, status: 'rerouting', saved: 3,
    reason: 'CST road works — rerouting via Parel saves 3 min', priority: false,
  },
  {
    id: 'R07', from: 'Powai', to: 'BKC',
    fromPos: [19.1197, 72.9050], toPos: [19.0653, 72.8654],
    waypoints: [[19.1197, 72.9050], [19.1000, 72.8900], [19.0800, 72.8750], [19.0653, 72.8654]],
    eta: 16, distance: 8.9, status: 'best', saved: 4,
    reason: 'Via JVLR avoiding Eastern Express Hwy congestion', priority: false,
  },
  {
    id: 'R08', from: 'Mulund', to: 'Worli',
    fromPos: [19.1763, 72.9577], toPos: [19.0178, 72.8178],
    waypoints: [[19.1763, 72.9577], [19.1300, 72.9200], [19.0800, 72.8900], [19.0400, 72.8500], [19.0178, 72.8178]],
    eta: 48, distance: 32.5, status: 'delayed', saved: -3,
    reason: 'Heavy congestion on Eastern Freeway — no clear alternate', priority: true,
  },
  {
    id: 'R09', from: 'Goregaon', to: 'Lower Parel',
    fromPos: [19.1663, 72.8526], toPos: [18.9940, 72.8296],
    waypoints: [[19.1663, 72.8526], [19.1200, 72.8400], [19.0600, 72.8350], [18.9940, 72.8296]],
    eta: 35, distance: 22.7, status: 'best', saved: 7,
    reason: 'WEH clear — direct route is optimal', priority: false,
  },
  {
    id: 'R10', from: 'Kandivali', to: 'Fort',
    fromPos: [19.2053, 72.8570], toPos: [18.9358, 72.8349],
    waypoints: [[19.2053, 72.8570], [19.1500, 72.8450], [19.0900, 72.8380], [19.0200, 72.8350], [18.9358, 72.8349]],
    eta: 58, distance: 39.2, status: 'rerouting', saved: 2,
    reason: 'Rerouting via SCLR due to accident on WEH', priority: false,
  },
]

const STATUS = {
  best:      { label: 'Best Route',  chipClass: 'chip-best',  icon: 'check_circle',  color: '#006d37',  lineColor: '#4ae183' },
  rerouting: { label: 'Rerouting',   chipClass: 'chip-alert', icon: 'refresh',       color: '#904800',  lineColor: '#ffb783' },
  delayed:   { label: 'Delayed',     chipClass: 'chip-error', icon: 'warning',       color: '#ba1a1a',  lineColor: '#ff5449' },
}

/* ── Live Simulation Hook ── */
function useSimulation(setRoutes) {
  useEffect(() => {
    const interval = setInterval(() => {
      setRoutes(prev => prev.map(r => {
        const delta = (Math.random() - 0.4) * 2
        const pool = ['best', 'best', 'best', 'rerouting', 'delayed']
        return {
          ...r,
          eta: Math.max(5, Math.round(r.eta + delta)),
          status: Math.random() > 0.9 ? pool[Math.floor(Math.random() * pool.length)] : r.status,
        }
      }))
    }, 5000)
    return () => clearInterval(interval)
  }, [setRoutes])
}

/* ── Fit map to selected route ── */
function FlyToRoute({ route }) {
  const map = useMap()
  useEffect(() => {
    if (!route) return
    const bounds = L.latLngBounds(route.waypoints)
    map.flyToBounds(bounds, { padding: [60, 60], duration: 1 })
  }, [route, map])
  return null
}

/* ───────────────────────────────────────────── */
export default function Dashboard() {
  const [routes, setRoutes] = useState(INITIAL_ROUTES)
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('all')
  const [lastUpdate, setLastUpdate] = useState(new Date())

  useSimulation(setRoutes)

  useEffect(() => {
    const t = setInterval(() => setLastUpdate(new Date()), 5000)
    return () => clearInterval(t)
  }, [])

  const filtered = filter === 'all' ? routes : routes.filter(r => r.status === filter)

  const totalBest      = routes.filter(r => r.status === 'best').length
  const totalRerouting = routes.filter(r => r.status === 'rerouting').length
  const totalDelayed   = routes.filter(r => r.status === 'delayed').length
  const avgEta         = Math.round(routes.reduce((a, b) => a + b.eta, 0) / routes.length)
  const totalSaved     = routes.reduce((a, b) => a + Math.max(0, b.saved), 0)

  return (
    <div className="dashboard">
      <Navbar />

      <div className="dashboard-layout">
        {/* ══════════ SIDEBAR ══════════ */}
        <aside className="dashboard-sidebar">
          <div className="sidebar-header">
            <h1 className="sidebar-title">Route Manager</h1>
            <div className="sidebar-live">
              <span className="live-pulse" />
              <span className="live-text">Live</span>
            </div>
          </div>

          <p className="sidebar-update">
            Updated {lastUpdate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </p>

          {/* KPI Cards */}
          <div className="kpi-grid">
            <div className="kpi-card kpi-green">
              <span className="kpi-value">{totalBest}</span>
              <span className="kpi-label">Best</span>
            </div>
            <div className="kpi-card kpi-orange">
              <span className="kpi-value">{totalRerouting}</span>
              <span className="kpi-label">Rerouting</span>
            </div>
            <div className="kpi-card kpi-red">
              <span className="kpi-value">{totalDelayed}</span>
              <span className="kpi-label">Delayed</span>
            </div>
            <div className="kpi-card kpi-blue">
              <span className="kpi-value">{avgEta}m</span>
              <span className="kpi-label">Avg ETA</span>
            </div>
          </div>

          <div className="saved-banner">
            <span className="material-icons-round" style={{ color: 'var(--color-secondary)', fontSize: 18 }}>schedule</span>
            <span className="saved-value">{totalSaved} min saved</span>
            <span className="saved-label">today</span>
          </div>

          {/* Filters */}
          <div className="filter-tabs">
            {['all', 'best', 'rerouting', 'delayed'].map(f => (
              <button
                key={f}
                id={`filter-${f}`}
                onClick={() => setFilter(f)}
                className={`filter-tab ${filter === f ? 'active' : ''}`}
              >
                {f === 'all' ? 'All Routes' : STATUS[f]?.label}
              </button>
            ))}
          </div>

          {/* Route List */}
          <div className="route-list">
            {filtered.map(route => {
              const cfg = STATUS[route.status]
              const isSelected = selected?.id === route.id
              return (
                <button
                  key={route.id}
                  id={`route-${route.id}`}
                  className={`route-item ${isSelected ? 'selected' : ''}`}
                  onClick={() => setSelected(isSelected ? null : route)}
                >
                  <div className="route-item-top">
                    <div className="route-item-path">
                      {route.priority && (
                        <span className="material-icons-round priority-icon">priority_high</span>
                      )}
                      <span className="route-item-name">{route.from}</span>
                      <span className="material-icons-round route-arrow">arrow_forward</span>
                      <span className="route-item-name">{route.to}</span>
                    </div>
                    <span className={`chip ${cfg.chipClass}`}>
                      <span className="material-icons-round" style={{ fontSize: '11px' }}>{cfg.icon}</span>
                      {cfg.label}
                    </span>
                  </div>
                  <div className="route-item-meta">
                    <span className="route-meta-item">
                      <span className="material-icons-round">schedule</span>{route.eta} min
                    </span>
                    <span className="route-meta-item">
                      <span className="material-icons-round">straighten</span>{route.distance} km
                    </span>
                    {route.saved !== 0 && (
                      <span className={`route-meta-saved ${route.saved > 0 ? 'pos' : 'neg'}`}>
                        {route.saved > 0 ? `−${route.saved}m` : `+${Math.abs(route.saved)}m`}
                      </span>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </aside>

        {/* ══════════ MAIN PANEL ══════════ */}
        <main className="dashboard-main">
          {/* ── Leaflet Map ── */}
          <div className="map-panel">
            <MapContainer
              center={[19.0760, 72.8777]}
              zoom={11}
              className="leaflet-map"
              zoomControl={false}
            >
              {/* OpenStreetMap tile layer */}
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* Fly to selected route */}
              <FlyToRoute route={selected} />

              {/* Draw all routes as polylines */}
              {routes.map(route => {
                const cfg = STATUS[route.status]
                const isSelected = selected?.id === route.id
                return (
                  <Polyline
                    key={route.id}
                    positions={route.waypoints}
                    pathOptions={{
                      color: cfg.lineColor,
                      weight: isSelected ? 6 : 3,
                      opacity: isSelected ? 1 : 0.55,
                      dashArray: route.status === 'rerouting' ? '10 6' : undefined,
                    }}
                    eventHandlers={{ click: () => setSelected(route) }}
                  >
                    <Tooltip sticky>
                      <strong>{route.from} → {route.to}</strong><br />
                      {route.eta} min · {route.distance} km
                    </Tooltip>
                  </Polyline>
                )
              })}

              {/* Draw origin/destination markers */}
              {routes.map(route => {
                const cfg = STATUS[route.status]
                const isSelected = selected?.id === route.id
                return (
                  <RouteMarkers
                    key={route.id}
                    route={route}
                    color={cfg.lineColor}
                    isSelected={isSelected}
                    onSelect={() => setSelected(route)}
                  />
                )
              })}
            </MapContainer>

            {/* Map Legend */}
            <div className="map-legend">
              <p className="map-legend-title">Route Status</p>
              {Object.entries(STATUS).map(([key, val]) => (
                <div key={key} className="legend-item">
                  <span className="legend-dot" style={{ background: val.lineColor }} />
                  <span>{val.label}</span>
                </div>
              ))}
              <div className="legend-item" style={{ marginTop: 4, opacity: 0.6 }}>
                <span style={{ fontFamily: 'monospace', fontSize: 12 }}>- - -</span>
                <span>Rerouting path</span>
              </div>
            </div>

            {/* Live badge */}
            <div className="map-live-badge">
              <span className="live-pulse" />
              <span>Mumbai · Live Network</span>
            </div>
          </div>

          {/* ── Route Detail / Empty ── */}
          {selected ? (
            <RouteDetail route={selected} onClose={() => setSelected(null)} />
          ) : (
            <div className="detail-empty">
              <span className="material-icons-round detail-empty-icon">touch_app</span>
              <p className="detail-empty-text">Click a route in the list or tap a line on the map to see full details.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

/* ── Origin + Destination markers ── */
function RouteMarkers({ route, color, isSelected, onSelect }) {
  const r = isSelected ? 9 : 6
  return (
    <>
      <CircleMarker
        center={route.fromPos}
        radius={r}
        pathOptions={{ color: 'white', fillColor: color, fillOpacity: 1, weight: 2 }}
        eventHandlers={{ click: onSelect }}
      >
        <Tooltip direction="top">{route.from}</Tooltip>
      </CircleMarker>
      <CircleMarker
        center={route.toPos}
        radius={r}
        pathOptions={{ color: 'white', fillColor: color, fillOpacity: 1, weight: 2, dashArray: '4 2' }}
        eventHandlers={{ click: onSelect }}
      >
        <Tooltip direction="top">{route.to}</Tooltip>
      </CircleMarker>
    </>
  )
}

/* ── Route Detail Panel ── */
function RouteDetail({ route, onClose }) {
  const cfg = STATUS[route.status]
  const beforeEta = route.eta + Math.abs(route.saved) + 4

  return (
    <div className="route-detail slide-in-right">
      <div className="detail-header">
        <div className="detail-header-left">
          <div className="detail-route-id">{route.id}</div>
          <div>
            <div className="detail-path">
              <span className="material-icons-round" style={{ fontSize: 16, color: 'var(--color-on-surface-variant)' }}>fiber_manual_record</span>
              {route.from}
              <span className="material-icons-round detail-arrow">arrow_forward</span>
              <span className="material-icons-round" style={{ fontSize: 14, color: cfg.color }}>place</span>
              {route.to}
            </div>
            <div className="detail-meta-row">
              <span className={`chip ${cfg.chipClass}`}>
                <span className="material-icons-round" style={{ fontSize: '11px' }}>{cfg.icon}</span>
                {cfg.label}
              </span>
              {route.priority && <span className="chip chip-error">Priority</span>}
            </div>
          </div>
        </div>
        <button className="detail-close" onClick={onClose} id="detail-close-btn">
          <span className="material-icons-round">close</span>
        </button>
      </div>

      <div className="detail-body">
        {/* Metrics */}
        <div className="detail-metrics">
          <div className="detail-metric">
            <span className="detail-metric-val">{route.eta} min</span>
            <span className="detail-metric-lbl">ETA</span>
          </div>
          <div className="detail-metric">
            <span className="detail-metric-val">{route.distance} km</span>
            <span className="detail-metric-lbl">Distance</span>
          </div>
          <div className="detail-metric">
            <span className="detail-metric-val" style={{ color: route.saved >= 0 ? 'var(--color-secondary)' : 'var(--color-error)' }}>
              {route.saved >= 0 ? `−${route.saved}` : `+${Math.abs(route.saved)}`} min
            </span>
            <span className="detail-metric-lbl">Time {route.saved >= 0 ? 'Saved' : 'Added'}</span>
          </div>
        </div>

        {/* Reason */}
        <div className="detail-reason">
          <span className="material-icons-round" style={{ fontSize: 16, color: 'var(--color-primary)' }}>lightbulb</span>
          <div>
            <p className="detail-reason-title">Why this route?</p>
            <p className="detail-reason-body">{route.reason}</p>
          </div>
        </div>

        {/* Before / After comparison */}
        <div className="comparison">
          <p className="comparison-title">Before vs After Reroute</p>
          <div className="comparison-grid">
            <div className="comparison-card before">
              <span className="comparison-card-label">Before</span>
              <span className="comparison-eta red">{beforeEta} min</span>
              <span className="comparison-note">Original route — congested</span>
            </div>
            <div className="comparison-arrow-wrap">
              <span className="material-icons-round">arrow_forward</span>
            </div>
            <div className="comparison-card after">
              <span className="comparison-card-label">After</span>
              <span className="comparison-eta green">{route.eta} min</span>
              <span className="comparison-note">Optimized path</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="detail-actions">
          <button className="btn btn-primary" id={`btn-apply-${route.id}`}>
            <span className="material-icons-round">check</span>Apply Route
          </button>
          <button className="btn btn-secondary" id={`btn-history-${route.id}`}>
            <span className="material-icons-round">history</span>History
          </button>
        </div>
      </div>
    </div>
  )
}
