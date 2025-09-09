import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './styles.css'
import App from './App'
import Expenses from './pages/Expenses'
import Planning from './pages/Planning'
import Safety from './pages/Safety'
import Photos from './pages/Photos'
import Logs from './pages/Logs'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Expenses /> },
      { path: 'expenses', element: <Expenses /> },
      { path: 'planning', element: <Planning /> },
      { path: 'safety', element: <Safety /> },
      { path: 'photos', element: <Photos /> },
      { path: 'logs', element: <Logs /> },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
import { useEffect, useState } from "react"
import supabase from "./supabaseClient"

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

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
    <div>
      <h1>Welcome {session.user.email}</h1>
      <button 
        onClick={() => supabase.auth.signOut()} 
        className="bg-gray-700 text-white px-4 py-2 rounded">
        Logout
      </button>
    </div>
  )
  }
