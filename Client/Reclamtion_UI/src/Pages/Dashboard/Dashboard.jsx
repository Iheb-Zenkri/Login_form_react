import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { NavLink, useParams } from 'react-router-dom'

import './dashboard.css'


function Dashboard() {

//Store the user data in the user variable :
  const username = useParams().user 
  const [user, setUser] = useState()
  useEffect(() =>{
    const fetchUser = async () => {
      try {
        const response  = await axios.get(`http://localhost:2024/Clients/${username}`)
        setUser(response.data)
      }catch (e) {
          console.log(e);
      }
    };
    fetchUser();
  },[username])

const headers =[
  {
    id : 1,
    name : "Profile",
  },
  {
    id : 2,
    name : "Newest",
  },
  {
    id : 3,
    name : "Reclamations",
  },
  {
    id : 4,
    name : "History",
  }
]


  return (
    <div className='NavBar'>
      {headers.map((head) => (
      <NavLink key={head.id} 
              to={`/Dashboard`}
              className={({ isActive }) => {
              return isActive ? 'activeLink' : 'Link';
      }}>
        {head.name}
      </NavLink>
      ))}
    </div>
  )
}

export default Dashboard