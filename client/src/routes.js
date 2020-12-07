import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import { Login } from './components/authPage/login';
import { Registration } from './components/authPage/registration';
import VerEm from './components/authPage/verify.email';
import Header from './components/header/header';
import Profile from './components/profile/profile';
import Trainer from './components/trainerList/trainer.list';

export const useRoutes = isAuthenticated => {
    if(isAuthenticated){
        return (

            // <div className="Authenticated">
            //     <Profile/>
            //     <Switch>
            //         <Route exact path='/profile/logout' component={LogOut}/>
            //         <Redirect to="/profile"/>
            //     </Switch>
            // </div>



            <Switch>
                <Route exact path="/profile">
                     <Profile/>
                </Route>
                <Redirect to="/profile"/>
            </Switch>
        )
    }

    return (
        <div className="NotAuthenticated">
          <Header/>
          {/* <Trainer/> */}
          <Switch>
            <Route exact path='/signUp' component={Registration}/>
            <Route exact path='/signIn' component={Login}/>
            <Route exact path='/api/auth/activate' component={VerEm}/>
            <Redirect to="/"/>
          </Switch>
        </div>
    )
} 