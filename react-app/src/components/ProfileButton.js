import LogoutButton from "./auth/LogoutButton";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, NavLink } from 'react-router-dom'
import './nav.css'
import CurrentUserItems from "./Items/userItems";
import '../index.css'


const ProfileButton = () => {
    const user = useSelector(state => state.session.user)
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    return (
        <>
            <div className='icon-drop-menu' onClick={openMenu}>
                <img id="drop-menu-icon-style" src="https://cdn-icons-png.flaticon.com/512/6522/6522516.png" alt='' />
            </div>
            {showMenu && (
                <div className="text-deco">
                <div className="profile-dropdown">
                <div className="text">Hello {user.username}!</div>
                <div className="buttons">
                <NavLink className='nav' to={`/users/${user.id}/items`}><button classname='button'>My Items</button></NavLink>
                <NavLink to={`/users/${user.id}/reviews`}><button classname='button'>My Reviews</button></NavLink>
                <div className="button"><LogoutButton className='button'/></div>
                </div>
                </div>
                </div>
            )}
        </>
    )

}

export default ProfileButton

