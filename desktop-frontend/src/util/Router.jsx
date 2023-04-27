import { createBrowserRouter } from "react-router-dom";
import PrivateRouter, { PrivateLoginRouter } from '../util/PrivateRouter'
import Layout from '../components/Layout'
import { AddUserForm } from '../components/forms/Forms'
import { UserTable } from '../components/tables/Tables'
import { UserInfo } from '../components/info/Info'


const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRouter element={<Layout />} />,
    children:[
      {
        path: '/users/add',
        element: <AddUserForm />,
      },
      {
        path: '/users/search',
        element: <UserTable />,
      },
      {
        path: '/users/:userId',
        element: <UserInfo />,
      },
    ]
  },
  {
    path: '/login',
    element: <PrivateLoginRouter />,
  },
]);


export default router;
