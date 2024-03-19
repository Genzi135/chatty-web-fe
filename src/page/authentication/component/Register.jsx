// components/Register.js
import React from 'react';
import axios from 'axios';
import { BASE_URL } from '../../../data/DUMMY_DATA';
import DateInput from '../../../component/DateInput';
import { COLORS } from '../../../utils/COLORS';

// eslint-disable-next-line react/prop-types
function Register({ onLoginClick }) {
    const [phone, setPhone] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirm, setConfirm] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [name, setName] = React.useState('');
    const [dob, setDob] = React.useState("");
    const [gender, setGender] = React.useState('male');
    const [report, setReport] = React.useState('');

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
        setDob(e);
    }

    const handleRegister = async () => {
        console.log("dob: ", dob)
        try {
            const response = await axios({
                url: BASE_URL + "/api/v1/auth/register",
                method: "post",
                data: {
                    name: name,
                    email: email,
                    password: password,
                    phone: phone,
                    gender: gender,
                    dateOfBirth: dob
                }
            })
            setPhone('');
            setEmail('');
            setPassword('');
            setConfirm('');
            setName('');
            setGender('male');
            setDob('')
            onLoginClick()

            console.log("dob", dob)
        } catch (error) {
            console.log(error)
            setReport(error.response.data.message)
        }
    }

    return (

        <div className='card w-96 bg-white shadow-md'>
            <div className='card-body' style={{ gap: 10 }}>
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

                <div >
                    <span className='label-text' style={{ color: 'black' }}>Name</span>
                    <input className='input input-bordered w-full bg-white'
                        value={name}
                        onChange={handleNameChange}
                    />
                </div>
                <h1 className='text-black'>
                    Gender
                </h1>
                <form style={{ display: 'flex', gap: 30, alignItems: 'center', color: COLORS.text }}>
                    <div>
                        <label>
                            <input type="radio" value={'Male'} checked={gender === 'male'} onChange={() => setGender('male')} />
                            Male
                        </label>
                    </div>
                    <div>
                        <label>
                            <input type="radio" value={'Female'} checked={gender === 'female'} onChange={() => setGender('female')} />
                            Female
                        </label>
                    </div>
                </form>
                <div>
                    {/* <span className='label-text' style={{ color: 'black' }}>Birthday</span>
                    <input className='input input-bordered w-full bg-white'
                        value={dob}
                        onChange={handleDobChange}
                    /> */}
                    <DateInput onDateChange={handleDobChange} />
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
