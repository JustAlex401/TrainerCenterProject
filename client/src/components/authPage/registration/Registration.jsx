import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useHttp } from '../../../hooks/http.hook';
import { useMessage } from '../../../hooks/messages/message.hook';
import Footer from '../../footer/Footer';
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
        }catch(e){
            console.log(e);
        }
        history.push('/');
    }

    return (
      <div className="containerReg">
        <div className="col center-align" style={{width: '500px', marginLeft: 'auto', marginRight: 'auto'}}>
          <div className="card #546e7a blue-grey darken-1 registration">
            <div className="card-content white-text">
              <span className="card-title">Registration</span>
              <div>

                <div className="input-field">
                    <input className="Inp validate" placeholder="Email" id="email" type="email" name='email' onChange={changeHandler} /*autoComplete='off'*//>
                    <span className="helper-text" data-error="wrong" data-success="right">Helper text</span>
                </div>

                <div className="input-field loginContainer">
                    <input className="Inp" placeholder="Login" id="login" type="text" name='login' onChange={changeHandler} autoComplete='off'/>
                </div>

                <div className="input-field">
                    <input className="Inp" placeholder="Password" id="password" type="password" name='password' onChange={changeHandler} autoComplete='off'/>
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
        <div className='col'  style={{position: 'fixed', bottom: 0, width: '100%'}}>
          <Footer/>
        </div>
      </div>
    )
}