import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Tabs, Breadcrumb, Form, Input, Button, Row, Col } from 'antd'
import { HomeOutlined, UserOutlined, InfoCircleOutlined } from '@ant-design/icons';
import MaskedInput from 'antd-mask-input'
import AuthContext from '../../context/AuthContext'
import axios from 'axios';

  
function UserInfo(props) {

    const navigate = useNavigate();
    let {authTokens} = useContext(AuthContext);     
    const params = useParams();
    const [info, setInfo] = useState({});
    

    const userUrl = 'http://127.0.0.1:8000/api/users/' + params.userId + '/';
    const headers = {
        headers:{
            'Authorization': 'Bearer ' + authTokens.access,
        }
    };

    const handleGetUserInfoRequest = async () => {
        try {
            const response = await axios.get(userUrl, headers);

            if(response.status === 200){
                setInfo(response.data)
            };

        } catch (error) {
            alert('User Info Error!')
            console.log(error);
        }

    };

    const handleDeleteUserRequest = async () => {
        // TODO: modal confirmation question!

        try {
            const response = await axios.delete(userUrl, headers);

            if (response.status === 204){
                navigate('/');
            };

        } catch (error) {
            
        }
    };

    const handleEditUserRequest = async (form) => {
        try {
            const response = await axios.put(userUrl, form, headers);

            if(response.status === 200){
                // TODO: modal success alert!
            };

        } catch (error) {
            alert('Edit User Error!')
            console.log(error)
        }
    };

    const UserInfoForm = (props) => {
        return (
            <div>
                <Row justify='center'>
                    <Col span={12}>
                        <Form layout='vertical' autoComplete='off' style={{padding:'auto'}} initialValues={props.info} onFinish={handleEditUserRequest}>
                            
                            <Form.Item label='Name:' name='name' rules={[{ required: true, message: 'Name is required!' }]}>
                                <Input />
                            </Form.Item>
    
                            <Form.Item label='Cpf:' name='cpf' rules={[{ required: true, message: 'Cpf is required!' }]}>
                                <MaskedInput mask={'000.000.000-00'} />
                            </Form.Item>
    
                            <Form.Item label='Phone:' name='phone'>
                                <MaskedInput mask={'(00) 0 0000-0000'} />
                            </Form.Item>
    
                            <Form.Item label='E-mail:' name='email'>
                                <Input placeholder='user@email.com' />
                            </Form.Item>
    
                            <Row justify='end'>
                                <Button type='primary' style={{background:'red', marginRight:'10px'}} onClick={handleDeleteUserRequest}>Delete</Button>
                                <Button type='primary' style={{background:'yellow', color:'black'}} htmlType='submit'>Edit</Button>
                            </Row>
    
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }

    const tabItems = [
        {
          'key': '1',
          'label': 'User Info',
          'children': <UserInfoForm info={info}/>
        }
    ]

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
                    <InfoCircleOutlined />
                    <span>Info</span>
                </Breadcrumb.Item>
          </Breadcrumb>
      );
    };

    const onChange = () => {};

    useEffect(() => {
        handleGetUserInfoRequest();
    }, []);

    return (
        <div>
            <MyBreadcrumb />
            <Tabs  defaultActiveKey='1' items={tabItems} onChange={onChange}/>
        </div>
    )
}

export default UserInfo;