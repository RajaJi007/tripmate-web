import { Outlet, NavLink } from "react-router-dom"
import { Plane } from "lucide-react"
import { useState, useEffect } from "react"
import supabase from "./supabaseClient"

export default function App() {
  const [dark, setDark] = useState(false)
  const [session, setSession] = useState(null)

  // Listen for login/logout state
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth event:", _event, session)
      setSession(session)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  // If user not logged in → show login screen
  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <Plane /> TripMate
        </h1>
        <button
          onClick={() => supabase.auth.signInWithOAuth({ provider: "google" })}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl shadow-lg transition"
        >
          Login with Google
        </button>
      </div>
    )
  }

  // If logged in → show full app
  return (
    <div className={dark ? "dark bg-gray-900 text-white min-h-screen" : "bg-gray-100 min-h-screen"}>
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-indigo-600 text-white shadow-md">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Plane /> TripMate
        </h1>

        {/* Navigation */}
        <nav className="flex gap-4">
          <NavLink to="/expenses" className="hover:text-yellow-300">Expenses</NavLink>
          <NavLink to="/planning" className="hover:text-yellow-300">Planning</NavLink>
          <NavLink to="/safety" className="hover:text-yellow-300">Safety</NavLink>
          <NavLink to="/photos" className="hover:text-yellow-300">Photos</NavLink>
          <NavLink to="/logs" className="hover:text-yellow-300">Logs</NavLink>
        </nav>

        {/* Theme Toggle + Logout */}
        <div className="flex items-center gap-4">
          <button 
            className="bg-black px-3 py-1 rounded-lg"
            onClick={() => setDark(!dark)}
          >
            Toggle Theme
          </button>
          <button
            onClick={() => supabase.auth.signOut()}
            className="bg-red-500 px-3 py-1 rounded-lg"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Page Content */}
      <main className="p-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="p-4 text-center bg-gray-200 text-gray-600">
        © 2025 TripMate
      </footer>
    </div>
