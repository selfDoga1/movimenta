import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Tabs, Breadcrumb, Form, Input, Button, Row, Col, Image, Upload } from 'antd'
import { HomeOutlined, UserOutlined, InfoCircleOutlined, UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import MaskedInput from 'antd-mask-input'
import AuthContext from '../../context/AuthContext'
import { API_ADDRESS } from '../../util/DevelopmentSettings'
import { MyModal as Modal, MODAL_CONTENT, ChangePasswordModal } from '../others/Modal'
import { Notification, NOTIFICATION_DESCRIPTION } from '../others/Notification'


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
  
function UserInfo(props) {

    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({});
    const params = useParams();
    
    let {authTokens} = useContext(AuthContext);     
    const userUrl = `${API_ADDRESS}/users/${params.userId}/`;
    const headers = {
        headers:{
            'Authorization': 'Bearer ' + authTokens.access,
        }
    };

    const [isChangePasswordModalOpen, setChangePasswordIsModalOpen] = useState(false);
    const toggleIsChangePasswordModalOpen = () => (setChangePasswordIsModalOpen(!isChangePasswordModalOpen));

    // get user info on load
    const handleGetUserInfoRequest = async () => {
        try {
            const {status, data} = await axios.get(userUrl, headers);

            if(status === 200){
                setUserInfo(data);
            };

        } catch (error) {
            alert('User Info Error!');
            console.error(error);
        }

    };

    // delete user
    const showConfirmDeleteUserModal = () => {
        Modal('Delete', MODAL_CONTENT.delete, () => (handleDeleteUserRequest()));
    };

    const handleDeleteUserRequest = async () => {
        try {
            const {status} = await axios.delete(userUrl, headers);

            if (status === 204){
                navigate('/');
            };

        } catch (error) {
            alert('Delete User Error!');
            console.error(error);
        }
    };

    // edit user
    const showConfirmEditUserModal = (form) => {
        Modal('Edit', MODAL_CONTENT.edit, () => (handleEditUserRequest(form)));
    };
    
    const handleEditUserRequest = async (form) => {
        try {
            const {status} = await axios.put(userUrl, form, headers);
            
            if(status === 200){
                Notification('Success', NOTIFICATION_DESCRIPTION.successEditUser);          
            };

        } catch (error) {
            alert('Edit User Error!');
            console.error(error);
        }
    };

    const handleAvatarUpload = async options => {
        const changeAvatarUrl = `${API_ADDRESS}/users/change_avatar/`
        const { file } = options;
        const blob = file.slice(0, file.size);
        const newFile = new File([blob], `${userInfo.name}_${userInfo.cpf}_avatar.${file.name.split('.').pop()}`, { type: `${file.type}` });
        const form = new FormData();
        form.append('id', userInfo.id);
        form.append('image', newFile);

        try {
            const { status } = await axios.post(changeAvatarUrl, form, headers);

            if(status === 200){
                options.file.status = 'done';
                navigate(0);
            }

        } catch (error) {
            alert('handleAvatarUpload Error');
            console.error(error);   
        }
    };  

    const handleChangePassword = async data => {

        // TODO: not use new FormData().

        const changePasswordUrl = `${API_ADDRESS}/users/change_password/`;
        const form = new FormData();
        form.append('id', userInfo.id);
        form.append('password', data.password)

        try {
            const { status } = await axios.post(changePasswordUrl, form, headers);
            if( status === 200 ){
                setChangePasswordIsModalOpen(false);
                Notification('Success', NOTIFICATION_DESCRIPTION.successChangePassword);          
            }
        } catch (error) {
            alert('ChangePassword error');
            console.error(error);
        }
    };

    const UserInfoForm = (props) => {
        return (
            <div>
                <Row justify='center'>
                    
                    <Col span={6}>
                        <Row>
                            <Image.PreviewGroup>
                                <Image width={200} src={`${userInfo.avatar}`} />
                            </Image.PreviewGroup>     
                        </Row>
                        <Row>
                            <Upload 
                                onChange={handleAvatarUpload}
                                customRequest={handleAvatarUpload}
                                accept='image/png, image/jpeg'
                            >
                                <Button icon={<UploadOutlined />} style={{marginLeft:25, marginTop:20}} >Click to Upload</Button>
                            </Upload>               
                        </Row>
                    </Col>
                
                    <Col span={16}>

                        <Form layout='vertical' autoComplete='off' style={{padding:'auto'}} initialValues={props.userInfo} onFinish={showConfirmEditUserModal}>
                            
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
                                <Button danger type='primary' style={{ marginRight:10 }} onClick={() => (setChangePasswordIsModalOpen(true))}>Change Password</Button>
                                <Button danger type='primary' style={{ marginRight:10 }} onClick={showConfirmDeleteUserModal}>Delete</Button>
                                <Button type='primary' style={{background:'yellow', color:'black'}} htmlType='submit'>Edit</Button>
                            </Row>
    
                        </Form>
                    </Col>
                </Row>
                <ChangePasswordModal 
                    isModalOpen={isChangePasswordModalOpen} 
                    toggleModal={toggleIsChangePasswordModalOpen}
                    handleChangePassword={handleChangePassword}
                />
            </div>
        )
    }

    const tabItems = [
        {
          'key': '1',
          'label': 'User Info',
          'children': <UserInfoForm userInfo={userInfo}/>
        }
    ]

    useEffect(() => {
        handleGetUserInfoRequest();
    }, []);

    return (
        <div>
            <MyBreadcrumb />
            <Tabs defaultActiveKey='1' items={tabItems}/>
        </div>
    )
}

export default UserInfo;