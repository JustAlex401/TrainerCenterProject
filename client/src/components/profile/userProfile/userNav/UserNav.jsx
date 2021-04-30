import React, { useState } from 'react';
import { useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthContext';
import Cookies from 'js-cookie';
import { useHttp } from '../../../../hooks/http.hook';
import { useMessage } from '../../../../hooks/messages/message.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserProfileRedux } from '../../../authPage/login/actions';
import './userNav.css';
import M from 'materialize-css';

const UserNav = () => {

  const history = useHistory();
  const auth = useContext(AuthContext);
  const {request, error, clearError} = useHttp();
  const message = useMessage(); 
  const dispatch = useDispatch();
  const [menuItem, setMenuItem] = useState();
  const login = useSelector((state) => {
    return state.user.data.login;
  })

  useEffect(()=>{
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    dispatch(setUserProfileRedux({
      userId: parseInt(auth.userId),
      token: auth.token,
      refreshToken: auth.refreshToken,
      role: auth.role,
      login: auth.loginU,
    }))
  }, []);

  useEffect(() => {
    const slide_menu = document.querySelectorAll(".sidenav");
    M.Sidenav.init(slide_menu);
  }, [])

  const logoutHandler = async (event) => {
    event.preventDefault();

    history.push('/');
    try{
      await request('api/auth/logout', 'POST', {userId: Cookies.get('id')}).then(data => {
        console.log(data.message);
        message(data.message);
      });

      history.push('/');
      
    }catch (err){
      message(err.message);
    }

    auth.logout();
  }

  const getMenu = () => {
    return (
      <ul id="slide-out" className="sidenav sidenav-close">
        <div style={{marginBottom: '50px'}}>
          <h4 className="menuStyle">Menu</h4>
          <li><div className="divider"></div></li>
        </div>
          <li><Link to={`${window.location.pathname}/list-of-calories`} className='aText'>List of calories</Link></li> 
          <li><Link to={`${window.location.pathname}/calories-for-you`} className='aText'>Calories for you</Link></li> 
          <li><Link to={`${window.location.pathname}/training-programm`} className='aText'>Training programm</Link></li> 
      </ul>
    )
  }

  return ( 
    <div>
      <nav> 
        <div className="nav-wrapper" style={{marginLeft: '40px'}}>
          <a href="/user-profile" className="brand-logo">{login}</a>
          <a href="/user-profile" data-target="slide-out" className="sidenav-trigger show-on-large"><i className="material-icons">menu</i></a> 
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><Link to={`${window.location.pathname}/about-us`} className="logoutUserProfile">about us</Link></li> 
            <li><a href="/user-profile" onClick={logoutHandler} className="logoutUserProfile">logout</a></li>
          </ul>
        </div>
      </nav>
      {getMenu()}
    </div>
  )
}

export default UserNav;