import { Outlet, NavLink } from "react-router-dom"
import { useEffect, useState } from "react"
import supabase from "./supabaseClient"

export default function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
// Add to all components
const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)

if (error) 
  return <div className="text-red-500">Error: {error}</div>
if (loading) 
  return <div>Loading...</div>
  // Add this useEffect to handle auth callback
useEffect(() => {
  const { data: authListener } = supabase.auth.onAuthStateChange(
    (event, session) => {
      if (event === 'SIGNED_IN') {
        setSession(session)
      }
      if (event === 'SIGNED_OUT') {
        setSession(null)
      }
    }
  )
  
  return () => authListener.subscription.unsubscribe()
}, [])
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  if (!session) {
    return (
      <div className="flex items-center justify-center h-screen">
        <button 
          onClick={() => supabase.auth.signInWithOAuth({ provider: "google" })} 
          className="bg-red-500 text-white px-4 py-2 rounded">
          Login with Google
        </button>
        // Add to App.jsx after login
<nav className="bg-white border-b p-4 mb-6">
  <div className="flex items-center justify-between">
    <h1 className="text-xl font-bold">TripMate</h1>
    <div className="flex gap-4">
      <NavLink to="/expenses" className="hover:text-blue-600">Expenses</NavLink>
      <NavLink to="/planning" className="hover:text-blue-600">Planning</NavLink>
      <NavLink to="/safety" className="hover:text-blue-600">Safety</NavLink>
      <NavLink to="/photos" className="hover:text-blue-600">Photos</NavLink>
      <NavLink to="/logs" className="hover:text-blue-600">Logs</NavLink>
    </div>
    <button onClick={() => supabase.auth.signOut()}>Logout</button>
  </div>
</nav>
      </div>
    )
  }

  return (
    <div>
      <h1>Welcome {session.user.email}</h1>
      <button 
        onClick={() => supabase.auth.signOut()} 
        className="bg-gray-700 text-white px-4 py-2 rounded">
        Logout
      </button>

      {/* This is where nested routes (Expenses, Planning, etc.) will render */}
      <Outlet />
    </div>
  )
}
