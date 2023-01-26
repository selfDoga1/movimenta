import { UserOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom'

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const siderMenuItems = [
    getItem("User", "sub1", <UserOutlined />, [
        getItem(<Link to='/users/search'>Search</Link>, "1", <SearchOutlined />), 
        getItem(<Link to='/users/add'>Add</Link>, "2", <PlusOutlined />), 
    ]),
];

export { siderMenuItems };