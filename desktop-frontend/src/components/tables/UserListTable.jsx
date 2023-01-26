import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { Row, Table, Button, Form, Input, Typography, Breadcrumb } from 'antd';
import Column from 'antd/es/table/Column';
import { HomeOutlined, UserOutlined, SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import AuthContext from '../../context/AuthContext'
import {API_ADDRESS} from '../../util/DevelopmentSettings'

const userUrl = `${API_ADDRESS}/users/`;
const configuration = (authTokens) => {
    const config = {
        headers:{
            'Authorization': 'Bearer ' + authTokens.access,
            }
        };
    return(config);
};

function SearchEngine(props) {

    const handleSearchRequest = async (e) => {

            try {
                const searchUserUrl = userUrl + '?search=' + e.target.value;
                const response = await axios.get(searchUserUrl, configuration(props.authTokens));

                if (response.status === 200){
                    props.setTableUsersData(response.data);
                };

            } catch (error) {
                alert('Search Engine Error!');
                console.log(error);
            }
        
    };

    return (
      <Form layout='horizontal' style={{ width:'100%', justifyContent:"start" }}>
          <Form.Item name='search' label='' style={{width:'100%'}}>
              <Input onChange={handleSearchRequest}/>
          </Form.Item>
      </Form>
    );
}

export default function UserListTable() {
    
    let {authTokens} = useContext(AuthContext);     
    const [tableUsersData, setTableUsersData] = useState([]);
    const navigate = useNavigate();

    const handleGetAllUsersRequest = async () => {
        try {
            
            const response = await axios.get(userUrl, configuration(authTokens));

            if (response.status === 200) {
                setTableUsersData(response.data)
            }

        } catch (error) {
            alert('UserListTable Error!');
            console.log(error);
        }
    };

    const actionRender = (userId) => {
        return(
            <Button type='primary' onClick={() => navigate(`/users/${userId}/`)}>Select</Button>
        );
    };
    
    const MyTable = () => {
      return (
        <Table 
            dataSource={tableUsersData} 
            tableLayout='auto'
            pagination={{ defaultPageSize: 5}}
        >
            <Column title='Name' dataIndex='name' key='name' responsive={['lg']}/>
            <Column title='Cpf' dataIndex='cpf' key='cpf' responsive={['md']}/>
            <Column title='Phone' dataIndex='phone' key='phone' responsive={['md']}/>
            <Column title='E-mail' dataIndex='email' key='email' responsive={['md']}/>
            <Column title='Action' key='action' dataIndex='id' responsive={['md']} render={(dataIndex) => actionRender(dataIndex)}/>
        </Table>
      );
    };

    const MyTableTitle = () => {

        const style = {
            fontFamily:'ubuntu',
            fontSize:'32px',
            marginBottom:'5px',
        }

        return (
            <Typography style={style}>
                Search User
            </Typography>
        );

    }

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
                    <SearchOutlined />
                    <span>Search</span>
                </Breadcrumb.Item>
            </Breadcrumb>
        );
    };
    
    useEffect(() => {
        handleGetAllUsersRequest();
    }, []);

  return (
        <div>
            <MyBreadcrumb />
            <Row style={{marginBottom:10}} >
                <MyTableTitle />
            </Row>
            <Row style={{marginBottom:10}} >
                <SearchEngine authTokens={authTokens} setTableUsersData={setTableUsersData}/>
            </Row>
            <MyTable />
        </div>
  );
}
