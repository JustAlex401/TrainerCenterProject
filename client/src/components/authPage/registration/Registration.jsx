import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useHttp } from '../../../hooks/http.hook';
import { useMessage } from '../../../hooks/message.hook';
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
        <div class="containerReg">
            <div class="col center-align">
                <div class="card #546e7a blue-grey darken-1">
                    <div class="card-content white-text">
                        <span class="card-title">Registration</span>
                        <div>

                            <div class="input-field">
                                <input class="Inp" placeholder="Email" id="email" type="text" name='email' onChange={changeHandler}/>
                                <label for="email"></label>
                            </div>

                            <div class="input-field">
                                <input class="Inp" placeholder="Login" id="login" type="text" name='login' onChange={changeHandler}/>
                                <label for="login"></label>
                            </div>

                            <div class="input-field">
                                <input class="Inp" placeholder="Password" id="password" type="password" name='password' onChange={changeHandler}/>
                                <label for="password"></label>
                            </div>

                        </div>
                    </div>
                    <div class="card-action">
                        <button class='btn' onClick={registerHandler} disabled={loading}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}