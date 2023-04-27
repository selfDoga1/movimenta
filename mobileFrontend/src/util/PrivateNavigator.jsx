import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { SignIn } from '../pages/Pages'
import {InsideAppNavigator} from '../navigation/Navigation'

const PrivateSignIn = ({navigation}) => {
    let { user } = useContext(AuthContext);
    
    if (user){
        return <PrivateNavigator component={<InsideAppNavigator rootNavigation={navigation} />}/>
    } else {
        return <SignIn />
    }
};

const PrivateNavigator = (props) => {
    let { user } = useContext(AuthContext);
    
    if (!user){
        return <PrivateSignIn />
    } else {
        return props.component
    }
};


const PrivateInsideAppNavigator = ({navigation}) => (<PrivateNavigator component={<InsideAppNavigator />}/>);

export {PrivateSignIn, PrivateInsideAppNavigator};