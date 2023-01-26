import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import {API_ADDRESS} from '../util/DevelopmentSettings'

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    let [ authTokens, setAuthTokens ] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    let [ user, setUser ] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null);
    let [ loading, setLoading ] = useState(true);
    
    const toggleLoading = () => {
        if(loading){
            setLoading(false);
        }
    };

    let loginRequest = async (form) => {
        try {
            const getTokenUrl = `${API_ADDRESS}/token/`;
            const body = {'cpf': form.cpf, 'password':form.password} // irrelevant
            let { status, data } = await axios.post(getTokenUrl, body);

            if (status === 200){
                localStorage.setItem('authTokens', JSON.stringify(data));
                setAuthTokens(data);
                setUser(jwt_decode(data.access));  
            } else {
                logoutRequest();
            }
            return status;      
            
        } catch (error) {
            console.log(error)
        }
        toggleLoading();
    }

    let logoutRequest = () => {
        localStorage.removeItem('authTokens');
        setAuthTokens(null);
        setUser(null);
        return true;
    }

    let refreshTokenRequest = async () => {
        try {
            const refreshTokenUrl = `${API_ADDRESS}/token/refresh/`;
            const body = {'refresh': authTokens?.refresh}
            const { status, data } = await axios.post(refreshTokenUrl, body);

            if (status === 200){
                localStorage.setItem('authTokens', JSON.stringify(data));
                setAuthTokens(data);
                setUser(jwt_decode(data.access));  

            } else {
                logoutRequest();
            }
            
        } catch (error) {
            logoutRequest();
        }
        toggleLoading();
    }

    let contextData = {
        user:user,
        authTokens:authTokens,
        loginRequest:loginRequest,
        logoutRequest:logoutRequest
    }

    useEffect(() => {

        if(loading){
            refreshTokenRequest();
        }

        // TODO: implement axios interceptors

        let fourMinutes = 1000 * 60 * 4;

        let interval = setInterval(() => {
            if(authTokens){
                refreshTokenRequest();
            }
        }, fourMinutes)

        return () => clearInterval(interval);

    }, [loading, authTokens])

    return (    
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthProvider };