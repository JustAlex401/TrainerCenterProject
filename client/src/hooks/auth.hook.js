import { useEffect } from 'react';
import {useState, useCallback} from 'react';
import Cookies from 'js-cookie';

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [refreshToken, setRefresh] = useState(null);
    const [userId , setUserId] = useState(null);
    const [role, setRole] = useState(null);
    // const [cookies, setCookie] = useCookies(["token"]);

    const login = useCallback((jwtToken, refreshToken, id, role)=>{
        setToken(jwtToken);
        setUserId(id);
        setRefresh(refreshToken);
        setRole(role);
        console.log(jwtToken+ "   "+refreshToken+ "   "+ id);

        Cookies.set("token", jwtToken);
        Cookies.set("refreshToken", refreshToken);
        Cookies.set("id", id);
        Cookies.set("role", role);

    }, []);

    const logout = useCallback(() => {

        setToken(null);
        setUserId(null);
        setRefresh(null);

        Cookies.remove('token');
        Cookies.remove('refreshToken');
        Cookies.remove('id');
        Cookies.remove('role');

    }, []);

    useEffect(() => {
        const data = {
            token : Cookies.get('token'),
            refreshToken : Cookies.get('refreshToken'),
            id : Cookies.get('id'),
            role : Cookies.get('role')
        }
        console.log(data);
        if (data && data.token && data.refreshToken){
            login(data.token, data.refreshToken, data.id, data.role);
        }
    },[login]);

    return {login, logout, token, userId, refreshToken, role}
}