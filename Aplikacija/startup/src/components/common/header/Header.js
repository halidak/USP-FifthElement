import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../assets/Startup.png';
import {nav} from '../../data/Data';
import './Header.css';
import AuthContext from '../../../context/AuthProvider';

const Header = (props) => {
    const [navList, setNavList] = useState(false);
    const [isUserLogged, setIsUserLogged] = useState(false);
    const [isCompanyLogged, setIsCompanyLogged] = useState(false);
    const [menu, setMenu] = useState(false);
    const history = useNavigate();
    const [admin, setAdmin] = useState(false);
    
    
    const { auth, setAuth } = useContext(AuthContext);
    
    const user = JSON.parse(localStorage.getItem('user'));
    const company = JSON.parse(localStorage.getItem('company'));

    const showChat = () => {
        props.setOpen(true);
    }

    function toggleMenu(){
        setMenu(!menu);
    }

    function logOut(){
        localStorage.clear();
        setAuth(null);
        setIsUserLogged(false);
        setIsCompanyLogged(false);
        props.setShowChat(false);
    }
    
    useEffect(() => {
        if (user) {
            setIsUserLogged(true);
        }
        if(company){
            setIsCompanyLogged(true);
        }
    }, [auth, user, company])

    
  return (
    <>
      <header>
        <div className='container flex' style={{maxWidth: '80%'}}>
            <Link to='/'>
                <div className='logo'>
                    <img src={logo} className='img'/>
                </div>
            </Link>
            <div className={!isUserLogged ? 'nav' : 'navL'}>
                <ul className={navList ? 'small' : 'flex'}>
                    {nav.map((list, index) =>(
                        <li key={index}>
                            <Link to={list.path}>{list.text}</Link>
                        </li>
                    ))}
                </ul>
            </div>
           {!isUserLogged && !isCompanyLogged && <div className='button-flex'>
            <Link to='/signup-companies'>
                <button className='btn1'>
                    Za kompanije
                </button>               
            </Link>
               <Link to='/login'>
               <button className='btn2'>
                    <i className='fa fa-sign-out'></i>
                    Uloguj se
                </button>
               </Link>
            </div>}
            {(isUserLogged || isCompanyLogged)  &&
            <div className='icon'>
              <i onClick={toggleMenu} className="fa fa-user fa-2x"></i>
            </div>
            }
            <div className='toggle'>
                <button onClick={() => setNavList(!navList)}>
                   {navList ? <i className='fa fa-times'></i> :
                    <i className='fa fa-bars'></i>}
                </button>
            </div>
        </div>
      </header>
      {isUserLogged && 
            <div className={menu ? 'sub-menu-wrap-open-menu' : 'sub-menu-wrap'}>
                <div className='sub-menu'>
                    <div className='user-info'>
                        <img src={user.user.photo} className='user-pic'/>
                        <h3>{user.user.firstName}{" "}{user.user.lastName}</h3>
                    </div>
                    <hr></hr>
                    <Link to={`/edit-user/${user.user.id}`}>
                    <div className='sub-menu-link'>
                        <i className='fa fa-user'></i>
                        <p>Izmeni profil</p>
                        <i className="fa-solid fa-arrow-right"></i>
                    </div>
                </Link>
                <Link to='/prijave'>
                    <div  className='sub-menu-link'>
                    <i className="fa fa-check"></i>
                        <p>Vaše prijave</p>
                        <i className="fa-solid fa-arrow-right"></i>
                    </div>
                </Link>
                <Link to='/favorites'>
                    <div  className='sub-menu-link'>
                    <i className="fa fa-heart"></i>
                        <p>Sačuvani</p>
                        <i className="fa-solid fa-arrow-right"></i>
                    </div>
                </Link>
                <div  className='sub-menu-link' onClick={showChat}>
                    <i className='fa fa-message'></i>
                    <p>Poruke</p>
                    <i className="fa-solid fa-arrow-right"></i>
                </div>
                <a href='/' onClick={logOut} className='sub-menu-link'>
                    <i className='fa fa-sign-out'></i>
                    <p>Log out</p>
                    <i className="fa-solid fa-arrow-right"></i>
                </a>
                </div>
             </div>}
             
             {isCompanyLogged && 
            <div className={menu ? 'sub-menu-wrap-open-menu' : 'sub-menu-wrap'}>
                <div className='sub-menu'>
                    <div className='user-info'>
                        <img src={company.company.photo} className='user-pic'/>
                        <h3>{company.company.companyName}</h3>
                    </div>
                    <hr></hr>
                    <Link to={`/edit-company/${company.company.id}`}>
                <div  className='sub-menu-link'>
                    <i className='fa fa-user'></i>
                    <p>Izmeni profil</p>
                    <i className="fa-solid fa-arrow-right"></i>
                </div>
                </Link>
                <Link to='/add-notice'>
                <div  className='sub-menu-link'>
                    <i className="fa fa-plus"></i>
                    <p>Dodaj oglas</p>
                    <i className="fa-solid fa-arrow-right"></i>
                </div>
                </Link>
                <Link to='/company-notices'>
                <div  className='sub-menu-link'>
                    <i className="fa fa-share"></i>
                    <p>Dodati oglasi</p>
                    <i className="fa-solid fa-arrow-right"></i>
                </div>
                </Link>
                <div  className='sub-menu-link' onClick={showChat}>
                    <i className='fa fa-message'></i>
                    <p>Poruke</p>
                    <i className="fa-solid fa-arrow-right"></i>
                </div>
                <a href='/' onClick={logOut} className='sub-menu-link'>
                    <i className='fa fa-sign-out'></i>
                    <p>Log out</p>
                    <i className="fa-solid fa-arrow-right"></i>
                </a>
                </div>
             </div>}
    </>
  )
}

export default Header
