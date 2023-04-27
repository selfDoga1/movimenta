import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, Row, Col, Typography } from 'antd'
import MaskedInput from 'antd-mask-input'
import { API_ADDRESS } from '../../util/DevelopmentSettings'
import useAxios from '../../util/useAxios'
import AppBreadcrumb from '../../util/AppBreadcrumb'


function AddUserForm() {

    const api = useAxios(); 
    const navigate = useNavigate(); 

    const MyFormTitle = () => {

        const style = {
            fontFamily:'ubuntu',
            fontSize:'32px',
            marginBottom:'5px',
        }

        return (
            <Typography style={style}>
                Add User
            </Typography>
        );

    }

    const handleAddUser = async (form) => {
        try {
            const { status, data } = await api.post(`${API_ADDRESS}/users/`, form);

            if(status === 200){
                navigate(`/users/${data.id}`);
            };

        } catch (error) {
            alert('AddUserForm error!');
            console.log(error);
        }
    };
    
    // TODO: the form below is repeated on UserInfoForm.jsx!, fix that!

    const MyForm = () => {
      return (
        <Form labelCol={{span:8}} wrapperCol={{span:24}} layout='vertical' autoComplete='off' onFinish={handleAddUser}>

            <Form.Item label='Name:' name='name' rules={[{ required: true, message: 'Name is required!' }]}>
                <Input />
            </Form.Item>

            <Form.Item label='Cpf:' name='cpf' rules={[{ required: true, message: 'Cpf is required!' }]}>
                <MaskedInput mask={'000.000.000-00'}/>
            </Form.Item>

            <Form.Item label='Phone:' name='phone'>
                <MaskedInput mask={'(00) 0 0000-0000'}/>
            </Form.Item>

            <Form.Item label='E-mail:' name='email'>
                <Input placeholder='user@email.com'/>
            </Form.Item>

            <Form.Item label='Password:' name='password' rules={[{ required: true, message: 'Password is required!' }]}>
                <Input.Password />
            </Form.Item>

            <Row justify='end'>
                <Form.Item wrapperCol={{ offset: 0 }}>
                    <Button type='primary' htmlType='submit'>Add</Button>
                </Form.Item>
            </Row>

        </Form>        
      )
    }
    
    return (
        <div>
            <AppBreadcrumb items={['User', 'Add']}/>

            <Row justify='center'>
                <MyFormTitle />
            </Row>
            <Row justify='end'>
                <Col span={12} style={{margin:'auto'}}>
                    <MyForm />
                </Col>
            </Row>
        </div>
  )
}

export default AddUserForm;