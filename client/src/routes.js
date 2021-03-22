import React from 'react';
import {Switch, Route, Redirect, Router} from 'react-router-dom';
import { Login } from './components/authPage/login/Login';
import { Registration } from './components/authPage/Registration';
import VerEm from './components/authPage/VerifyEmail';
import Header from './components/header/Header';
import UserProfile from './components/profile/UserProfile';
import AdminProfile from './components/profile/AdminProfile';
import TrainerProfile from './components/profile/TrainerProfile';

export const useRoutes = (isAuthenticated, role) => {

    // console.log(role);
    // console.log(isAuthenticated);

    return (
        <div className="NotAuthenticated">
            {!isAuthenticated && (
                <Header/>
            )}
          <Switch>
              {isAuthenticated && role === "user" && (
                  <div>
                    <Route exact path='/userProfile' component={UserProfile}/> 
                    <Redirect to="/userProfile"/>
                  </div>
              )}
              {isAuthenticated && role === "admin" && (
                  <div>
                    <Route exact path='/adminProfile' component={AdminProfile}/> 
                    <Redirect to="/adminProfile"/>
                  </div>
              )}
              {isAuthenticated && role === "trainer" && (
                  <div>
                    <Route exact path='/trainerProfile' component={TrainerProfile}/> 
                    <Redirect to="/trainerProfile"/>
                  </div>
              )}
            <Route exact path='/signUp' component={Registration}/>
            <Route exact path='/signIn' component={Login}/>
            <Route exact path='/api/auth/activate' component={VerEm}/>
            <Redirect to="/"/>
          </Switch>
        </div>
    )
} 