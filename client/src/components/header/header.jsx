import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useLocation} from 'react-router-dom';
import { getTrainerList } from '../trainerList/actions';
import TrainerList from '../trainerList/TrainerList';
import './header.css';

const Header = () =>{
  const [list, setList] = useState(false);
  const trainerList = useSelector((state) => state.trainerList.data);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname)
    if(location.pathname === '/'){
      setList(true);
    }
    dispatch(getTrainerList());
  }, []);

    return (
      <div className="root">
        <div className="row">
          <nav className="header">
            <div className="nav-wrapper">
              <a href="/" className="brand-logo">Fitness</a>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><Link to='/sign-up' onClick={() => setList(false)} className="headerText">sign up</Link></li>
                <li><Link to='/sign-in' onClick={() => setList(false)} className="headerText">sign in</Link></li>
              </ul>
            </div>
          </nav>
          
        </div>  

        {list && 
          <div className="colTrainerList">
            {
              trainerList.map((trainer, i) => {
                return (
                  <TrainerList 
                    trainer={trainer}
                    key={i}
                    index={i}
                  />
                )
              })
            }
            
          </div>
        } 
          
      </div>
        
    );
}

export default Header;