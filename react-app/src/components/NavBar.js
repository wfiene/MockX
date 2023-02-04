
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from './auth/LogoutButton';
import ProfileButton from './ProfileButton';
import CurrentUserItems from './Items/userItems';
import CreateItemModal from './CreateItem/ItemModal';
import './nav.css'

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user)

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className='user-links'>
        <CreateItemModal />
        <ProfileButton />
      </div>
    );
  } else {
    sessionLinks = (
      <div className='login-sign-up-row'>
        <div><NavLink className='login' to='/login'>Login</NavLink></div>
        <div><NavLink className='signup' to='/sign-up'>Sign Up</NavLink></div>
      </div>
    );
  }



  return (
    <div className='nav-frame'>
      <div>
        <NavLink exact to="/"><img src="/mockx-logo.png"
          alt="logo" style={{ margin: '0px', padding: '0px', height: '50px', width: '100px', marginBottom: '10px' }} /></NavLink>
      </div>
        <div>
          {sessionLinks}
        </div>

    </div>
  );
}

export default NavBar;
