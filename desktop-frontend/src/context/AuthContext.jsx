import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'


const AuthContext = createContext();

const AuthProvider = ({children}) => {

    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null);
    let [loading, setLoading] = useState(true);
    
    const toggleLoading = () => {
        if(loading){
            setLoading(false);
        }
    };

    let loginRequest = async (form) => {
        try {
            const getTokenUrl = 'http://127.0.0.1:8000/api/token/';
            const body = {'cpf': form.cpf, 'password':form.password}
            let response = await axios.post(getTokenUrl, body);

            if (response.status === 200){
                localStorage.setItem('authTokens', JSON.stringify(response.data));
                setAuthTokens(response.data);
                setUser(jwt_decode(response.data.access));  
            } else {
                logoutRequest();
            }
            return response;      
            
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
            const refreshTokenUrl = 'http://127.0.0.1:8000/api/token/refresh/';
            const body = {'refresh': authTokens?.refresh}
            const response = await axios.post(refreshTokenUrl, body);

            if (response.status === 200){
                localStorage.setItem('authTokens', JSON.stringify(response.data));
                setAuthTokens(response.data);
                setUser(jwt_decode(response.data.access));  

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
export {AuthProvider};