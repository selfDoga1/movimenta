import React, { useContext, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import AuthContext  from '../context/AuthContext'
import { Login, Forbidden } from '../pages/Pages'

function PrivateRouter(props) {
    let { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const Element = (props) => {
        if(user.is_staff || user.is_superUser){
            return props.element
        } else {
            return <Forbidden />
        }
    }

    useEffect(() => {
        if(!user){
            navigate('/login')
        }
    }, []);
    
    return (
        <>
            {user && <Element element={props.element}/>} 
        </>
    )
}

function PrivateLoginRouter() {
    let { user } = useContext(AuthContext);
    const navigate = useNavigate();

    

    useEffect(() => {
        if(user.is_staff || user.is_superUser){
            navigate('/')
        }
    }, [user]);

    return (
        <>
            {( !user.is_staff || !user.is_superUser || !user ) && <Login />} 
        </>
    )
}

 
 export default PrivateRouter;
 export { PrivateLoginRouter };