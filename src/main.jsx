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

// Add to all components
const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)

if (error) 
  return <div className="text-red-500">Error: {error}</div>
if (loading)
  return <div>Loading...</div>
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
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
