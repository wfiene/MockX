import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='login-signup-form-page'>
      <div className='login-from-and-qr-code'>
        <div className='login-form-container'>
          <form onSubmit={onLogin}>
            <div className='welcome-back'>
            <div className='welcome-back-text'>Welcome back!</div>
            
            </div>
            <div>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <div className='input'>
              <label className='label-name' htmlFor='email'>EMAIL</label>
              <input
                name='email'
                type='text'
                placeholder='Email'
                value={email}
                onChange={updateEmail}
                className='label'
              />
            </div>
            <div className='input'>
              <label className='label-name' htmlFor='password'>PATHWORD</label>
              <input
                name='password'
                type='password'
                placeholder='Password'
                value={password}
                onChange={updatePassword}
                className='label'
              />
              <button type='submit' className='submit-button'>Login</button>
            </div>
            <div className='user-buttons'>
              <button className='submit-button' id='left' onClick={() => {
                setEmail('demo@aa.io')
                setPassword('password')
              }}>Demo User</button>
            </div>
          </form>
          <div className='register'>
            <div className='register-text'>
              Need an Account?
            </div>
            <NavLink to='/sign-up'>
              <div className='register-text'>
                Sign Up
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
