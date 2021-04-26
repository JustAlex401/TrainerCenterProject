import React, { useState } from 'react';
import { useContext } from 'react';
import { Redirect, Route, Switch, useHistory, BrowserRouter as Router, Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import Cookies from 'js-cookie';
import { useHttp } from '../../../hooks/http.hook';
import { useMessage } from '../../../hooks/messages/message.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserProfileRedux } from '../../authPage/login/actions';
import './userProfile.css';
import M from 'materialize-css';
import CaloriesForUser from './pagesForUser/caloriesForUser/CaloriesForUser';
import ListOfCalories from './pagesForUser/listOfCalories/ListOfCalories';
import TrainingProgramm from './pagesForUser/trainingProgramm/TrainingProgramm';

const UserProfile = () => {

    const history = useHistory();
    const auth = useContext(AuthContext);
    const {request, error, clearError} = useHttp();
    const message = useMessage(); 
    const dispatch = useDispatch();
    const [menuItem, setMenuItem] = useState();
    const login = useSelector((state) => {
      return state.user.data.login;
    })

    useEffect(() => {
      const slide_menu = document.querySelectorAll(".sidenav");
      M.Sidenav.init(slide_menu);
    }, [])

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
            <li><div class="divider"></div></li>
          </div>
            <li><Link to={`${window.location.pathname}/calories-for-user`} className='aText'>List of calories</Link></li> 
            {/* <li><Link className='aText' onClick={()=>{setMenuItem(2)}}>Get calories for you</Link></li>
            <li><Link className='aText' onClick={()=>{setMenuItem(3)}}>Create your training programm</Link></li> */}
        </ul>
      )
    }

    return ( 
      <Router>
        <div>
          <nav> 
            <div className="nav-wrapper">
              <a href="/" className="brand-logo">{login}</a>
              <a href="/" data-target="slide-out" className="sidenav-trigger show-on-large"><i className="material-icons">menu</i></a> 
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><a href="/" onClick={logoutHandler} className="logoutUserProfile">logout</a></li>
              </ul>
            </div>
          </nav>

          {getMenu()}

          <Switch>
            <Route path={`${window.location.pathname}/calories-for-user`}>
              <CaloriesForUser></CaloriesForUser>  
            </Route>

          </Switch>
        </div>
     

      </Router>
    )
}

export default UserProfile;