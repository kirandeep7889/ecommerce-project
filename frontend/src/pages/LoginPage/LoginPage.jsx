import React, { useReducer } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import "./LoginPage.css"
import { useDispatch } from 'react-redux';
import { login } from '../../Redux/userSlice';

const initialState = {
  email: '',
  password: ''
};

function reducer(state, action) {
  switch (action.type) {
    case 'updateField':
      return { ...state, [action.field]: action.value };
    default:
      return state;
  }
}

function LoginPage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate=useNavigate();
  const dispatcher=useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'updateField', field: name, value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     dispatcher(login(state));
      navigate("/");
    } catch (error) {
      console.error("Error occurred during sign up:", error);
      toast.error("login failed. Please try again.");
    }
  };

  return (
    <div className='container'>
      <div className='center'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className='txt_field'>
            <input type='email' name='email' placeholder='Email' value={state.email} onChange={handleChange} required />
            <span></span>
          </div>
          <div className='txt_field'>
            <input type='password' name='password' placeholder='Password' value={state.password} onChange={handleChange} required />
            <span></span>
          </div>
          <input type='submit' value='Login' />
          <div className='login_link'>
            New User? <Link to='/Signup'>Signup Here</Link>
          </div>

        </form>
      </div>
    </div>
  );
}



export default LoginPage;