import React from 'react';
import { Form, Input, Button, Row, Col, Image, Upload } from 'antd';
import {  UploadOutlined } from '@ant-design/icons';
import MaskedInput from 'antd-mask-input';
import { ConfirmModal, MODAL_CONTENT, GenericModal } from '../others/Modal';
import { ChangePasswordForm } from '../forms/Forms'


function UserInfoForm(props){

    const showConfirmEditUserModal = (form) => {
        ConfirmModal('Edit', MODAL_CONTENT.edit, () => (props.handleEditUser(form)));
    };

    const showConfirmDeleteUserModal = () => {
        ConfirmModal('Delete', MODAL_CONTENT.delete, () => (props.handleDeleteUser()));
    };

    // TODO: the form below is repeated on AddUserForm.jsx!, fix that!

    const MyForm = () => (
        <Form  name={'userInfoForm'} layout='vertical' autoComplete='off' style={{padding:'auto'}} initialValues={props.userInfo} onFinish={showConfirmEditUserModal}>
                        
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
                <Button danger type='primary' style={{ marginRight:10 }} onClick={() => (props.toggleIsChangePasswordModalOpen())}>Change Password</Button>
                <Button danger type='primary' style={{ marginRight:10 }} onClick={showConfirmDeleteUserModal}>Delete</Button>
                <Button type='primary' style={{background:'yellow', color:'black'}} htmlType='submit'>Edit</Button>
            </Row>

        </Form>
    );

    const ChangePasswordModal = () =>(
        <GenericModal
            title={'Change Password'} 
            isModalOpen={props.isChangePasswordModalOpen}
            toggleModal={props.toggleIsChangePasswordModalOpen}
            footer={[
                <Button secondary onClick={props.toggleIsChangePasswordModalOpen}> Cancel </Button>,
                <Button type='primary' form="changePasswordForm" key="submit" htmlType="submit"> Change </Button>
            ]}
        >
            <ChangePasswordForm handleChangePassword={props.handleChangePassword}/>
        </GenericModal>
    );

    return (
        <div>
            <Row justify='center'>
                
                <Col span={6}>
                    <Row>
                        <Image.PreviewGroup>
                            <Image width={200} src={`${props.userInfo.avatar}`} />
                        </Image.PreviewGroup>     
                    </Row>
                    <Row>
                        <Upload 
                            onChange={props.handleAvatarUpload}
                            customRequest={props.handleAvatarUpload}
                            accept='image/png, image/jpeg'
                        >
                            <Button icon={<UploadOutlined />} style={{marginLeft:25, marginTop:20}} >Click to Upload</Button>
                        </Upload>               
                    </Row>
                </Col>
            
                <Col span={16}>
                    <MyForm />
                </Col>
            </Row>
            
            <ChangePasswordModal />

        </div>
    )
}

export default UserInfoForm