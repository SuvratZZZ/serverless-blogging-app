import React from 'react';
import { useNavigate } from 'react-router-dom';

function Nav() {
    const nav = useNavigate();
    const handlelogout = ()=>{
        localStorage.removeItem('auth_token');
        localStorage.removeItem('author');
        localStorage.removeItem('author_id');
        nav('/signin');
    }
    return (
        <div className='font-bold fixed top-0 w-full flex justify-center bg-white border-black'>
            <ul>
                <li onClick={handlelogout}>log out</li>
            </ul>
        </div>
    );
}

export default Nav;