import { useContext } from 'react';  
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';
import AuthContext from '../context/AuthContext';
import { API_ADDRESS } from './DevelopmentSettings';


const useAxios = () => {

    const { authTokens, setUser, setAuthTokens } = useContext(AuthContext);

    const axiosInstance = axios.create({
        headers:{
           'Authorization': 'Bearer ' + authTokens.access,
        },     
    });

    axiosInstance.interceptors.request.use(async req => {
       
        const user = jwt_decode(authTokens.access);
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
        
        if(!isExpired) return req;
    
        const refreshTokenResponse = await axios.post(
            `${ API_ADDRESS }/token/refresh/`,
            { refresh: authTokens.refresh }    
        )
    
        localStorage.setItem('authTokens', JSON.stringify(refreshTokenResponse.data))
        setAuthTokens(refreshTokenResponse.data);
        setUser(jwt_decode(refreshTokenResponse.data.access));

        req.headers.Authorization = 'Bearer ' + refreshTokenResponse.data.access;
    });

    return axiosInstance;
};

export default useAxios;