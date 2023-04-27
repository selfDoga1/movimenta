import React, { useState } from 'react';
import { Table, Button, Form, Input, InputNumber} from 'antd';
import Column from 'antd/es/table/Column';
import { API_ADDRESS } from '../../util/DevelopmentSettings';
import useAxios from '../../util/useAxios';
import { GenericModal } from '../others/Modal'
import { Notification, NOTIFICATION_DESCRIPTION } from '../others/Notification'


export default function WorkoutTable(props) {

    const api = useAxios();
    
    const [workouts, setWorkouts] = useState([]);
    const [selectedWorkout, setSelectedWorkout] = useState(0);

    const [isConfirmAddWorkoutModalOpen, setIsConfirmAddWorkoutModalOpen] = useState(false);
    const toggleIsConfirmAddWorkoutModalOpen = () => setIsConfirmAddWorkoutModalOpen(!isConfirmAddWorkoutModalOpen);

    function SearchEngine(props) {

        const handleSearchWorkouts = async (value) => {
            try {
                const { status, data } =  await api.get(`${API_ADDRESS}/workouts/?search=${value}` )

                if (status === 200){
                    setWorkouts(data);
                }
                
            } catch (error) {
                alert('Search Workout Engine Error!')   
                console.error(error);
            }
        };

        return (
            <Form layout='horizontal' style={{ width:'100%', justifyContent:"start" }}>
                <Form.Item name='search' label='' style={{width:'100%'}}>
                    <Input.Search autoComplete='off' onSearch={handleSearchWorkouts}/>
                </Form.Item>
            </Form>
        );

    };

    const selectWorkout = (workoutId) => {
        setSelectedWorkout(workouts.find(workout => workout.id === workoutId));
        return(
            <Button type='primary' onClick={() => toggleIsConfirmAddWorkoutModalOpen()}>Select</Button>
        );
    };

    const handleAddWorkoutRoutine = async (form) => {
        try {
            const updatedForm = {routine:props.selectedRoutine.id, workout:selectedWorkout.id, ...form};
            const { status } = await api.post(`${API_ADDRESS}/workout-routines-simple/`, updatedForm);

            if(status === 201){
                toggleIsConfirmAddWorkoutModalOpen();
                props.toggleIsAddWorkoutModalOpen();
                props.handleShowWorkoutRoutine(props.selectedRoutine.id);
                Notification('Success', NOTIFICATION_DESCRIPTION.successAddRoutine);
            }

        } catch (error) {
            alert('AddWorkoutRoutine Error!');
            console.error(error);
        }
    }

    return (
        <div>
            <SearchEngine />

            <Table
                dataSource={workouts}
                tableLayout='auto'
                pagination={{ defaultPageSize: 5 }}
            >
                <Column title='Name' dataIndex='name' responsive={['md']}/>
                <Column title='Action' key='action' dataIndex='id' responsive={['sm']} render={(dataIndex) => selectWorkout(dataIndex)}/>

            </Table>

            <GenericModal
                title='Add Workout'
                width={500}
                isModalOpen={isConfirmAddWorkoutModalOpen}
                toggleModal={() => toggleIsConfirmAddWorkoutModalOpen()}
                onCancel={() => toggleIsConfirmAddWorkoutModalOpen()}
                footer={[
                    <Button onClick={() => toggleIsConfirmAddWorkoutModalOpen()}> Cancel </Button>,
                    <Button type='primary' form="addWorkout" key="submit" htmlType="submit"> Add </Button>
                ]}
            >
                <Form name='addWorkout' layout='inline' style={{ width:'100%', justifyContent:'center' }} onFinish={handleAddWorkoutRoutine}>

                    <Form.Item label='Series:' name='series' rules={[{ required: true, message: 'Password is required!' }]}>
                        <InputNumber />
                    </Form.Item>

                    <Form.Item label='Repetitions:' name='repetitions' rules={[{ required: true, message: 'Password is required!' }]}>
                        <InputNumber />
                    </Form.Item>

                </Form>
            </GenericModal>

        </div>
  )
}
