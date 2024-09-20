import React, {useState} from 'react'
import './Login.css'
import SignInForm  from './SignInForm'
import SignUpForm from './SignUpForm';





export  function Login() {
  const [signIn, toggle] = useState(true);

  return (
  <div className="loginPage">
    <div className="container">
      <div className={`SignUpContainer  ${signIn ? '' : 'inactive'}`}>
          <SignUpForm />
      </div>
      <div className={`SignInContainer ${signIn ? '' : 'inactive'}`}>
          <SignInForm  />
      </div>
      <div className={`OverlayContainer ${signIn ? '' : 'inactive'}`}>
        <div className={`Overlay ${signIn ? '' : 'inactive'}`}>
          <div className={`LeftOverlayPanel ${signIn ? '' : 'inactive'}`}>
            <h1>Welcome Back!</h1>
            <p>
              Enter Your personal details and start journey with us
            </p>
            <h2>OR</h2>
            <p>
                To keep connected with us please login with your personal info
            </p>
            <button type='submit' className="GhostButton" onClick={() => toggle(true)}>Sign In</button>
          </div>
          <div className={`RightOverlayPanel ${signIn ? '' : 'inactive'}`}>
          <h1>Hello, Friend!</h1>
            <p>
              Please login with your personal info
            </p>
            <h2>OR</h2>
            <p>
              Start your journey with us
            </p>
            <button type='submit' className="GhostButton" onClick={() => toggle(false)}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

