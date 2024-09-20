import React, { useState } from 'react'
import './Login.css'
import { IoMdEye , IoMdEyeOff } from "react-icons/io";

export const FormInput = (props) => {
    const [focused, setFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { label, errorMessage, onChange, type  ,id, ...inputProps } = props;

    const handleFocus = (e) => {
      setFocused(true);
    };

    const handleTogglePassword = () => {
      setShowPassword(!showPassword);
    };
  
    const isInputRequired = inputProps.required;

    return (
      <div className={`formInput ${isInputRequired ? 'required-input' : ''}`}>
        <label>{label}</label>
        <div className='input-container'>
          <input
            {...inputProps}
            type={showPassword ? 'text' : type}
            onChange={onChange}
            onBlur={handleFocus}
            focused={focused.toString()}
          />
          {type === 'password' && (
            <button type="button" className="toggle-password" onClick={handleTogglePassword}>
              {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
            </button>
          )}
         <span>{errorMessage}</span>
        </div>
      </div>
    );
  };
