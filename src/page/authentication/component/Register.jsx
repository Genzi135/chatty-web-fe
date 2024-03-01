// components/Register.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DUMMY_DATA, { BASE_URL } from '../../../data/DUMMY_DATA';

// eslint-disable-next-line react/prop-types
function Register({ onLoginClick }) {
    const [phone, setPhone] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirm, setConfirm] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [name, setName] = React.useState('');
    const [dob, setDob] = React.useState("");
    const [report, setReport] = React.useState('');
    const navigate = useNavigate();

    const data = DUMMY_DATA;

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleConfirmChange = (e) => {
        setConfirm(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleDobChange = (e) => {
        setDob(e.target.value);
    }

    const handleRegister = async () => {
        if (password === confirm) {
            setReport("");
            console.log("Phone number: " + phone, "Password: " + password)
            data.user.push({
                username: phone,
                password: password,
                remember: false
            })
            const response = await axios({
                url: BASE_URL + "/api/v1/auth/register",
                method: "post",
                data: {
                    name: name,
                    email: email,
                    password: password,
                    phone: phone,
                    dateOfBirth: dob
                }
            })
            console.log(response)
            navigate('/authentication')
        } else {
            const errorMessage = "*Password and password confirm not the same";
            setReport(errorMessage);
            console.log(errorMessage);
        }
    }

    return (
        <div className='card w-96 bg-white shadow-md'>
            <div className='card-body' style={{ gap: 20 }}>
                <h2 className='card-title' style={{ color: 'black', fontSize: 25 }}>Register</h2>
                <div style={{
                    display: 'flex', flexDirection: 'row', gap: 5
                }}>
                    <h4>Do you have an account yet?</h4>
                    <a className='link link-primary underline' onClick={onLoginClick}>Login</a>
                </div>
                <div>
                    <span className='label-text' style={{ color: 'black' }}>Phone</span>
                    <input className='input input-bordered w-full bg-white'
                        value={phone}
                        onChange={handlePhoneChange}
                    />
                </div>
                <div>
                    <span className='label-text' style={{ color: 'black' }}>Email</span>
                    <input className='input input-bordered w-full bg-white'
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>
                <div>
                    <span className='label-text' style={{ color: 'black' }}>Name</span>
                    <input className='input input-bordered w-full bg-white'
                        value={name}
                        onChange={handleNameChange}
                    />
                </div>
                <div>
                    <span className='label-text' style={{ color: 'black' }}>Birthday</span>
                    <input className='input input-bordered w-full bg-white'
                        value={dob}
                        onChange={handleDobChange}
                    />
                </div>
                <div>
                    <div className='label'>
                        <span className='label-text' style={{ color: 'black' }}>Password</span>
                    </div>
                    <input
                        type='password'
                        className='input input-bordered w-full bg-white'
                        value={password}
                        onChange={handlePasswordChange} />
                </div>
                <div>
                    <div className='label'>
                        <span className='label-text' style={{ color: 'black' }}>Confirm password</span>
                    </div>
                    <input
                        type='password'
                        className='input input-bordered w-full bg-white'
                        value={confirm}
                        onChange={handleConfirmChange} />
                </div>
                <span className='label-text' style={{ color: 'red' }}>{report}</span>

                <div className='label form-control'>
                    <button className='btn btn-primary w-32'
                        onClick={handleRegister}>REGISTER</button>
                </div>
            </div>
        </div>
    );
}

export default Register;
