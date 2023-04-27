import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Table, Button, Form, Input, Typography } from 'antd';
import Column from 'antd/es/table/Column';
import { API_ADDRESS } from '../../util/DevelopmentSettings';
import useAxios from '../../util/useAxios';
import AppBreadcrumb from '../../util/AppBreadcrumb'

export default function UserListTable() {
    
    let api = useAxios(); 
    const userUrl = `${API_ADDRESS}/users/`;
    const [usersData, setUsersData] = useState([]);
    const navigate = useNavigate();

    function SearchEngine() {
    
        const handleSearchUsers = async (value) => {
    
                try {
                    const { status, data } = await api.get(userUrl + '?search=' + value);
                    
                    if (status === 200){
                        setUsersData(data);
                    };
    
                } catch (error) {
                    alert('Search User Engine Error!');
                    console.log(error);
                }
        };
    
        return (
            <Form layout='horizontal' style={{ width:'100%', justifyContent:"start" }}>
                <Form.Item name='search' label='' style={{width:'100%'}}>
                    <Input.Search onSearch={handleSearchUsers}/>
                </Form.Item>
            </Form>
        );
    }

    const handleGetAllUsers = async () => {
        try {
            
            const response = await api.get(userUrl);

            if (response.status === 200) {
                setUsersData(response.data)
            }

        } catch (error) {
            alert('UserListTable Error!');
            console.log(error);
        }
    };

    const selectUser = (userId) => {
        return(
            <Button type='primary' onClick={() => navigate(`/users/${userId}/`)}>Select</Button>
        );
    };
    
    const MyTable = () => {
      return (
        <Table 
            dataSource={usersData} 
            tableLayout='auto'
            pagination={{ defaultPageSize: 5}}
        >
            <Column title='Name' dataIndex='name' key='name' responsive={['lg']}/>
            <Column title='Cpf' dataIndex='cpf' key='cpf' responsive={['md']}/>
            <Column title='Phone' dataIndex='phone' key='phone' responsive={['md']}/>
            <Column title='E-mail' dataIndex='email' key='email' responsive={['md']}/>
            <Column title='Action' key='action' dataIndex='id' responsive={['md']} render={(dataIndex) => selectUser(dataIndex)}/>
        </Table>
      );
    };
    
    useEffect(() => {
        handleGetAllUsers();
    }, []);

  return (
        <div>
            <AppBreadcrumb items={['User', 'Search']}/>

            <Row style={{marginBottom:10}} >
                <Typography style={{
                    fontFamily:'ubuntu',
                    fontSize:'32px',
                    marginBottom:'5px',
                }}>
                    Search User
                </Typography>

            </Row>
            <Row style={{marginBottom:10}} >
                <SearchEngine />
            </Row>
            <MyTable />
        </div>
  );
}
