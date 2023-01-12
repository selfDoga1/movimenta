import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Row, Col, Typography } from 'antd';
import AuthContext from '../context/AuthContext'
import MaskedInput from 'antd-mask-input'


function Login() {

    const formRowStyle = {
        background: '', 
        height: '100vh',
    }

    const formColStyle = {
        border: '1px solid rgba(0,0,0,.20)',
        boxShadow: '3px 5px 1px rgba(0,0,0,.40)',
        padding: '64px',
        background:'white'
    };

    const logoFontStyle = {
        fontFamily: 'ubuntu',
        fontSize: '24px',
        fontWeight: 'bold',
    };

    const navigate = useNavigate();
    let {loginRequest, user} = useContext(AuthContext);     
    
    const handleLoginRequest = async (form) => {
        try {
            const response = await loginRequest(form);

            if(response.status === 200){
                navigate('/')
            }
            
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <Row justify='center' align='middle' style={formRowStyle}>
            <Col style={formColStyle}>
            
                <Row justify='center' style={{ marginBottom: '24px' }}>
                    <Typography style={logoFontStyle}> Movimenta Project </Typography>
                </Row>

                <Row>
                    <Form name='login' layout='vertical' autoComplete='off' onFinish={handleLoginRequest}>
                        <Form.Item label='Cpf' name='cpf' rules={[{ required: true, message: 'Cpf is required!' }]}>
                            <MaskedInput mask={'000.000.000-00'}/>
                        </Form.Item>

                        <Form.Item label='Password' name='password' rules={[{ required: true, message: 'Password is required!' }]}>
                            <Input.Password />
                        </Form.Item>

                        <Row justify='end'>
                            <Form.Item>
                                <Button type='primary' htmlType='submit'>Login</Button>
                            </Form.Item>
                        </Row>

                    </Form>
                </Row>
            </Col>
        </Row>
    );
}

export default Login;