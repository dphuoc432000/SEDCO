import Login from "../pages/auth/Login/Login";
import Register from "../pages/auth/Register/Register";
import Home from "../pages/Home/Home";

const routes = [
    {
        path: "/auth/register",
        component: Register,
        title: "Register"
    },
    {
        path: "/auth/login",
        component: Login,
        title: "Login"
    },
    {
        path: "/",
        component: Home,
        title: "Home"
    }
];

export default routes;