import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { API_ADDRESS } from '../util/DevelopmentSettings'

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
            let { status, data } = await axios.post(`${ API_ADDRESS }/token/`, { 'cpf': form.cpf, 'password':form.password });

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

    let contextData = {
        user:user,
        authTokens:authTokens,
        setUser:setUser,
        setAuthTokens:setAuthTokens,
        loginRequest:loginRequest,
        logoutRequest:logoutRequest
    }

    useEffect(() => {

        if(authTokens){
            setUser(jwt_decode(authTokens.access));
        }
        setLoading(false);

    }, [loading, authTokens])

    return (    
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthProvider };