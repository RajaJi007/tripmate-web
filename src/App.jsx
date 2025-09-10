import { Outlet, NavLink } from "react-router-dom"
import { useEffect, useState } from "react"
import supabase from "./supabaseClient"

export default function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

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
