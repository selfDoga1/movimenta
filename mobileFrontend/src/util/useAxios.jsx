import { useContext } from 'react';  
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';
import AuthContext from '../context/AuthContext';
import { API_ADDRESS } from './DevelopmentSettings';
import AsyncStorage from '@react-native-async-storage/async-storage';



function useAxios(authTokens){

    const { setUser, setAuthTokens } = useContext(AuthContext);

    const getAccessToken = () => {
        try {
            return JSON.parse(authTokens._j).access
        } catch (error) {
            return ''
        }
    };

    const getRefreshToken = () => {
        try {
            return JSON.parse(authTokens._j).refresh
        } catch (error) {
            return ''
        }
    };

    const axiosInstance = axios.create({
        headers:{
           'Authorization': 'Bearer ' +  getAccessToken()
        },     
    });

    axiosInstance.interceptors.request.use(async req => {
       
        const user = jwt_decode(getAccessToken());
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
        
        if(!isExpired) return req;
    
        const refreshTokenResponse = await axios.post(
            `${ API_ADDRESS }/token/refresh/`,
            { refresh: getRefreshToken() }    
        )
    
        await AsyncStorage.setItem('authTokens', JSON.stringify(data));

        // localStorage.setItem('authTokens', JSON.stringify(refreshTokenResponse.data))
        setAuthTokens(refreshTokenResponse.data);
        setUser(jwt_decode(refreshTokenResponse.data.access));

        req.headers.Authorization = 'Bearer ' + refreshTokenResponse.data.access;
    });

    return axiosInstance;
};

export default useAxios;