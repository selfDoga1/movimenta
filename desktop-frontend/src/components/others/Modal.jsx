import React from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';

const { confirm } = Modal;

const MODAL_CONTENT = {
    'delete':'Do you Want to delete?',
    'edit':'Confirm the edit?',
};

const MyModal = (title, content, callback) => (
    confirm({
        title: title,
        content:content,
        icon: <ExclamationCircleFilled />,
        onOk(){callback()}
    })
);

const ChangePasswordModal = (props) => (
    <Modal 
        title='Change Password' 
        open={props.isModalOpen}
        onCancel={props.toggleModal}
        onOk={props.handleChangePassword}
        footer={[
            <Button danger onClick={props.toggleModal}> Cancel </Button>,
            <Button type='primary' form="changePasswordForm" key="submit" htmlType="submit"> Change </Button>
        ]}
    >
        <Form id='changePasswordForm' onFinish={props.handleChangePassword}>
            <Form.Item label='Password:' name='password' rules={[{ required: true, message: 'Name is required!' }]}>
                <Input.Password />
            </Form.Item>
        </Form>
    </Modal>
)


export  { MyModal, MODAL_CONTENT, ChangePasswordModal };