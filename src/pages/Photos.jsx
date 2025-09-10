import { useEffect, useState } from 'react'
import { db, uid } from '../store/localDb'

export default function Photos() {
  const [items, setItems] = useState(() => db.get('photos', []))
  const [loc, setLoc] = useState(null)

  useEffect(() => db.set('photos', items), [items])
// Add to all components
const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)

if (error) return <div className="text-red-500">Error: {error}</div>
if (loading) return <div>Loading...</div>
  const getLocation = () => {
    if (!navigator.geolocation) return alert('Geolocation not supported')
    navigator.geolocation.getCurrentPosition(
      (pos) => setLoc({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => alert('Location error: ' + err.message)
    )
  }

  const uploadPhoto = async (file) => {
  const { data, error } = await supabase.storage
    .from('photos')
    .upload(`${session.user.id}/${Date.now()}.jpg`, file)
  
  if (!error) {
    // Store the path in your database instead of base64
  }
}
  const onFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setItems(prev => [...prev, { id: uid(), dataUrl: reader.result, location: loc, createdAt: new Date().toISOString() }])
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="grid gap-6">
      <div className="p-4 rounded-2xl bg-white border flex flex-wrap items-center gap-3">
        <button onClick={getLocation} className="rounded-xl px-4 py-2 border">Get GPS</button>
        <label className="rounded-xl px-4 py-2 bg-black text-white cursor-pointer">
          <input type="file" accept="image/*" onChange={onFile} className="hidden" />
          Upload Photo
        </label>
        <div className="text-sm text-gray-600">
          {loc ? `Location: ${loc.lat.toFixed(4)}, ${loc.lng.toFixed(4)}` : 'No location yet'}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map(p => (
          <div key={p.id} className="rounded-2xl overflow-hidden bg-white border">
            <img src={p.dataUrl} alt="trip" className="w-full h-48 object-cover" />
            <div className="p-3 text-xs text-gray-700">
              <div>{new Date(p.createdAt).toLocaleString()}</div>
              <div>{p.location ? `${p.location.lat.toFixed(4)}, ${p.location.lng.toFixed(4)}` : 'No GPS'}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
