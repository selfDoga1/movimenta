import { notification } from 'antd';
import { CheckCircleTwoTone } from '@ant-design/icons'

const NOTIFICATION_DESCRIPTION = {
    successEditUser: 'User successfully edited!',
    successChangePassword:'User Password successfully changed!' 
}

const Notification = (message, description) => {
    notification.open({
        message: message,
        description: description,
        placement:'topRight',
        icon:<CheckCircleTwoTone />
    });
};

export { Notification, NOTIFICATION_DESCRIPTION }