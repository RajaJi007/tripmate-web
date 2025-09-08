import { useEffect, useState } from 'react'
import { db, uid } from '../store/localDb'

export default function Logs() {
  const [text, setText] = useState('')
  const [loc, setLoc] = useState(null)
  const [items, setItems] = useState(() => db.get('logs', []))

  useEffect(() => db.set('logs', items), [items])

  const getLocation = () => {
    if (!navigator.geolocation) return alert('Geolocation not supported')
    navigator.geolocation.getCurrentPosition(
      (pos) => setLoc({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => alert('Location error: ' + err.message)
    )
  }

  const addLog = (e) => {
    e.preventDefault()
    if (!text) return
    setItems(prev => [{ id: uid(), text, location: loc, createdAt: new Date().toISOString() }, ...prev])
    setText('')
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={addLog} className="p-4 rounded-2xl bg-white border grid md:grid-cols-4 gap-3">
        <input className="border rounded-xl px-3 py-2 md:col-span-3" placeholder="What did you do today?" value={text} onChange={e=>setText(e.target.value)} />
        <div className="flex gap-2">
          <button type="button" onClick={getLocation} className="rounded-xl px-4 py-2 border">GPS</button>
          <button className="rounded-xl px-4 py-2 bg-black text-white">Add Log</button>
        </div>
      </form>

      <ul className="grid gap-3">
        {items.map(l => (
          <li key={l.id} className="rounded-2xl bg-white border p-4">
            <div className="text-xs text-gray-500">{new Date(l.createdAt).toLocaleString()}</div>
            <div className="text-sm mt-1">{l.text}</div>
            <div className="text-xs text-gray-600 mt-1">{l.location ? `${l.location.lat.toFixed(4)}, ${l.location.lng.toFixed(4)}` : 'No GPS'}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
