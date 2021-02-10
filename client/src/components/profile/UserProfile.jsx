import React from 'react';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Cookies from 'js-cookie';
import { useHttp } from '../../hooks/http.hook';
import { useMessage } from '../../hooks/message.hook';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const UserProfile = () => {

    const history = useHistory();
    const auth = useContext(AuthContext);
    const {request, error, clearError} = useHttp();
    const message = useMessage(); 
    const login = useSelector((state) => {
      return state.user.data.login;
    })

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
        
      }catch (err){
        message(err.message);
      }

      auth.logout();

      history.push('/');
    }

    return ( 
        <nav>
        
        <div class="nav-wrapper">
          <a href="#" class="brand-logo">{login}</a>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li><a href="/" onClick={logoutHandler}>logout</a></li>
          </ul>
        </div>
      </nav>
    )
}

export default UserProfile;