import React from 'react';
import Header from './components/header/Header';
import {Registration} from './components/authPage/Registration';
import {Switch, Route, BrowserRouter as Router, Redirect} from 'react-router-dom';
import 'materialize-css';
import './index.css';
import { Login } from './components/authPage/login/Login';
import VerEm from './components/authPage/VerifyEmail';
// import Footer from './components/footer/Footer';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import { Profile } from './components/profile/UserProfile';
import { useRoutes } from './routes';


function App() {
  
  const {login, logout, token, userId, refreshToken, role, loginU} = useAuth();
  console.log(token)
  debugger;
  let isAuthenticated = !!token || !!refreshToken;
  const routes = useRoutes(isAuthenticated, role);

    // console.log(isAuthenticated)
    return (
      <AuthContext.Provider value={{
                token, userId, refreshToken, login, logout, isAuthenticated, role, loginU
      }}>
        <Router>
          <div className="AAA">
            {routes}
          </div>  
        </Router>
      </AuthContext.Provider>
    )



  //   return (
  //       <AuthContext.Provider value={{
  //         token, userId, refreshToken, login, logout, isAuthenticated
  //       }}>
  //         <div className="app">
  //           {/* <Header/> */}
  //           <Switch>

  //             <Route exact path='/profile' component={Profile}/>
              
  //             {/* <Route exact path='/sign up' component={Registration}/>
  //             <Route exact path='/sign in' component={Login}/>
  //             <Route exact path='/api/auth/activate' component={VerEm}/> */}
  //             {/* <Footer/> */}
  //             <Redirect to="/"/>
  //           </Switch>
  //         </div>
  //       </AuthContext.Provider>
      
  //   );
  // }
  // console.log("AAA")
  // return (
  //       <div className="app">
  //         <Header/>
  //         <Switch>
  //           <Route exact path='/sign up' component={Registration}/>
  //           <Route exact path='/sign in' component={Login}/>
  //           <Route exact path='/api/auth/activate' component={VerEm}/>
  //           <Redirect to="/"/>
  //         </Switch>
  //       </div>
  // );
  }


export default App;
