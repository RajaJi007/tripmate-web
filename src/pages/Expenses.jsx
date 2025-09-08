import { useEffect, useMemo, useState } from 'react'
import { db, uid } from '../store/localDb'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

export default function Expenses() {
  const [planned, setPlanned] = useState('')
  const [actual, setActual] = useState('')
  const [category, setCategory] = useState('Transport')
  const [items, setItems] = useState(() => db.get('expenses', []))

  useEffect(() => db.set('expenses', items), [items])

  const addItem = (e) => {
    e.preventDefault()
    if (!planned || !actual) return
    setItems(prev => [...prev, { id: uid(), planned: Number(planned), actual: Number(actual), category }])
    setPlanned(''); setActual('')
  }

  const data = useMemo(() => {
    // aggregate by category
    const map = {}
    for (const it of items) {
      map[it.category] ??= { category: it.category, planned: 0, actual: 0 }
      map[it.category].planned += it.planned
      map[it.category].actual += it.actual
    }
    return Object.values(map)
  }, [items])

  const totalPlanned = data.reduce((a, b) => a + b.planned, 0)
  const totalActual = data.reduce((a, b) => a + b.actual, 0)
  const delta = totalActual - totalPlanned

  const suggestion = (() => {
    if (data.length === 0) return 'Add some expenses to see insights.'
    const worst = [...data].sort((a,b) => (b.actual - b.planned) - (a.actual - a.planned))[0]
    if (worst.actual > worst.planned) {
      const pct = Math.round(((worst.actual - worst.planned) / (worst.planned || 1)) * 100)
      return `You overspent most in “${worst.category}” (~${pct}% over plan). Consider cheaper options next time.`
    }
    return 'Nice! You are within the planned budget across categories.'
  })()

  return (
    <div className="grid gap-6">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white border">
          <div className="text-xs text-gray-500">Total Planned</div>
          <div className="text-2xl font-semibold">₹{totalPlanned}</div>
        </div>
        <div className="p-4 rounded-2xl bg-white border">
          <div className="text-xs text-gray-500">Total Actual</div>
          <div className="text-2xl font-semibold">₹{totalActual}</div>
        </div>
        <div className="p-4 rounded-2xl bg-white border">
          <div className="text-xs text-gray-500">{delta >= 0 ? 'Over' : 'Under'} Budget</div>
          <div className="text-2xl font-semibold">{delta >= 0 ? '+' : '-'}₹{Math.abs(delta)}</div>
        </div>
      </div>

      <form onSubmit={addItem} className="p-4 rounded-2xl bg-white border grid md:grid-cols-4 gap-3">
        <select value={category} onChange={e => setCategory(e.target.value)} className="border rounded-xl px-3 py-2">
          <option>Transport</option>
          <option>Stay</option>
          <option>Food</option>
          <option>Activities</option>
          <option>Shopping</option>
          <option>Other</option>
        </select>
        <input value={planned} onChange={e=>setPlanned(e.target.value)} type="number" placeholder="Planned ₹" className="border rounded-xl px-3 py-2" />
        <input value={actual} onChange={e=>setActual(e.target.value)} type="number" placeholder="Actual ₹" className="border rounded-xl px-3 py-2" />
        <button className="rounded-xl px-4 py-2 bg-black text-white">Add</button>
      </form>

      <div className="p-4 rounded-2xl bg-white border">
        <div className="mb-2 font-semibold">Planned vs Actual by category</div>
        <div className="w-full h-72">
          <ResponsiveContainer>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="planned" />
              <Bar dataKey="actual" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 text-sm text-gray-700">{suggestion}</div>
      </div>
    </div>
  )
}
