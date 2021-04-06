import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useHttp } from '../../../hooks/http.hook';
import { useMessage } from '../../../hooks/messages/message.hook';
import './registration.css';


export const Registration = () => {

    let history = useHistory();
    const message = useMessage(); 
    const {loading, request, error, clearError} = useHttp();

    const [form, setForm] = useState({
        email: '',
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

    const registerHandler = async () => {
        try{
            const data= await request('/api/auth/registration', 'POST', {...form});
            message(data.message + ". You should verify email!");
            history.push('/');
        }catch(e){
            console.log(e);
        }
    }

    return (
        <div className="containerReg">
            <div className="col center-align">
                <div className="card #546e7a blue-grey darken-1 registration">
                    <div className="card-content white-text">
                        <span className="card-title">Registration</span>
                        <div>

                            <div className="input-field">
                                <input className="Inp" placeholder="Email" id="email" type="text" name='email' onChange={changeHandler} autoComplete='off'/>
                                <label for="email"></label>
                            </div>

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
                        <button className='btn' onClick={registerHandler} disabled={loading}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}