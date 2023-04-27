import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tabs } from 'antd';
import { API_ADDRESS } from '../../util/DevelopmentSettings';
import { Notification, NOTIFICATION_DESCRIPTION } from '../others/Notification';
import useAxios from '../../util/useAxios'
import { RoutineInfo } from './Info'
import {UserInfoForm} from '../forms/Forms'
import AppBreadcrumb from '../../util/AppBreadcrumb'
  
function UserInfo(props) {

    const api = useAxios();
    const navigate = useNavigate();
    const params = useParams();
    const [userInfo, setUserInfo] = useState({});
    const userUrl = `${API_ADDRESS}/users/${params.userId}/`;

    //  - - - get user information - - - \\
    const handleGetUserInfo = async () => {
        try {
            const {status, data} = await api.get(userUrl);

            if(status === 200){
                setUserInfo(data);
            };

        } catch (error) {
            alert('User Info Error!');
            console.error(error);
        }

    };

    // TODO: function repeated on AddUserForm.jsx
    //  - - - add user - - - \\
    const handleAddUser = async (form) => {
        try {
            const url = `${API_ADDRESS}/users/`;
            const { status, data } = await api.post(url, form);

            if(status === 200){
                navigate(`/users/${data.id}`);
            };

        } catch (error) {
            alert('AddUserForm error!');
            console.log(error);
        }
    };

    //  - - - delete user - - - \\
    const handleDeleteUser = async () => {
        try {
            const {status} = await api.delete(userUrl);

            if (status === 204){
                navigate('/');
            };

        } catch (error) {
            alert('Delete User Error!');
            console.error(error);
        }
    };

    //  - - - edit user - - - \\
    const handleEditUser = async form => {
        try {
            const {status} = await api.put(userUrl, form);
            
            if(status === 200){
                Notification('Success', NOTIFICATION_DESCRIPTION.successEditUser);          
            };

        } catch (error) {
            alert('Edit User Error!');
            console.error(error);
        }
    };

    const handleAvatarUpload = async options => {
        const url = `${API_ADDRESS}/users/change_avatar/`
        const { file } = options;
        const blob = file.slice(0, file.size);
        const newFile = new File([blob], `${userInfo.name}_${userInfo.cpf}_avatar.${file.name.split('.').pop()}`, {type: `${file.type}`});
        const form = new FormData();
        form.append('id', userInfo.id);
        form.append('image', newFile);

        try {
            const { status } = await api.post(url, form);

            if(status === 200){
                options.file.status = 'done';
                navigate(0);
            }

        } catch (error) {
            alert('handleAvatarUpload Error');
            console.error(error);   
        }
    };  

    const [isChangePasswordModalOpen, setChangePasswordIsModalOpen] = useState(false);
    const toggleIsChangePasswordModalOpen = () => (setChangePasswordIsModalOpen(!isChangePasswordModalOpen));

    const handleChangePassword = async data => {

        // TODO: not use new FormData().

        const url = `${API_ADDRESS}/users/change_password/`;
        const form = new FormData();
        form.append('id', userInfo.id);
        form.append('password', data.password)

        try {
            const { status } = await api.post(url, form);
            if( status === 200 ){
                setChangePasswordIsModalOpen(false);
                Notification('Success', NOTIFICATION_DESCRIPTION.successChangePassword);          
            }
        } catch (error) {
            alert('ChangePassword error');
            console.error(error);
        }
    };

    const tabItems = [
        {
          'key': '1',
          'label': 'User Info',
          'children': <UserInfoForm 
                        userInfo={userInfo} 
                        handleAvatarUpload={handleAvatarUpload}
                        handleChangePassword={handleChangePassword}
                        handleEditUser={form => handleEditUser(form)}
                        handleDeleteUser={() => handleDeleteUser()}
                        isChangePasswordModalOpen={isChangePasswordModalOpen} 
                        toggleIsChangePasswordModalOpen={() => toggleIsChangePasswordModalOpen()}
                    />
        },
        {
            'key': '2',
            'label': 'Routines',
            'children': <RoutineInfo userInfo={userInfo}/>
        }
    ]

    useEffect(() => {
        handleGetUserInfo();
    }, [userUrl]);

    return (
        <div>
            <AppBreadcrumb items={['User', 'Info']}/>
            <Tabs defaultActiveKey='1' items={tabItems}/>
        </div>
    )
}

export default UserInfo;