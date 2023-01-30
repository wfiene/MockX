import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [submit, setSubmit] = useState(false)
  // const [errors, setErrors] = useState([]);
  const [validationErrors, setValidationErrors] = useState([])
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const errors = []
    if (!email) errors.push('Email required')
    if (!email.split('').includes('@')) errors.push('Valid Email Required')
    if (!username) errors.push('Username required')
    else if (username < 5 || username > 20) errors.push('Username character limit(mix:5, max:20')
    if (!password) errors.push('Password required')
    if (!repeatPassword) errors.push('Please confirm password')
    if (password !== repeatPassword) errors.push('Passwords do not match')
    setValidationErrors(errors)
  }, [email, username, password, repeatPassword])

  const onSignUp = async (e) => {
    e.preventDefault();
    setSubmit(true)
    if (!validationErrors.length) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };


  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='login-signup-form-page'>
      <div className='sign-up-form'>
        <div className='welcome-back-text'>Create an account</div>
            <ul className="sign-up-errors">
              {submit && validationErrors.length > 0 && validationErrors.map(error => (
                <li className="error-messages" key={error}>{error}</li>))}
            </ul>
          <form onSubmit={onSignUp}>
            <div className='input input-margin'>
              <label className='label-name'>User Name</label>
              <input
                type='text'
                name='username'
                onChange={updateUsername}
                value={username}
                className='label sign-up-label'
              ></input>
            </div>
            <div className='input input-margin'>
              <label className='label-name'>Email</label>
              <input
                type='text'
                name='email'
                onChange={updateEmail}
                value={email}
                className='label sign-up-label'
              ></input>
            </div>
            <div className='input input-margin'>
              <label className='label-name'>Password</label>
              <input
                type='password'
                name='password'
                onChange={updatePassword}
                value={password}
                className='label sign-up-label'
              ></input>
            </div>
            <div className='input input-margin'>
              <label className='label-name'>Repeat Password</label>
              <input
                type='password'
                name='repeat_password'
                onChange={updateRepeatPassword}
                value={repeatPassword}
                required={true}
                className='label sign-up-label'
              ></input>
            </div>
            <button className='submit-button' type='submit'>Sign Up</button>
          </form>
          <NavLink to={'/login'}>
          <div className='have-an-account'>Already have an account?</div>
        </NavLink>
        </div>
      </div>
  );
};

export default SignUpForm;
