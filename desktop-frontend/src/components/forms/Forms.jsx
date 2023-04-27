import React from 'react'
import { Form, Input } from 'antd'

//  - - - external forms - - - \\
import AddUserForm from './AddUserForm'
import UserInfoForm from './UserInfoForm'


function AddRoutineForm(props) {
    return (
        <Form onFinish={props.handleAddRoutine} name='addRoutineForm'>
            <Form.Item label='New Routine:' name='name' rules={[{ required: true, message: 'Name is required!' }]}>
                <Input />
            </Form.Item>
        </Form>        
    );
};

function ChangePasswordForm(props){
    return(
        <Form id='changePasswordForm' onFinish={props.handleChangePassword}>
            <Form.Item label='New Password:' name='password' rules={[{ required: true, message: 'Name is required!' }]}>
                <Input.Password />
            </Form.Item>
        </Form>
    );
};

export { AddUserForm, AddRoutineForm, UserInfoForm, ChangePasswordForm };