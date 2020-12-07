import { useHistory } from 'react-router-dom';
import { useHttp } from '../../hooks/http.hook';
import { useMessage } from '../../hooks/message.hook';
import React, {useEffect} from 'react';

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
            history.push('/');
        } catch (e) {
            console.log(e);
        }
    }
    
    return (
        <div className="row" >
        <div className="col s2 offset-s3 ">
            <div className="card #e53935 red darken-1">
                <div className="card-content white-text">
                    <h5>Verify email</h5>
                </div>
                <div className="card-action">
                    <button className='btn' onClick={enterHandler} disabled={loading}>
                        Submit
                        <i class="material-icons right">send</i>
                    </button>
                </div>
            </div>
        </div>
      </div>
    
    )
}


export default VerEm;

