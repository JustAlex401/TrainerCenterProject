import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { useHttp } from '../../../hooks/http.hook';
import { useMessage } from '../../../hooks/message.hook';
import { useDispatch, useSelector } from "react-redux";
import { setUserProfile } from './actions';
import './login.css';

export const Login = () => {

    const auth = useContext(AuthContext);
    const [messageError, setMessageError] = useState(null);
    const dispatch = useDispatch();
    const message = useMessage(); 
    const {loading, request, error, clearError} = useHttp();
    const profile = useSelector((state) => state.user);

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
        if(!profile.error){
            auth.login(profile.data.token, profile.data.refresh_token, profile.data.userId, profile.data.role, profile.data.login);
        } else {
            setMessageError("Bad request")
        }
    }, [profile])

    useEffect(() => {
        if(profile.error){
            setMessageError("Bad request")
        }
    }, [profile])

    useEffect(() => {
        message(messageError);
    }, [messageError])

    const loginHandler = async () => {
        setMessageError(null);
        dispatch(setUserProfile({...form}));
    }

    return (
        <div class="containerReg">
            <div className="col center-align">
                <div className="card #546e7a blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Login</span>
                        <div>

                            <div className="input-field">
                                <input className="Inp" placeholder="Login" id="login" type="text" name='login' onChange={changeHandler} autoComplete='off'/>
                                <label for="login"></label>
                            </div>

                            <div className="input-field">
                                <input className="Inp" placeholder="Password" id="password" type="password" name='password' onChange={changeHandler} autoComplete='off'/>
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
