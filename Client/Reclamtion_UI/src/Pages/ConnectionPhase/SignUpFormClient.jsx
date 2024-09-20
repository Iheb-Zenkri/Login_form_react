import React, {useState, useEffect} from 'react'
import { FormInput } from './FormInput'
import './Login.css'
import axios from "axios"

const Page1 = ({ formData, setFormData, setPage }) => {

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    inputs.forEach((input) => {
      if(input.name in formData){
        if (input.required && !formData[input.name]) {
          newErrors[input.name] = "This field is required.";
        } else if (input.pattern && !RegExp(input.pattern).test(formData[input.name])) {
          newErrors[input.name] = input.errorMessage;
        } else {
          newErrors[input.name] = ""; 
        }
      }
    });

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const nextPage = () => {

    const isValid = validateForm();
    if (isValid) {
      setPage(2);
    }  
  };

  const inputs = [
    {
      id: 1,
      name: "firstName",
      type: "text",
      placeholder: "Enter your Name",
      errorMessage:
        "Your Name should be 3-16 letters ",
      label: "First Name",
      pattern: "(^$)|(^[A-Za-z]{3,16}$)",
      required: true,
    },
    {
      id: 2,
      name: "lastName",
      type: "text",
      placeholder: "Enter your last Name",
      errorMessage:
        "Your last Name should be 3-16 letters ",
      label: "Last Name",
      pattern: "(^$)|(^[A-Za-z]{3,16}$)",
      required: false,
    },
    {
      id: 3,
      name: "phoneNumber",
      type: "tel",
      placeholder: "Enter your phone number",
      errorMessage:
        "Your Phone Number should be a number of 8 digits ",
      label: "Phone Number",
      pattern: "(^$)|^[0-9]{8}$",
      required: false,
    },
    {
      id: 4,
      name: "birthday",
      type: "date",
      placeholder: "Enter your Birthday",
      label: "Birthday",
      required: false,
    }
    
  ];
  return (
    <div className="app">
      <form >
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={formData[input.name] ?? ""}
            onChange={onChange}
          />
        ))}
        <button className="switch-button" onClick={nextPage}></button>
      </form>
    </div>
  );
};

const Page2 = ({ formData, setFormData, setPage }) => {
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  const validateForm = () => {
    const newErrors = {};
    inputs.forEach((input) => {
      if (input.required && !formData[input.name]) {
        newErrors[input.name] = "This field is required.";
      } else if (input.pattern && !RegExp(input.pattern).test(formData[input.name])) {
        newErrors[input.name] = input.errorMessage;
      } else {
        newErrors[input.name] = ""; 
      }
    });

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => !error);
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); 
  };

  const previousPage = () => {
    setPage(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const  submit = async (e) => {
    const isValid = validateForm();
    if (isValid) {
      const filteredValues = Object.fromEntries(
        Object.entries(formData).filter(([key, value]) => (value !== "" && key !== "conmdp" ))
      );
      const request = JSON.stringify(filteredValues)
      try{
        await axios.post("http://localhost:2024/Clients",request,{
          headers: {
            "Content-Type": "application/json",
          },
        }).then(res => {
          if(res.data === "Username is already in use"){
            setSubmitError(res.data)
          }
          else{
            setSubmitError("")
            console.log(res.data)
          }
        })
      }
      catch(e){
        console.log(e);
      }
    }
  }
  const inputs = [
    {
      id: 5,
      name: "username",
      type: "text",
      placeholder: "Enter your Username",
      errorMessage:
        "Your Username should be 3-16 letters ",
      label: "Username",
      pattern: "^[A-Za-z]{3,16}$",
      required: true,
    },
    {
      id: 6,
      name: "email",
      type: "email",
      placeholder: "Enter your Email",
      errorMessage:
        "Your Email is invalide ",
      label: "Email ",
      required: true,
    },
    {
      id: 7,
      name: "mdp",
      type: "password",
      placeholder: "Enter your Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 8,
      name: "conmdp",
      type: "password",
      placeholder: "Confirm your Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern : formData.mdp ,
      required: true,
    }
  ];

  return (
    <div className="app">
    <form onSubmit={handleSubmit} action='POST'>
      {inputs.map((input) => (
        <FormInput
          key={input.id}
          {...input}
          value={formData[input.name]}
          onChange={onChange}
        />
        
      ))}
      <button className="switch-button-previous" onClick={previousPage}></button>
      <button className="submit-button" onClick={submit}>Submit</button>
      <div className='submition_error'>{submitError}</div>
    </form>
  </div>
);
      }

function SignUpFormClient() {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "" ,
    birthday:"",
    username: "",
    email: "",
    mdp: "",
    conmdp:"",
  });
  

  const [currentPage, setPage] = useState(1);
return (
<div className='app' >
  {currentPage === 1 && (
  <Page1 className="Page1" formData={values} setFormData={setValues} setPage={setPage}/>
  )}
  {currentPage === 2 && (
  <Page2  className="Page2" formData={values} setFormData={setValues} setPage={setPage} />
  )}
</div>
)
}

export default SignUpFormClient