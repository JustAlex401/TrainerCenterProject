import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { useHttp } from '../../../hooks/http.hook';
import { useMessage } from '../../../hooks/message.hook';
import { useDispatch, useSelector } from "react-redux";
import { setUserProfile } from './actions';


export const Login = () => {

    const auth = useContext(AuthContext);
    const dispatch = useDispatch();
    const message = useMessage(); 
    const {loading, request, error, clearError} = useHttp();
    const profile = useSelector((state) => state.user.data);

    const [form, setForm] = useState({
        login: '',
        password: '',
    })

    useEffect(()=>{
        message(error);
        clearError();
    }, [error, message, clearError]);

    const changeHandler = event => {
        setForm({...form,[event.target.name]: event.target.value})
    }

    useEffect(() => {
        auth.login(profile.token, profile.refresh_token, profile.userId, profile.role, profile.login);
    }, [profile])

    const loginHandler = async () => {
        dispatch(setUserProfile({...form}));
    }

    return (
        <div className="row" >
        <div className="col s6 offset-s3">
            <div className="card #546e7a blue-grey darken-1">
                <div className="card-content white-text">
                    <span className="card-title">Login</span>
                    <div>

                        <div className="input-field">
                            <input className="Inp" placeholder="Login" id="login" type="text" name='login' onChange={changeHandler}/>
                            <label for="login"></label>
                        </div>

                        <div className="input-field">
                            <input className="Inp" placeholder="Password" id="password" type="password" name='password' onChange={changeHandler}/>
                            <label for="password"></label>
                        </div>

                    </div>
                </div>
                <div className="card-action">
                    <button className='btn' onClick={loginHandler} disabled={loading}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
      </div>
    
    )
}
