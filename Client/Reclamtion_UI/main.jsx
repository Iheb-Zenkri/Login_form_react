import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';


import App from './src/App.jsx'
import './style.css'
import { Login } from './src/Pages/ConnectionPhase/Login.jsx';
import Dashboard from './src/Pages/Dashboard/Dashboard.jsx';

const router = createBrowserRouter([
  {
    path : '/',
    element : <App />,
  },
  {
    path : '/*' ,
    element : <Navigate to = '/' />
  },
  {
    path :'/Login',
    element : <Login />
  },
  {
    path :'/Dashboard/:user',
    element : <Dashboard />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
