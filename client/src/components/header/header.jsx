import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import { getTrainerList } from '../trainerList/actions';
import TrainerList from '../trainerList/TrainerList';
import './header.css';

const Header = () =>{
  const [list, setList] = useState(true);
  const trainerList = useSelector((state) => state.trainerList.data);
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log("AAAA")
    // setList(true)
    dispatch(getTrainerList());
    // fetchData();
  }, []);

    return (
      <div className="root">
        <div className="row">
          <nav className="header">
            <div className="nav-wrapper">
              <a href="/" className="brand-logo">Fitness</a>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><Link to='/signUp' onClick={() => setList(false)} className="headerText">sign up</Link></li>
                <li><Link to='/signIn' onClick={() => setList(false)} className="headerText">sign in</Link></li>
              </ul>
            </div>
          </nav>
          
        </div>  

        {list && 
          <div class="col">
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