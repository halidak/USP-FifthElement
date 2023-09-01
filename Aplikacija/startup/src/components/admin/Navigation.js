import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';


const Navigation = () => {
    const history = useNavigate();
   const logOut = () => {
    localStorage.clear();
    history('/');
   }
    return (
        <div className="topnav">
            <a  href="/">Home</a>
            <div class="topnav-right">
                <a href="">Admin Page</a>
                <a href='/'>
                    <Button onClick={logOut}>Log Out</Button>
                </a>
            </div>
        </div>
    );
};

export default Navigation;
