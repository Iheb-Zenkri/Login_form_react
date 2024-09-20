import React, { useState} from 'react'
import SignUpFormClient from './SignUpFormClient';
import SignUpFormCompany from './SignUpFormCompany';
import './Login.css'
const signUpForm = () => {
  
  const [currentPage, setPage] = useState(1);

 
  return (
    <>
        {currentPage === 1 &&(
          <div className="choice_page" >
            <button className='submit-button' onClick={() => setPage(2)}>Signup as Client</button>
            <h1>OR</h1>
            <button className='submit-button' onClick={() => setPage(3)}>Signup as Company</button>
          </div>
        )}
        {currentPage === 2 && (
          <SignUpFormClient />
        )}
        {currentPage === 3 && (
          <SignUpFormCompany />
        )}
    </>
  )
}

export default signUpForm