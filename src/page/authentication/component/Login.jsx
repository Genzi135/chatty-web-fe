import React, { useEffect } from 'react';
import axios from 'axios';
import DUMMY_DATA, { BASE_URL } from '../../../data/DUMMY_DATA';
import { useDispatch } from 'react-redux';
import { setLogin, setUser } from '../../../hooks/redux/reducer';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

// eslint-disable-next-line react/prop-types
function Login({ onRegisterClick, onForgotPasswordClick }) {
    const [phone, setPhone] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [rememberMe, setRememberMe] = React.useState(false);
    const [report, setReport] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);

    const dispatch = useDispatch();

    const data = DUMMY_DATA;

    // const navigation = useNavigate();

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    // const handleRememberMeChange = () => {
    //     setRememberMe(!rememberMe);
    // };

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

    const handleLogin = async () => {
        setLoading(true);
        try {
            const response = await axios({
                url: BASE_URL + "/api/v1/auth/login",
                method: "post",
                data: {
                    phone: phone,
                    password: password
                }
            })
            if (response.data.status === "success")
                setReport('');
            dispatch(setUser(response.data.data.user))
            localStorage.setItem("userToken", JSON.stringify(response.data.data.token.access_token))
            dispatch(setLogin())
        } catch (error) {
            console.log(error)
            setLoading(false)
            if (error.response.data.message === 'Bad credentials.') {
                setReport('Phone or password is not correct')
            } else {

                setReport(error.response.data.message)
            }

        }

        setLoading(false)
    };

    const keyPressed = (e) => {
        (e.key === 'Enter') && handleLogin()
    }
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='card w-96 bg-white shadow-2xl'>
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
                        <span className='label-text-alt '>
                            <a className='link link-primary' onClick={onForgotPasswordClick}>Forgot password?</a>
                        </span>
                    </div>
                    <div style={{ position: 'relative' }}>
                        <input
                            className='input input-bordered w-full bg-white'
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={handlePasswordChange}
                            onKeyDown={keyPressed}
                        />

                        {showPassword ? <div
                            style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}
                            onClick={toggleShowPassword}><BsEye /></div> : <div
                                style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}
                                onClick={toggleShowPassword}><BsEyeSlash /></div>}

                    </div>
                </div>
                <div>
                    <span style={{ color: 'red', fontSize: 13 }}>{report}</span>
                </div>
                {/* <div className='form-control w-32'>
                    <label className='cursor-pointer label'>
                        <input
                            type='checkbox'
                            className='checkbox checkbox-primary'
                            checked={rememberMe}
                            onChange={handleRememberMeChange}
                        />
                        <span className='label-text' style={{ color: 'black' }}>Remember me</span>
                    </label>
                </div> */}
                <div className='label form-control'>
                    <button className='btn btn-primary w-32 text-white' onClick={handleLogin} onKeyDown={keyPressed} tabIndex="0">
                        {loading ? <div>
                            <span className="loading loading-dots loading-sm"></span>
                        </div> : <div>
                            LOGIN
                        </div>}
                    </button>
                </div>
            </div>

        </div>
    );
}

export default Login;
