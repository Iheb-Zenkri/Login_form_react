import React from 'react'
import { Link } from 'react-router-dom';

import './Pages/ConnectionPhase/Login.css'

export default function App() {
  return (
    <div className='LeftOverlayPanel'>
      <Link to ={'/Login'}>Login</Link>
      <Link to ={'/Dashboard/iheb'}>Dashboard</Link>
    </div>
  )
}

