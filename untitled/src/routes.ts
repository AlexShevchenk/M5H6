
import Home from "./pages/Home";
import User from "./pages/User";
import Resources from "./pages/Resources";
import Resource from "./pages/Resource";


import {FC} from "react";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Logout from "./pages/LogOut";

interface Route {
    key: string,
    title: string,
    path: string,
    enabled: boolean,
    component: FC<{}>
}

export const routes1: Array<Route> = [
    {
        key: 'logout-route',
        title: 'LogOut',
        path: '/logout',
        enabled: true,
        component: Logout
    },

]
export const loginRoute: Array<Route> = [
    {
        key: 'login-route',
        title: 'Login',
        path: '/login',
        enabled: true,
        component: Login
    },
    {
        key: 'register-route',
        title: 'Registration',
        path: '/registration',
        enabled: true,
        component: Registration
    }

]
export const routes: Array<Route> = [
    {
        key: 'home-route',
        title: 'Home',
        path: '/',
        enabled: true,
        component: Home
    },
    {
        key: 'res-route',
        title: 'Resources',
        path: '/resources',
        enabled: true,
        component: Resources
    },
    {
        key: 'resource-route',
        title: 'Resource',
        path: '/resource/:id',
        enabled: false,
        component: Resource
    },
    {
        key: 'user-route',
        title: 'User',
        path: '/user/:id',
        enabled: false,
        component: User
    }
]