import React, { useState, useContext } from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import { Layout, Input, Text, Button, Icon } from '@ui-kitten/components';
import StringMask from 'string-mask'
import AuthContext from '../context/AuthContext'


const SignIn = (props) =>  {

    let {loginRequest} = useContext(AuthContext);

    const [cpf, setCpf] = useState(null);
    const [password, setPassword] = useState(null);
    const [secureTextEntry, setSecureTextEntry] = useState(true);
   
    var cpfMask = new StringMask('000.000.000-00');

    const toggleSecureTextEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const renderSecurityIcon = (props) => (
        <TouchableWithoutFeedback onPress={toggleSecureTextEntry}>
            <Icon  { ...props } name={secureTextEntry ? 'eye-off' : 'eye'}/>
        </TouchableWithoutFeedback>
    );

    const mainLayoutStyle = {
        flex: 1,
        justifyContent: 'center',
    };

    const inputStyle = {
        borderRadius:8,
        marginTop:20
    };

    const handleLoginRequest = async () => {
        try {
            const response = await loginRequest({'cpf':cpfMask.apply(cpf), 'password':password});
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Layout style={mainLayoutStyle}>

                <Layout style={{
                    alignItems:'center'
                }}>
                    <Text category='h2'>
                        Movimenta Project
                    </Text>
                </Layout>

                <Layout style={{
                    paddingLeft:40,
                    paddingRight:40,
                    marginTop:10,
                }}>
                    <Input 
                        keyboardType='number-pad' 
                        value={cpf} 
                        onChange={(e) => setCpf(e.nativeEvent.text)}
                        placeholder='Cpf'
                        style={inputStyle}
                    />
    
                    <Input  
                        onChange={(e) => setPassword(e.nativeEvent.text)}
                        secureTextEntry = {secureTextEntry}
                        accessoryRight={renderSecurityIcon}
                        placeholder='Password'
                        style={inputStyle}
                    />

                </Layout>
    
                <Layout style={{
                    paddingLeft:40,
                    paddingRight:40,
                    marginTop:20,
                }}>
                    <Button onPress={handleLoginRequest}>
                        Login
                    </Button>
                </Layout>

            </Layout>
        </>
    );
}

export default SignIn;