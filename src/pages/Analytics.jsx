import React, { useState, useEffect } from 'react'
import './Analytics.css'

export default function Analytics() {
  const [data, setData] = useState(null)
  
  useEffect(() => {
    // Simulated fetch of historical analytics data
    setTimeout(() => {
      setData({
        totalTrips: 1240,
        fuelSaved: 485, // Liters
        co2Prevented: 1.2, // Tons
        weeklyData: [
          { day: 'Mon', fuel: 45, routes: 120 },
          { day: 'Tue', fuel: 52, routes: 145 },
          { day: 'Wed', fuel: 38, routes: 110 },
          { day: 'Thu', fuel: 65, routes: 190 },
          { day: 'Fri', fuel: 80, routes: 220 },
          { day: 'Sat', fuel: 110, routes: 305 },
          { day: 'Sun', fuel: 95, routes: 260 },
        ],
        congestedCorridors: [
          { name: 'Western Express Highway', delay: 45 },
          { name: 'Sion-Panvel Expressway', delay: 32 },
          { name: 'JVLR', delay: 28 },
          { name: 'Eastern Freeway', delay: 15 },
        ]
      })
    }, 800)
  }, [])

  if (!data) {
    return (
      <div className="analytics-loading">
        <span className="material-icons-round spin">data_usage</span>
        <p>Crunching fleet data...</p>
      </div>
    )
  }

  const maxFuel = Math.max(...data.weeklyData.map(d => d.fuel))

  return (
    <div className="analytics-page">
      <div className="analytics-header">
        <h1>Fleet Analytics</h1>
        <p>AI Insights & Environmental Impact</p>
      </div>

      <div className="analytics-kpi-grid">
        <div className="kpi-card">
          <span className="material-icons-round kpi-icon">route</span>
          <h3>{data.totalTrips.toLocaleString()}</h3>
          <p>Total Optimized Routes</p>
        </div>
        <div className="kpi-card highlight-eco">
          <span className="material-icons-round kpi-icon">local_gas_station</span>
          <h3>{data.fuelSaved} L</h3>
          <p>Estimated Fuel Saved</p>
        </div>
        <div className="kpi-card highlight-co2">
          <span className="material-icons-round kpi-icon">co2</span>
          <h3>{data.co2Prevented} T</h3>
          <p>CO₂ Emissions Prevented</p>
        </div>
      </div>

      <div className="analytics-main-grid">
        <div className="analytics-card chart-card">
          <h2>Weekly Fuel Consumption Trends</h2>
          <div className="bar-chart">
            {data.weeklyData.map((d) => {
              const heightPct = (d.fuel / maxFuel) * 100
              return (
                <div key={d.day} className="bar-column">
                  <div className="bar-tooltip">{d.fuel}L ({d.routes} trips)</div>
                  <div className="bar-fill" style={{ height: `${heightPct}%` }}></div>
                  <div className="bar-label">{d.day}</div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="analytics-card list-card">
          <h2>Most Congested Corridors (Avg Delay)</h2>
          <ul className="corridor-list">
            {data.congestedCorridors.map(c => (
              <li key={c.name}>
                <span className="corridor-name">{c.name}</span>
                <span className="corridor-delay">
                  <span className="material-icons-round">timer</span>
                  {c.delay} min
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
