import React from 'react';
import { useEffect } from 'react';
import { useHttp } from '../../hooks/http.hook';

const Trainer = () => {

    const {loading, request, error, clearError} = useHttp();

    // useEffect(() => {

    //     fetchData;
    // }, [request]);

    const fetchData = async () => {
        try{
             console.log("AAA");
            const data = await request('/api/trainer/trainerList', 'GET');
        } catch (err) {
                console.log(err);
        }
       
    }

    // const enterHandler = async () => {
    //     try{
    //         const data = await request(`/api/auth/activate?login=${login}`, 'GET');
    //         console.log(data);
    //         message(data.message);
    //         history.push('/');
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    return (
        <div>
                 <p>AAAA</p>
                <button onClick={fetchData} disabled={loading}>AAA</button>
        </div>
      
    );
}

export default Trainer;

