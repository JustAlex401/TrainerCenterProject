import { useHistory } from 'react-router-dom';
import { useHttp } from '../../../hooks/http.hook';
import { useMessage } from '../../../hooks/messages/message.hook';
import React, {useEffect} from 'react';
import './verifyEmail.css';
import Footer from '../../footer/Footer';

const VerEm = (props) => {

    let history = useHistory();
    const message = useMessage(); 
    const {loading, request, error, clearError} = useHttp();

    const login = props.location.search.split('login=')[1];

    useEffect(()=>{
        message(error);
        clearError();
    }, [error, message, clearError]);

    const enterHandler = async () => {
        try{
            const data = await request(`/api/auth/activate?login=${login}`, 'GET');
            console.log(data);
            message(data.message);
        } catch (e) {
            console.log(e);
        }
        history.push('/');
    }
    
    return (
        <div className="rootVer">
            <div className="col containerVerify">
                <div className="card #9e9e9e grey verify" >
                    <div className="card-content white-text center-align">
                        <h5>Verify email</h5>
                    </div>
                    <div className="card-action center-align button">
                        <button className='btn' onClick={enterHandler} disabled={loading}>
                            Submit
                            <i className="material-icons right verifyIcon">send</i>
                        </button>
                    </div>
                </div>
            </div>
            <div className="col" style={{position: 'fixed', bottom: 0, width: '100%'}}>
              <Footer/>
            </div>
            
        </div>
        
    
    )
}


export default VerEm;

