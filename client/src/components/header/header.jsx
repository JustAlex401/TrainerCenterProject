import React from 'react';
import {Link} from 'react-router-dom';

const Header = () =>{
    return (
        <nav className="header">
        <div className="nav-wrapper #4527a0 deep-purple darken-3">
          <a href="/" className="brand-logo #4527a0 deep-purple darken-3">Fitness</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down #4527a0 deep-purple darken-3">
            <li><Link to='/signUp'>sign up</Link></li>
            <li><Link to='/signIn'>sign in</Link></li>
          </ul>
        </div>
      </nav>
    );
}

export default Header;