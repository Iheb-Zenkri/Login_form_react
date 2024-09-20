import React, {useState} from 'react'
import { FormInput } from './FormInput'
import UploadFile  from './UploadFile'
import './Login.css'
import axios from "axios"

const Page1 = ({ formData, setFormData, setPage , image1 , image2 , setImage1 , setImage2 }) => {

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
      console.log(formData)
      setPage(2);

    }  
  };
 
  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Enter your Company Name",
      errorMessage:
        "Your Name should be 3-16 letters ",
      label: "Name",
      pattern: "(^$)|(^[A-Za-z]{3,16}$)",
      required: true,
    },
    {
      id: 2,
      name: "Adresse",
      type: "text",
      placeholder: "Enter your Adresse",
      errorMessage:
        "Your Adresse should be 3-30 letters it may include commas ' , ' and white spaces",
      label: "Adresse",
      pattern: "(^$)|(^[A-Za-z ,]{3,30}$)",
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
  ];

  
  return (
    <div className="app ">
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
        <div className='files'>
          <UploadFile name ='logo' label='Icon' image={image1} setImage={setImage1} />
          <UploadFile name = 'details' label='Files' image={image2} setImage={setImage2}/>
        </div>
        </form>
    </div>
    
  );
};

const Page2 = ({ formData, setFormData, setPage , image1 , image2 }) => {
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
      const request = new FormData()
      request.append('username',formData.username)
      request.append('email',formData.email)
      request.append('mdp',formData.mdp)
      request.append('name',formData.name)
      if(formData.phoneNumber) request.append('phoneNumber',formData.phoneNumber)
      if(formData.Adresse) request.append('Adresse',formData.Adresse)
      if(image1) request.append('logo',image1)
      if(image2) request.append('details',image2)

      try{
        await axios.post("http://localhost:2024/Company",request,{
          headers: {
            "Content-Type": "multipart/form-data",
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
    <form encType="multipart/form-data" onSubmit={handleSubmit} action='POST'>
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
function SignUpFormCompany() {
  const [values, setValues] = useState({
    name: "",
    Adresse: "",
    phoneNumber: "" ,
    username: "",
    email: "",
    mdp: "",
    conmdp:"",
  });
  const [image1, setImage1] = useState(null)
  const [image2, setImage2] = useState(null)

  const [currentPage, setPage] = useState(1);
return (
<div className='app' >
  {currentPage === 1 && (
  <Page1  className="Page1" 
          formData={values} 
          setFormData={setValues} 
          setPage={setPage}
          image1={image1} 
          setImage1={setImage1}
          image2={image2} 
          setImage2={setImage2}
  />
  )}

  {currentPage === 2 && (
  <Page2 className="Page2" 
        formData={values} 
        setFormData={setValues} 
        setPage={setPage}
        image1={image1} 
        image2={image2} 
        />
  )}
</div>
)
}

export default SignUpFormCompany