import React, { useState, useContext } from 'react';
import { useNavigate, Outlet } from "react-router-dom";
import { Layout, Menu, Row, Col, theme, Button, Avatar, Image, Dropdown } from 'antd';
import { siderMenuItems } from './menu/MenuItems'
import AuthContext  from '../context/AuthContext'
import { BACKEND_ADDRESS } from '../util/DevelopmentSettings'


const { Header, Content, Sider } = Layout;

function MyLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const { token: { colorBgContainer }} = theme.useToken();

    const siderLogoStyle = {
        height: 32,
        margin: 16,
        background: 'rgba(255, 255, 255, 0.2)',
    };

    const contentDivStyle = {
        background: colorBgContainer,
        minHeight: 600,
        padding: 20,
        marginTop: 16,
    };

    let {user, logoutRequest} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        let response = await logoutRequest();
        if (response){
            navigate('/login');
        }
    };

    const headerMenuItems = () => (
        <Menu>
            <Menu.Item key={'0'}>
                <Button danger onClick={handleLogout} type='link'>Logout!</Button>
            </Menu.Item>
        </Menu>
    );

    const MyHeader = () => (
        <Header style={{ padding: 0, background: colorBgContainer }}>
            <Row justify='end' style={{paddingRight: '25px'}}>
                
                <Col style={{marginRight:10}}>
                    {user && <>Welcome, {user.name}!</>}
                </Col>
                
                <Col>
                    <Dropdown overlay={headerMenuItems} placement="bottomLeft">
                        <Avatar src={<Image src={`${BACKEND_ADDRESS}/${user.avatar}`} style={{ width: 32 }} />} />
                    </Dropdown>
                </Col>

            </Row>
        </Header>
    );
  
    return (
        <Layout style={{ minHeight: '100vh', margin:'-10px -5px -20px -10px' }} className='App'>
            
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div style={siderLogoStyle} />
                <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline' items={siderMenuItems} />
            </Sider>
    
            <Layout className='site-layout'>    
                <MyHeader />
            
                <Content style={{ margin: '0 15px' }} >
                    <div style={contentDivStyle}> <Outlet /> </div>
                </Content>
            </Layout>
            
        </Layout>
    );
}

export default MyLayout;
