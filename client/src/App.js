import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import 'materialize-css';
import './index.css';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import { useRoutes } from './routes';


function App() {
  
  const {login, logout, token, userId, refreshToken, role, loginU} = useAuth();
  console.log(token);
  let isAuthenticated = !!token || !!refreshToken;
  const routes = useRoutes(isAuthenticated, role);

    return (
      <AuthContext.Provider value={{
        token, userId, refreshToken, login, logout, isAuthenticated, role, loginU
      }}>
        <Router>
          <div>
            {routes}
          </div>  
        </Router>
      </AuthContext.Provider>
    )

  }


export default App;
