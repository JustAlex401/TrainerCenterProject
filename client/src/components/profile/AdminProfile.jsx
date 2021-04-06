import React from 'react';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Cookies from 'js-cookie';
import { useHttp } from '../../hooks/http.hook';
import { useMessage } from '../../hooks/messages/message.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setUserProfileRedux } from '../authPage/login/actions';

const AdminProfile = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const login = useSelector((state) => {
      return state.user.data.login;
    })
    const auth = useContext(AuthContext);
    const {request, error, clearError} = useHttp();
    const message = useMessage(); 

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
        <nav>
        
        <div className="nav-wrapper">
          <a href="#" className="brand-logo">{login}</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><a href="/" onClick={logoutHandler}>logout</a></li>
          </ul>
        </div>
      </nav>
    )
}

export default AdminProfile;