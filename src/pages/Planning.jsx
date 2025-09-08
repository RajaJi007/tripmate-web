import { useEffect, useState } from 'react'
import { db, uid } from '../store/localDb'

export default function Planning() {
  const [memberName, setMemberName] = useState('')
  const [destName, setDestName] = useState('')
  const [members, setMembers] = useState(() => db.get('members', []))
  const [destinations, setDestinations] = useState(() => db.get('destinations', []))

  useEffect(() => db.set('members', members), [members])
  useEffect(() => db.set('destinations', destinations), [destinations])

  const addMember = (e) => {
    e.preventDefault()
    if (!memberName) return
    setMembers(prev => [...prev, { id: uid(), name: memberName }])
    setMemberName('')
  }

  const addDestination = (e) => {
    e.preventDefault()
    if (!destName) return
    setDestinations(prev => [...prev, { id: uid(), name: destName, votes: 0 }])
    setDestName('')
  }

  const vote = (id) => {
    setDestinations(prev => prev.map(d => d.id === id ? { ...d, votes: d.votes + 1 } : d))
  }

  const sorted = [...destinations].sort((a,b) => b.votes - a.votes)

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="p-4 rounded-2xl bg-white border">
        <div className="font-semibold mb-2">Group Members</div>
        <form onSubmit={addMember} className="flex gap-2 mb-3">
          <input className="border rounded-xl px-3 py-2 flex-1" value={memberName} onChange={e=>setMemberName(e.target.value)} placeholder="Add member name" />
          <button className="rounded-xl px-3 py-2 bg-black text-white">Add</button>
        </form>
        <ul className="text-sm">
          {members.map(m => <li key={m.id} className="py-1">{m.name}</li>)}
        </ul>
      </div>

      <div className="p-4 rounded-2xl bg-white border">
        <div className="font-semibold mb-2">Destinations (vote to prioritize)</div>
        <form onSubmit={addDestination} className="flex gap-2 mb-3">
          <input className="border rounded-xl px-3 py-2 flex-1" value={destName} onChange={e=>setDestName(e.target.value)} placeholder="Add destination" />
          <button className="rounded-xl px-3 py-2 bg-black text-white">Add</button>
        </form>
        <ul className="text-sm">
          {sorted.map(d => (
            <li key={d.id} className="flex items-center justify-between py-1">
              <span>{d.name}</span>
              <span className="flex items-center gap-2">
                <button onClick={()=>vote(d.id)} className="text-xs rounded-lg px-2 py-1 border">Vote</button>
                <span className="text-xs text-gray-600">{d.votes} votes</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
