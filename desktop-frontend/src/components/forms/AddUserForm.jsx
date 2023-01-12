import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, Row, Col, Typography, Breadcrumb } from 'antd'
import { HomeOutlined, UserOutlined, PlusOutlined } from '@ant-design/icons';
import MaskedInput from 'antd-mask-input'
import axios from 'axios'
import AuthContext from '../../context/AuthContext'


function AddUserForm() {

    let {authTokens} = useContext(AuthContext);    
    const navigate = useNavigate(); 

    const handleFormRequest = async (form) => {
        try {
            const usersUrl = 'http://127.0.0.1:8000/api/users/';
            const headers = {
                headers:{
                    'Authorization': 'Bearer ' + authTokens.access,
                }
            };
            const response = await axios.post(usersUrl, form, headers);

            if(response.status === 200){
                navigate(`/users/${response.data.id}`);
            };

        } catch (error) {
            alert('add form error!');
            console.log(error);
        }
    };

    const MyForm = () => {
      return (
        <Form labelCol={{span:8}} wrapperCol={{span:24}} layout='vertical' autoComplete='off' onFinish={handleFormRequest}>

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

    const MyBreadcrumb = () => {
        return(
            <Breadcrumb>
                <Breadcrumb.Item>
                    <HomeOutlined />
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <UserOutlined />
                    <span>User</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <PlusOutlined />
                    <span>Add</span>
                </Breadcrumb.Item>
            </Breadcrumb>
        );
    };

    return (
        <div>
            <MyBreadcrumb />
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