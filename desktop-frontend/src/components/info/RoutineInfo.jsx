import React, { useEffect, useState } from 'react';
import { Row, Button } from 'antd';
import useAxios from '../../util/useAxios';
import { API_ADDRESS } from '../../util/DevelopmentSettings';
import { GenericModal } from '../others/Modal'
import { AddRoutineForm } from '../forms/Forms'
import { Notification, NOTIFICATION_DESCRIPTION } from '../others/Notification'
import { WorkoutRoutinesTable, RoutinesTable, WorkoutTable } from '../tables/Tables'

function RoutineInfo(props) {

    let api = useAxios();

    // - - - Routine - - - \\
    const showWorkouts = (routineId) => (
        <Button type='primary' onClick={ () => handleShowWorkoutRoutine(routineId) }>Select</Button>
    );
        
    const handleGetUserRoutines = async () => {
        try {
            const url = `${API_ADDRESS}/routines/?user=${props.userInfo.id}`;
            const {status, data} = await api.get(url);
           
            if(status === 200){
                setRoutines(data);
            };
            
        } catch (error) {
            alert('User Routine Error');
            console.error(error);
        }
    };
    
    const [isAddRoutineModalOpen, setIsAddRoutineModalOpen] = useState(false);
    const toggleIsAddRoutineModalOpen = () => setIsAddRoutineModalOpen(!isAddRoutineModalOpen);

    const handleAddRoutine = async (form) => {        
        try {
            const url = `${API_ADDRESS}/routines/`
            const { status } = await api.post(url, {...form, user:props.userInfo.id})

            if(status === 201){
                toggleIsAddRoutineModalOpen();
                handleGetUserRoutines();
                Notification('Success', NOTIFICATION_DESCRIPTION.successAddRoutine);
            };

        } catch (error) {
            alert('AddRoutineForm error!');
            console.log(error);
        }
    };

    // - - - workout - - - \\ 
    const [isAddWorkoutModalOpen, setIsAddWorkoutModalOpen] = useState(false);
    const toggleIsAddWorkoutModalOpen = () => setIsAddWorkoutModalOpen(!isAddWorkoutModalOpen);


    // - - - Workout Routine - - - \\
    const [isWorkoutRoutinesModalOpen, setIsWorkoutRoutinesModalOpen] = useState(false);
    const toggleIsWorkoutRoutineModalOpen = () => (setIsWorkoutRoutinesModalOpen(!isWorkoutRoutinesModalOpen));
    
    // const [currentWorkoutRoutineModalTitle, setCurrentWorkoutRoutineModalTitle] = useState('');
    const [workoutRoutine, setWorkoutRoutine] = useState([]);

    const [selectedRoutine, setSelectedRoutine] = useState(null);
    const [routines, setRoutines] = useState(null);
    
    const handleShowWorkoutRoutine = async (routineId) => {
        try {
            const url = `${API_ADDRESS}/workout-routines/routine/${routineId}/`;
            const { status, data } = await api.get(url);

            if(status === 200){
                setWorkoutRoutine(data);
                setSelectedRoutine(routines.find(routines => routines.id === routineId));
                // TODO: fix routine modal title!
                // setCurrentWorkoutRoutineModalTitle(selectedRoutine ? selectedRoutine.name : 'Selected Workout');
            }

        } catch (error) {
            alert('WorkoutRoutine Error!');
            console.error(error);
        }
      
        setIsWorkoutRoutinesModalOpen(true);
    };

    
    useEffect(() => {
        handleGetUserRoutines();
    }, []);

    return (
        <div>

            <RoutinesTable 
                dataSource={routines} 
                actionRender={showWorkouts}
                topContent={
                    <Row justify={'end'} style={{ marginBottom:12 }}>
                        <Button size='large' type='primary' onClick={() => toggleIsAddRoutineModalOpen()}>Add Routine</Button>
                    </Row>
                }
            />
            
            <GenericModal 
                // title={currentWorkoutRoutineModalTitle}
                title={'Routine'}

                width={800}
                isModalOpen={isWorkoutRoutinesModalOpen}
                toggleModal={() => toggleIsWorkoutRoutineModalOpen()}

            >
                <WorkoutRoutinesTable 
                    dataSource={workoutRoutine}
                    topContent={
                        <Row justify={'end'} style={{ marginBottom:12 }}>
                            <Button size='large' type='primary' onClick={() =>  toggleIsAddWorkoutModalOpen()}>Add Workout</Button>
                        </Row>  
                    }
                />
            </GenericModal> 

            <GenericModal
                title={'Add Routine'}
                width={500}
                isModalOpen={isAddRoutineModalOpen}
                toggleModal={() => toggleIsAddRoutineModalOpen()}
                footer={[
                    <Button onClick={() => toggleIsAddRoutineModalOpen()}> Cancel </Button>,
                    <Button type='primary' form="addRoutineForm" key="submit" htmlType="submit"> Add </Button>
                ]}
            >
                <AddRoutineForm handleAddRoutine={(form) => handleAddRoutine(form)}/>
            </GenericModal>   

            <GenericModal 
                title={'Add Workout'}
                width={800}
                isModalOpen={isAddWorkoutModalOpen}
                toggleModal={() => toggleIsAddWorkoutModalOpen()}
                onCancel={() => toggleIsAddWorkoutModalOpen()}
                footer={[]}
            >
                <WorkoutTable 
                    selectedRoutine={selectedRoutine} 
                    toggleIsAddWorkoutModalOpen={toggleIsAddWorkoutModalOpen} 
                    handleShowWorkoutRoutine={handleShowWorkoutRoutine}
                />
            </GenericModal>      

        </div>
  )
}

export default RoutineInfo