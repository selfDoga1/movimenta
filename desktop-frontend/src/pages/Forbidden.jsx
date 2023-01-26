import React from 'react'
import { Button, Row, Col, Typography } from 'antd';
import { useNavigate } from "react-router-dom";

export default function Forbidden() {
    const navigate = useNavigate();

    return (
        <Row style={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            height:'100vh',
        }}>
            <Col>
                <Typography
                    style={{
                        fontSize:48,
                        fontWeight:'bold',
                    }}
                >
                    Forbidden
                </Typography>
                <Typography
                    style={{
                        fontSize:24,
                        fontWeight:'bold',
                        marginTop:-20,
                    }}
                >
                    Error 403
                </Typography>
                <Button 
                    style={{
                        width:240,
                        marginTop:10,
                    }}
                    onClick={() =>(navigate('/login'))}
                >
                    Back to Login
                </Button>
            </Col>
        </Row>
  )
}
