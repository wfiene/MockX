import LogoutButton from "./auth/LogoutButton";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, NavLink } from 'react-router-dom'
import './nav.css'
import CurrentUserItems from "./Items/userItems";


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
            <button className='icon-drop-menu' onClick={openMenu}>
                <img id="drop-menu-icon-style" src="https://cdn-icons-png.flaticon.com/512/6522/6522516.png" alt='' />
            </button>
            {showMenu && (
                <div className="profile-dropdown">
                <div>Hello {user.username}</div>
                <NavLink to={`/users/${user.id}/items`}>User Items</NavLink>
                <div><LogoutButton /></div>
                </div>
            )}
        </>
    )

}

export default ProfileButton

