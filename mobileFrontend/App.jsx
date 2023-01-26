/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';

import { AuthProvider } from './src/context/AuthContext'
import AppNavigator from './src/navigation/OutsideAppNavigator'

function App() {

    return (
        <AuthProvider>
            <IconRegistry icons={EvaIconsPack} />
                <ApplicationProvider {...eva} theme={eva.light}>
                <AppNavigator />
            </ApplicationProvider>
        </AuthProvider>
    
    );
}

export default App;
