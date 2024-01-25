import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import DUMMY_DATA from '../../../data/DUMMY_DATA';

// eslint-disable-next-line react/prop-types
function Login({ onRegisterClick }) {
    const [phone, setPhone] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [rememberMe, setRememberMe] = React.useState(false);

    const data = DUMMY_DATA;

    const navigation = useNavigate();

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleRememberMeChange = () => {
        setRememberMe(!rememberMe);
    };

    const checkRemember = () => {
        data.user.forEach((items) => {
            if (items.remember) {
                setPhone(items.username);
                setPassword(items.password);
                setRememberMe(!rememberMe)
            }
        })
    };

    useEffect(checkRemember, []);

    const handleLogin = () => {
        const user = data.user.find((e) => phone === e.phoneNumber && password === e.password)
        if (user) {
            localStorage.setItem("currentUser", JSON.stringify(user.id));
            navigation("/dashboard");
            console.log(localStorage.getItem("currentUser"));
        }
        console.log('Logging in with phone:', phone, 'and password:', password);
        console.log('Remember me:', rememberMe);
    };

    const keyPressed = (e) => {
        (e.key === 'Enter') && handleLogin()
    }

    return (
        <div className='card w-96 bg-white shadow-md'>
            <div className='card-body' style={{ gap: 20 }}>
                <h2 className='card-title' style={{ color: 'black', fontSize: 25 }}>Login</h2>
                <div style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
                    <h4>Do not have an account yet?</h4>
                    <a className='link link-primary underline' onClick={onRegisterClick}>Sign up</a>
                </div>
                <div>
                    <span className='label-text' style={{ color: 'black' }}>Phone</span>
                    <input
                        className='input input-bordered w-full bg-white'
                        value={phone}
                        onChange={handlePhoneChange}
                        onKeyDown={keyPressed}
                    />
                </div>
                <div>
                    <div className='label'>
                        <span className='label-text' style={{ color: 'black' }}>Password</span>
                        <span className='label-text-alt'>
                            <a className='link link-primary'>Forgot password?</a>
                        </span>
                    </div>
                    <input
                        className='input input-bordered w-full bg-white'
                        type='password'
                        value={password}
                        onChange={handlePasswordChange}
                        onKeyDown={keyPressed}
                    />
                </div>
                <div className='form-control w-32'>
                    <label className='cursor-pointer label'>
                        <input
                            type='checkbox'
                            className='checkbox checkbox-primary'
                            checked={rememberMe}
                            onChange={handleRememberMeChange}
                        />
                        <span className='label-text' style={{ color: 'black' }}>Remember me</span>
                    </label>
                </div>
                <div className='label form-control'>
                    <button className='btn btn-primary w-32' onClick={handleLogin} onKeyDown={keyPressed} tabIndex="0">
                        LOGIN
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
