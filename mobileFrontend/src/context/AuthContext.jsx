import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import {API_ADDRESS} from '../util/DevelopmentSettings'

// axios.defaults.timeout = 2000;
const AuthContext = createContext();

const AuthProvider = ({children}) => {
        
    const loadTokensFromLocal = async () => {
        try {
            const authTokens = await AsyncStorage.getItem('authTokens');
            if(authTokens){
                setUser(jwtDecode(JSON.parse(authTokens).access))
                return authTokens;
            } else {
                return null;
            }
        } catch (error) {
            return null;
        }
    };
    
    const [authTokens, setAuthTokens] = useState(loadTokensFromLocal());
    const [user, setUser] = useState(null);

    const api = axios.create({
        baseURL: API_ADDRESS
    });

    const loginRequest = async (form) => {
        try {

            const {status, data} = await axios.post(`${ API_ADDRESS }/token/`, form)

            if(status === 200){
                setAuthTokens(data);
                setUser(jwtDecode(data.access))
                await AsyncStorage.setItem('authTokens', JSON.stringify(data));
                return true;
            }

        } catch (error) {
            console.error(error);
        }
    };

    const logoutRequest = async () => {
        setAuthTokens(null);
        setUser(null);
        await AsyncStorage.removeItem('authTokens');
        return true;
    }


    let contextData = {
        loginRequest:loginRequest,
        logoutRequest:logoutRequest,
        authTokens:authTokens,
        user:user,
    };

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );

};

export default AuthContext;
export {AuthProvider};