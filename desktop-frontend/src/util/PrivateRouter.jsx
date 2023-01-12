import React, { useContext, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import AuthContext  from '../context/AuthContext'
import Login from '../pages/Login'

function PrivateRouter(props) {
    let {user} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(!user){
            navigate('/login')
        }
    }, []);
    
    return (
        <>
            {user && props.element} 
        </>
    )
}

function PrivateLoginRouter() {
    let {user} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(user){
            navigate('/')
        }
    }, [user]);

    return (
        <>
            {!user && <Login />} 
        </>
    )
}

 
 export default PrivateRouter;
 export {PrivateLoginRouter};