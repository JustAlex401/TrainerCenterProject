import React from 'react';
import {Switch, Route, Redirect, Router} from 'react-router-dom';
import { Login } from './components/authPage/login/Login';
import { Registration } from './components/authPage/registration/Registration';
import VerEm from './components/authPage/verify/VerifyEmail';
import Header from './components/header/Header';
import AdminProfile from './components/profile/AdminProfile';
import TrainerProfile from './components/profile/TrainerProfile';
import ListOfCalories from './components/profile/userProfile/listOfCalories/ListOfCalories';
import CaloriesForUser from './components/profile/userProfile/caloriesForUser/CaloriesForUser';
import TrainingProgramm from './components/profile/userProfile/trainingProgramm/TrainingProgramm';
import AboutUs from './components/profile/userProfile/aboutUs/AboutUs';
import FirstPage from './components/profile/userProfile/firstPage/FirstPage';
import UserNav from './components/profile/userProfile/userNav/UserNav';

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
                    <UserNav/>
                    <Route exact path='/user-profile/list-of-calories'>
                      <ListOfCalories/>  
                    </Route>
                    <Route exact path='/user-profile/calories-for-you'>
                      <CaloriesForUser/>
                    </Route>
                    <Route exact path='/user-profile/training-programm'>
                      <TrainingProgramm/>
                    </Route>
                    <Route exact path='/user-profile/about-us'>
                      <AboutUs/>
                    </Route>
                    <Route exact path='/user-profile'>
                      <FirstPage/>
                    </Route>
                    <Redirect to="/user-profile"/>
                  </div>
              )}
              {isAuthenticated && role === "admin" && (
                  <div>
                    <Route exact path='/admin-profile' component={AdminProfile}/> 
                    <Redirect to="/admin-profile"/>
                  </div>
              )}
              {isAuthenticated && role === "trainer" && (
                  <div>
                    <Route exact path='/trainer-profile' component={TrainerProfile}/> 
                    <Redirect to="/trainer-profile"/>
                  </div>
              )}
            <Route exact path='/sign-up' component={Registration}/>
            <Route exact path='/sign-in' component={Login}/>
            <Route exact path='/api/auth/activate' component={VerEm}/>
            <Redirect to="/"/>
          </Switch>
        </div>
    )
} 