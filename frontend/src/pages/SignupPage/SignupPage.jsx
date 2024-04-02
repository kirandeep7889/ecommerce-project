import React, { useState, useReducer } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SignupPage.css'; 
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signUp } from '../../Redux/userSlice';

const initialState = {
  name: '',
  email: '',
  phoneNumber: '',
  password: '',
  isSeller: false 
};

function reducer(state, action) {
  switch (action.type) {
    case 'updateField':
      return { ...state, [action.field]: action.value };
    case 'toggleSeller':
      return { ...state, isSeller: !state.isSeller }; 
    default:
      return state;
  }
}

function SignupPage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  const dispatcher = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'updateField', field: name, value });
  };

  const handleToggle = () => {
    dispatch({ type: 'toggleSeller' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatcher(signUp(state));
      navigate("/");
    } catch (error) {
      console.error("Error occurred during sign up:", error);
      toast.error("Sign up failed. Please try again.");
    }
  };

  return (
    <div className='container'>
      <div className='center'>
        <h1>Signup</h1>
        <form onSubmit={handleSubmit}>
          <div className='txt_field'>
            <input type='text' name='name' placeholder='Enter Name' value={state.name} onChange={handleChange} required />
            <span></span>
          </div>
          <div className='txt_field'>
            <input type='email' name='email' placeholder='Email' value={state.email} onChange={handleChange} required />
            <span></span>
          </div>
          <div className='txt_field'>
            <input type='text' name='phoneNumber' placeholder='Contact' value={state.phoneNumber} onChange={handleChange} required />
            <span></span>
          </div>
          <div className='txt_field'>
            <input type='password' name='password' placeholder='Password' value={state.password} onChange={handleChange} required />
            <span></span>
          </div>
          <div className='toggle'>
            <label className='label'>
              Sign up as a Seller
              <input type='checkbox' checked={state.isSeller} onChange={handleToggle} />
            </label>
          </div>
          <input type='submit' value='Sign Up' />
          <div className='login_link'>
            Already have an account? <Link to='/login'>Login Here</Link>
          </div>
        </form>
      </div>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
}

export default SignupPage;
