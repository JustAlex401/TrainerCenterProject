import React, { useState } from 'react';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import Cookies from 'js-cookie';
import { useHttp } from '../../../hooks/http.hook';
import { useMessage } from '../../../hooks/messages/message.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserProfileRedux } from '../../authPage/login/actions';
import './userProfile.css';
import M from 'materialize-css';

const UserProfile = () => {

    const history = useHistory();
    const auth = useContext(AuthContext);
    const {request, error, clearError} = useHttp();
    const message = useMessage(); 
    const dispatch = useDispatch();
    const login = useSelector((state) => {
      return state.user.data.login;
    })
    const slide_menu = document.querySelectorAll(".sidenav");
    M.Sidenav.init(slide_menu, {
      // menuWidth: 300, // Default is 240
      // edge: 'right', // Choose the horizontal origin
      // closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    });


    useEffect(() => {
      dispatch(setUserProfileRedux({
        userId: parseInt(auth.userId),
        token: auth.token,
        refreshToken: auth.refreshToken,
        role: auth.role,
        login: auth.loginU,
      }))
    }, []);

    useEffect(()=>{
      message(error);
      clearError();
    }, [error, message, clearError]);

    const logoutHandler = async (event) => {
      event.preventDefault();

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

      history.push('/');
    }

    return ( 
      <div>
        <nav> 
          <div className="nav-wrapper">
            <a href="#" className="brand-logo">{login}</a>
            <a href="#" data-target="slide-out" className="sidenav-trigger show-on-large"><i className="material-icons">menu</i></a> 
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><a href="/" onClick={logoutHandler} className="logoutUserProfile">logout</a></li>
            </ul>
          </div>
        </nav>

        <ul id="slide-out" className="sidenav">
          <li><a href="#!">First Link With Icon</a></li>
          <li><a href="#!">Second Link</a></li>
          <li><a className="waves-effect" href="#!">Third Link With Waves</a></li>
        </ul>
      </div>
    )
}

export default UserProfile;