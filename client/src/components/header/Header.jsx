import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useLocation} from 'react-router-dom';
import { getTrainerList } from '../trainerList/actions';
import TrainerList from '../trainerList/TrainerList';
import './header.css';
import Footer from '../footer/Footer';

const Header = () =>{
  const [firstPageContent, setFirstPageContent] = useState(false);
  const trainerList = useSelector((state) => state.trainerList.data);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname)
    if(location.pathname === '/'){
      setFirstPageContent(true);
    }
    dispatch(getTrainerList());
  }, [location]);

  return (
    <div className="root">
      <div className="row">
        <nav className="header">
          <div className="nav-wrapper">
            <a href="/" className="brand-logo logoStyle">Fitness</a>
            <ul id="nav-mobile" className="right">
              <li><Link to='/sign-up' onClick={() => setFirstPageContent(false)} className="headerText">sign up</Link></li>
              <li><Link to='/sign-in' onClick={() => setFirstPageContent(false)} className="headerText">sign in</Link></li>
            </ul>
          </div>
        </nav>
      </div>  
      {firstPageContent && 
        <div className="colContent col">
          {
            trainerList.map((trainer, i) => {
              return (
                <TrainerList 
                  trainer={trainer}
                  key={i}
                  index={i}
                />
              )})
          }
          <div className='col'>
            <Footer/>
          </div>
        </div>
      }
    </div>
  );
}

export default Header;
