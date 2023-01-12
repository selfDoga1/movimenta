import React from "react";
import ReactDOM from "react-dom/client";

import Router from "./util/Router";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from './context/AuthContext'


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    // <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={Router} />
        </AuthProvider>
    // </React.StrictMode>
);
