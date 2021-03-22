import { useEffect } from 'react';
import {useState, useCallback} from 'react';
import Cookies from 'js-cookie';

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [refreshToken, setRefresh] = useState(null);
    const [userId , setUserId] = useState(null);
    const [role, setRole] = useState(null);
    const [loginU, setloginU] = useState(null);

    const login = useCallback((jwtToken, refreshToken, id, role, login)=>{
        
        if(login !== undefined){
            setToken(jwtToken);
            setUserId(id);
            setRefresh(refreshToken);
            setRole(role);
            setloginU(login);
            console.log(jwtToken+ "   "+refreshToken+ "   "+ id);

            Cookies.set("token", jwtToken);
            Cookies.set("refreshToken", refreshToken);
            Cookies.set("id", id);
            Cookies.set("role", role);
            Cookies.set("login", login);
        }

    }, []);

    const logout = useCallback(() => {

        setToken(null);
        setUserId(null);
        setRefresh(null);
        setloginU(null);

        Cookies.remove('token');
        Cookies.remove('refreshToken');
        Cookies.remove('id');
        Cookies.remove('role');
        Cookies.remove('login');

    }, []);

    useEffect(() => {
        const data = {
            token : Cookies.get('token'),
            refreshToken : Cookies.get('refreshToken'),
            id : Cookies.get('id'),
            role : Cookies.get('role'),
            loginU : Cookies.get('login')
        }
        if (data && data.token && data.refreshToken){
            login(data.token, data.refreshToken, data.id, data.role, data.loginU);
        }
    },[login]);

    return {login, logout, token, userId, refreshToken, role, loginU}
}