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
    let history = useHistory();
    const message = useMessage(); 
    const {loading, request, error, clearError} = useHttp();

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

    const loginHandler = async () => {
        try{
            const data= await request('/api/auth/login', 'POST', {...form});
            message("Login is successful!");
            console.log(data);
            
            auth.login(data.token, data.refresh_token, data.userId, data.role, data.login);
            
            // if(data.role === "user"){
                // history.push('');
            // }
            // history.push('/userProfile');

            dispatch(setUserProfile(data))
        }catch(e){
            console.log("error")
            console.log(e.message);
        }
    }

    return (
        <div className="row" >
        <div className="col s6 offset-s3 ">
            <div className="card #4527a0 deep-purple darken-3">
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
