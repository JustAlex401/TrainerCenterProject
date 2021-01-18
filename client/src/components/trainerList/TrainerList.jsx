import React from 'react';
import { useEffect } from 'react';
import { useHttp } from '../../hooks/http.hook';

const Trainer = () => {

    const {loading, request, error, clearError} = useHttp();

    useEffect(() => {

        fetchData;
    }, [request]);

    const fetchData = async () => {
        try{
             console.log("AAA");
            const data = await request('/api/trainer/trainerList', 'GET');
            console.log(data)
        } catch (err) {
                console.log(err);
        }
       
    }

    return (
        <div>
                 <p>AAAA</p>
                {/* <button onClick={fetchData} disabled={loading}>AAA</button> */}
        </div>
      
    );
}

export default Trainer;

