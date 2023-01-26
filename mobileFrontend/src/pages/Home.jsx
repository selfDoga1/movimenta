import React, {useContext, useEffect} from 'react'
import { Layout, Text, Avatar} from '@ui-kitten/components';
import AuthContext from '../context/AuthContext'
import {BACKEND_ADDRESS} from '../util/DevelopmentSettings'


export default function HomePage(props) {
    const {user} = useContext(AuthContext);

    return (
        <Layout style={{
            flex:1,
            flexDirection:'row',
            padding:10,
            justifyContent:'space-between'
        }}>

            <Layout style={{
                padding:10
            }}>
            
                <Text style={{
                    fontWeight:'bold',
                    fontSize:18,
                }}>
                    Hi, {user.name}
                </Text>

                <Text style={{
                    fontSize:16,
                }}>
                    Welcome back!
                </Text>
            
            </Layout>

            <Layout style={{
                paddingTop:10,
            }}>
                <Avatar size='giant' source={{ uri: `${BACKEND_ADDRESS}${user.avatar}` }}/>
            </Layout>

        </Layout>
  )
}
