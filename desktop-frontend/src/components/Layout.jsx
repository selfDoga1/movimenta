import React, { useState, useContext } from 'react';
import { useNavigate, Outlet } from "react-router-dom";
import { Layout, Menu, Row, Col, theme, Button } from 'antd';
import items from '../util/SiderMenuItems'
import AuthContext  from '../context/AuthContext'
const { Header, Content, Footer, Sider } = Layout;


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
  
  return (
    <Layout style={{ minHeight: '100vh', margin:'-10px -5px -20px -10px' }} className='App'>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <div style={siderLogoStyle} />
            <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline' items={items} />
        </Sider>
      
        <Layout className='site-layout'>
            <Header style={{ padding: 0, background: colorBgContainer }}>
                <Row justify='end' style={{paddingRight: '25px'}}>
                    <Col style={{marginRight:'15px'}}>
                        {user && <>Welcome, {user.name}!</>}
                    </Col>
                    <Col>
                        <Button danger onClick={handleLogout}>Logout!</Button>
                    </Col>
                </Row>
            </Header>
        
            <Content style={{ margin: '0 15px' }} >
                <div style={contentDivStyle}>
                    <Outlet />
                </div>
            </Content>
        
      </Layout>
    </Layout>
  );
}
export default MyLayout;
