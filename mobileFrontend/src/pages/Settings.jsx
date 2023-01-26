import React, { useContext } from 'react'
import { Layout, Text, Button, Avatar } from '@ui-kitten/components';
import AuthContext from '../context/AuthContext'
import { BACKEND_ADDRESS } from '../util/DevelopmentSettings'


export default function Settings(props) {

    const { user, logoutRequest } = useContext(AuthContext);

    const handleLogoutRequest = async () => {
        try {
            const response = await logoutRequest();
        } catch (error) {
            console.error(error);
        }
    };
    
    return (
        <Layout style={{
            flex:1,
            flexDirection:'column',
            padding:10,
            justifyContent:'space-between'
        }}>


            <Layout style={{
                alignItems:'center',
                paddingTop:10,
            }}>
                <Avatar style={{width:100, height:100}} source={{ uri: `${BACKEND_ADDRESS}${user.avatar}` }}/>
                <Text
                    style={{
                        fontWeight:'bold',
                        fontSize:24,
                        marginTop:10,
                    }}
                >
                    {user.name}
                </Text>
                
            </Layout>

            <Layout style={{
                paddingBottom:10,
            }}>
                <Button 
                    status='danger'
                    onPress={handleLogoutRequest}
                >
                    Logout
                </Button>
            </Layout>
        
        </Layout>
    )
}
