import React,{useState} from 'react'
import { FormInput } from './FormInput'
import './Login.css'
import axios from "axios"
import { useNavigate } from "react-router-dom";

function SignInForm() {
  const [values, setValues] = useState({
      username: "",
      password: "",
    });
  const [errorMessage, setErrorMessage] = useState("")
  const model = {
    username: undefined ,
    password: undefined
  }
    const inputs = [
      {
        id: 1,
        name: "username",
        type: "text",
        placeholder: "Username",
        errorMessage:
          "Username is required",
        label: "Username",
        required: true,
      },
      {
        id: 2,
        name: "password",
        type: "password",
        placeholder: "Password",
        errorMessage:
          "Passwordrname is required",
        label: "Password",
        required: true,
      },
    ];
   const handleSubmit = (e) =>{
    e.preventDefault();
    }

    const navigate = useNavigate(); 

    const submit = async (e) => {
      try {
        const clientsRequest = axios.get(`http://localhost:2024/Clients/${values.username}`);
        const companyRequest = axios.get(`http://localhost:2024/Company/${values.username}`);
      
        const [clientsRes, companyRes] = await Promise.all([clientsRequest, companyRequest]);
        if (clientsRes.data !== null) {
          model.username = clientsRes.data.username;
          if (values.password === clientsRes.data.mdp) {
            setErrorMessage("connected");
            navigate(`/Dashboard/${clientsRes.data.username}`)
          } else {
            setValues({
              username: model.username,
              password: ""
            });
            setErrorMessage("Password incorrect!");
          }
        } else {
          if (companyRes.data !== null) {
            model.username = companyRes.data.username;
            if (values.password === companyRes.data.mdp) {
              setErrorMessage("connected");
            } else {
              setValues({
                username: model.username,
                password: ""
              });
              setErrorMessage("Password incorrect!");
            }
          } else {
            setValues({
              username: "",
              password: "",
            });
            setErrorMessage("Username doesn't exist!");
          }
        }
      } catch (e) {
        console.log(e);
      }
    }

    const onChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value });
    };
    
  return (
    <div className="app">
    <form onSubmit={handleSubmit} action='GET'>
      <h1>Register</h1>
      {inputs.map((input) => (
        <FormInput
          key={input.id}
          {...input}
          value={values[input.name]}
          onChange={onChange}
        />
      ))}
      <button className='submit-button login' onClick={submit}>Submit</button>
      <div className='submition_error'>{errorMessage}</div>
    </form>
  </div>
  )
}

export default SignInForm