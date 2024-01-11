import React from "react";
import Login from "./component/Login";
import Register from "./component/Register";

export default function AuthScreen() {
    const [currentPage, setCurrentPage] = React.useState('login');

    const handleLogin = () => {
        setCurrentPage('login');
    };

    const handleRegister = () => {
        setCurrentPage('register');
    };
    return (<>

        {currentPage === 'login' && <Login onRegisterClick={handleRegister} />}
        {currentPage === 'register' && <Register onLoginClick={handleLogin} />}
    </>)
}