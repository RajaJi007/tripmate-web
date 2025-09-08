import { useEffect, useState } from 'react'

// Simple demo: fetch current weather by city from OpenWeather (requires your API key)
const OPENWEATHER_KEY = import.meta.env.VITE_OPENWEATHER_KEY

export default function Safety() {
  const [city, setCity] = useState('Manali')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)

  const rules = {
    Manali: ['Carry warm clothing', 'Check road conditions', 'Respect local customs'],
    Goa: ['Follow beach safety flags', 'Avoid unlicensed rentals', 'Respect noise rules'],
    Jaipur: ['Carry water', 'Dress modestly for temples', 'Beware of heat during noon']
  }

  async function fetchWeather() {
    if (!OPENWEATHER_KEY) return alert('Add VITE_OPENWEATHER_KEY in .env')
    setLoading(true)
    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_KEY}&units=metric`)
      const data = await res.json()
      setWeather(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { /* no-op */ }, [])

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="p-4 rounded-2xl bg-white border">
        <div className="font-semibold mb-2">Pre-Weather Alerts</div>
        <div className="flex gap-2 mb-3">
          <input className="border rounded-xl px-3 py-2 flex-1" value={city} onChange={e=>setCity(e.target.value)} placeholder="Enter city (e.g., Manali)" />
          <button onClick={fetchWeather} className="rounded-xl px-3 py-2 bg-black text-white">{loading ? 'Loading...' : 'Check'}</button>
        </div>
        {weather && weather.main && (
          <div className="text-sm">
            <div>Temperature: {weather.main.temp} °C</div>
            <div>Condition: {weather.weather?.[0]?.description}</div>
            <div>Wind: {weather.wind?.speed} m/s</div>
          </div>
        )}
        {!weather && <div className="text-xs text-gray-500">Enter a city and click Check.</div>}
      </div>

      <div className="p-4 rounded-2xl bg-white border">
        <div className="font-semibold mb-2">Local Rules & Regulations</div>
        <ul className="list-disc pl-5 text-sm">
          {(rules[city] ?? ['No data, add your own rules in Safety.jsx']).map((r, i) => <li key={i}>{r}</li>)}
        </ul>
      </div>
    </div>
  )
}
