import React, { useContext, useEffect, useState } from 'react'
import { Drawer, DrawerGroup, DrawerItem, Text, Layout, Button } from '@ui-kitten/components';
import AuthContext from '../context/AuthContext'
import { API_ADDRESS } from '../util/DevelopmentSettings'
import axios from 'axios';
import useAxios from '../util/useAxios'


export default function Routines() {
    
    const { user, authTokens } = useContext(AuthContext);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [routines, setRoutines] = useState(null);
    const [workoutRoutines, setWorkoutRoutines] = useState([]);
    
    const getAccessToken = () => {
        try {
            if(authTokens._j){                
                return JSON.parse(authTokens._j).access
            }
            return authTokens.access
        } catch (error) {
            return ''
        }
    };

    const axiosInstance = axios.create({
        headers:{
           'Authorization': 'Bearer ' + getAccessToken(),
        },     
    });

    // - - - Workout Routine - - - \\
    const getWorkouts = () => {

        let urls = routines?.map((routine, key) => {
            return `${ API_ADDRESS }/workout-routines/routine/${ routine.id }/`
        })
        
        const requests = urls?.map(url => axiosInstance.get(url));
        // const requests = urls?.map(url => api.get(url));

                
        if (requests){
            Promise.all(requests).then(
                responses => {
                    const responseData = responses.map(response => response.data);
                    setWorkoutRoutines(responseData);                
                }
            )
        }

    }

    async function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // - - - Routine - - - \\
    const getRoutines = async () => {
        try {

            // TODO: use useAxios.jsx for requests!

            const url = `${ API_ADDRESS }/routines/user/${ user.user_id }/`
            const response = await axiosInstance.get(url);
            
            console.log("🚀 ~ file: Routines.jsx:67 ~ getRoutines ~ response:", response)
            
            if (response.status === 200) {
                setRoutines(response.data);
            }

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getRoutines();
    }, []);

    useEffect(() => {
        getWorkouts(); 
    }, [routines]);

    return (
        <>
            <Drawer
                selectedIndex={ selectedIndex }
                onSelect={index => setSelectedIndex(index)}
            >

                {routines?.map((routine, key) => {
                   return(
                    <DrawerGroup key={key} title={routine.name} >

                       {workoutRoutines?.map((workoutRoutine) => {       
                            if(workoutRoutine[0].routine.id === routine.id){
                                return(
                                    <DrawerItem key={`${ routine.id }${ workoutRoutine[0].workout.id }`} title={`${ workoutRoutine[0].workout.name } - ${ workoutRoutine[0].series } x ${ workoutRoutine[0].repetitions }`}/>
                                )
                            }
                       })}

                    </DrawerGroup>
                   ) 
                })}

            </Drawer>


            <Layout style={{
                paddingBottom:10,
            }}>

                <Button 
                    appearance='filled'
                    style={{marginBottom:6}}
                    onPress={getRoutines}
                >
                    Refresh
                </Button>

            </Layout>

        </>
    )
}
