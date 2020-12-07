import { useEffect } from 'react';
import {useState, useCallback} from 'react';
import Cookies from 'js-cookie';

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [refreshToken, setRefresh] = useState(null);
    const [userId , setUserId] = useState(null);
    // const [cookies, setCookie] = useCookies(["token"]);

    const login = useCallback((jwtToken, refreshToken, id)=>{
        setToken(jwtToken);
        setUserId(id);
        setRefresh(refreshToken);
        console.log(jwtToken+ "   "+refreshToken+ "   "+ id);

        Cookies.set("token", jwtToken);
        Cookies.set("refreshToken", refreshToken);
        Cookies.set("id", id);

    }, []);

    const logout = useCallback(() => {

        setToken(null);
        setUserId(null);
        setRefresh(null);

        Cookies.remove('token');
        Cookies.remove('refreshToken');
        Cookies.remove('id');

    }, []);

    useEffect(() => {
        const data = {
            token : Cookies.get('token'),
            refreshToken : Cookies.get('refreshToken'),
            id : Cookies.get('id'),
        }
        console.log(data);
        if (data && data.token && data.refreshToken){
            login(data.token, data.refreshToken, data.id);
        }
    },[login]);

    return {login, logout, token, userId, refreshToken}
}