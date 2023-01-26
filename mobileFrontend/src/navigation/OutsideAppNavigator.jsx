import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { PrivateSignIn } from '../util/PrivateNavigator'
import { InsideAppNavigator } from './Navigation';


const { Navigator, Screen } = createStackNavigator();

const AppNavigator = () => {

    return (
       
       <NavigationContainer>
            <Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Screen name='SignIn' component={PrivateSignIn}/>
                <Screen name='InsideAppNavigator' component={InsideAppNavigator}/>
            </Navigator>
        </NavigationContainer>

    );
}


export default AppNavigator;