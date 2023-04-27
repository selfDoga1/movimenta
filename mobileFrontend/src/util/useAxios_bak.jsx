import { useContext, useEffect, useState } from 'react';  
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';
import AuthContext from '../context/AuthContext';
import { API_ADDRESS } from './DevelopmentSettings';
import AsyncStorage from '@react-native-async-storage/async-storage';


function useAxios() {

    const {authTokens, setUser, setAuthTokens} = useContext(AuthContext);
    const [accessToken, setAccessToken] = useState('')
    const [refreshToken, setRefreshToken] = useState('')

    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    useEffect(() => {
        try {
            setAccessToken(JSON.parse(authTokens._j).access);
            setRefreshToken(JSON.parse(authTokens._j).refresh); 
        } catch (error) {
        }
    }, [authTokens]);

    const axiosInstance =  axios.create({
        API_ADDRESS,
        headers:{
           'Authorization': 'Bearer ' + accessToken? accessToken : ''
        },     
    });

    axiosInstance.interceptors.request.use(async req => {
       
        const user = jwt_decode(accessToken);
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
        
        if(!isExpired) return req;
    
        const {status, data} = await axios.post(
            `${API_ADDRESS}/token/refresh/`,
            { refresh: refreshToken }    
        )
    
        await AsyncStorage.setItem('authTokens', JSON.stringify(data));

        setAuthTokens(data);
        setUser(jwt_decode(data.access));

        req.headers.Authorization = 'Bearer ' + data.access;
    });

    return axiosInstance;
};

export default useAxios;