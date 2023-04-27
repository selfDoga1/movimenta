import React from 'react';
import { Modal } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';

const { confirm } = Modal;

const MODAL_CONTENT = {
    'delete':'Do you Want to delete?',
    'edit':'Confirm the edit?',
};

const ConfirmModal = (title, content, callback) => (
    confirm({
        title: title,
        content:content,
        icon: <ExclamationCircleFilled />,
        onOk(){callback()}
    })
);

const GenericModal = (props) => (
    <Modal
        title={props.title}
        open={props.isModalOpen}
        onCancel={props.toggleModal}
        width={props.width}
        footer={props.footer}
        onOk={props.onOk}
    >
        <div style={props.style}>
            {props.children}
        </div>
    </Modal>
)


export  { ConfirmModal, MODAL_CONTENT, GenericModal };