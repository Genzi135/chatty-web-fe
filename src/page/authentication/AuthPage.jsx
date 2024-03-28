import React from "react";
import Login from "./component/Login";
import Register from "./component/Register";
import { COLORS } from "../../utils/COLORS";
import ForgotPassword from "./component/ForgotPassword";

export default function AuthScreen() {

    const [currentPage, setCurrentPage] = React.useState('login');

    const handleLogin = () => {
        setCurrentPage('login');
    };

    const handleRegister = () => {
        setCurrentPage('register');
    };

    const handleForgotPassword = () => {
        setCurrentPage('forgotPassword');
    };

    return (<>

        <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.whiteBG }}>
            <div style={{ position: 'relative', zIndex: 2, backgroundColor: COLORS.whiteBG }}>
                {currentPage === 'login' && <Login onRegisterClick={handleRegister} onForgotPasswordClick={handleForgotPassword} />}
                {currentPage === 'register' && <Register onLoginClick={handleLogin} />}
                {currentPage === 'forgotPassword' && <ForgotPassword onLoginClick={handleLogin} />}
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" style={{ position: 'absolute', zIndex: 1, bottom: 0 }}> <path fill="#0099ff" fillOpacity="0.8" d="M0,32L17.1,48C34.3,64,69,96,103,96C137.1,96,171,64,206,58.7C240,53,274,75,309,112C342.9,149,377,203,411,197.3C445.7,192,480,128,514,133.3C548.6,139,583,213,617,229.3C651.4,245,686,203,720,165.3C754.3,128,789,96,823,96C857.1,96,891,128,926,144C960,160,994,160,1029,149.3C1062.9,139,1097,117,1131,112C1165.7,107,1200,117,1234,106.7C1268.6,96,1303,64,1337,48C1371.4,32,1406,32,1423,32L1440,32L1440,320L1422.9,320C1405.7,320,1371,320,1337,320C1302.9,320,1269,320,1234,320C1200,320,1166,320,1131,320C1097.1,320,1063,320,1029,320C994.3,320,960,320,926,320C891.4,320,857,320,823,320C788.6,320,754,320,720,320C685.7,320,651,320,617,320C582.9,320,549,320,514,320C480,320,446,320,411,320C377.1,320,343,320,309,320C274.3,320,240,320,206,320C171.4,320,137,320,103,320C68.6,320,34,320,17,320L0,320Z"></path></svg>
        </div>
    </>)
}