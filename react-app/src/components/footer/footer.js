import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './footer.css'

const openInNewTab = url => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

function Footer() {

    return (
        <div className='foot-div'>
            <img className='foot-img' src='https://cdn-icons-png.flaticon.com/512/25/25231.png' onClick={() => openInNewTab('https://github.com/wfiene')}></img>
            <img className='foot-img' src='https://cdn-icons-png.flaticon.com/512/1384/1384014.png' onClick={() => openInNewTab('https://www.linkedin.com/in/walker-fiene-70045523b/')}></img>
        </div>
    )
}

export default Footer