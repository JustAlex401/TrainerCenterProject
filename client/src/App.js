import React from 'react';
import Header from './components/header/header';
import {Registration} from './components/authPage/registration';
import {Switch, Route, BrowserRouter as Router, Redirect} from 'react-router-dom';
import 'materialize-css';
import './index.css';
import { Login } from './components/authPage/login';
import VerEm from './components/authPage/verify.email';
import Footer from './components/footer/footer';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/authContext';
import { Profile } from './components/profile/profile';
import { useRoutes } from './routes';


function App() {
  
  const {login, logout, token, userId, refreshToken} = useAuth();
  console.log(token)
  let isAuthenticated = !!token || !!refreshToken;
  const routes = useRoutes(isAuthenticated);

    console.log(isAuthenticated)
    return (
      <AuthContext.Provider value={{
                token, userId, refreshToken, login, logout, isAuthenticated
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
