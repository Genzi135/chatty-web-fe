// components/Register.js
import React from 'react';
import axios from 'axios';
import { BASE_URL } from '../../../data/DUMMY_DATA';
import DateInput from '../../../component/DateInput';
import { COLORS } from '../../../utils/COLORS';
import { BsEye, BsEyeSlash, BsXLg } from 'react-icons/bs';
import NotificationForm from '../../../component/NotiForm';
import { useDispatch } from 'react-redux';
import { setLogOut, setLogin, setUser } from '../../../hooks/redux/reducer';

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

    const [notiType, setNotiType] = React.useState('');

    const [isNoti, setNoti] = React.useState(false);

    const [loading, setLoading] = React.useState(false);

    const [showPassword, setShowPassword] = React.useState(false);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const [showPasswordC, setShowPasswordC] = React.useState(false);
    const toggleShowPasswordC = () => {
        setShowPasswordC(!showPasswordC);
    };

    const dispatch = useDispatch();

    const handlePhoneChange = (e) => {
        const input = e.target.value;
        const regex = /^[0-9]*$/;
        if (regex.test(input)) {
            setPhone(input);
        } else {
            setReport("Please enter only numbers.");
        }

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

    const handleContinue = () => {
        const isValid = handleCheckConfirm();
        if (isValid === true) {
            document.getElementById("registerModal").showModal();
            setReport('')
        } else {
            console.log('Fail')
        }
    }

    const handleCheckConfirm = () => {
        if (phone === '') {
            setReport('Phone must not be empty');
            return false;
        } if (phone.length < 10 || phone.length > 10) {
            setReport('Phone must be 10 character');
            return false;
        } else if (password === '') {
            setReport('Password must not be empty');
            return false;
        } else if (confirm === '') {
            setReport('Confirm password must not be empty');
            return false;
        } else if (password.length < 6 && confirm.length < 6) {
            setReport('Password must be at least 6 characters long');
            return false;
        } else if (password !== confirm) {
            setReport("Password are not the same!");
            return false;
        }
        else {
            return true;
        }
    }

    const setLoginIn = async () => {
        let userToken = JSON.parse(localStorage.getItem("userToken"));
        if (!userToken) {
            dispatch(setLogOut());
            return;
        }
        try {
            const respone = await axios({
                url: BASE_URL + "/api/v1/users/getMe",
                method: 'get',
                headers: { Authorization: `Bearer ${userToken}` },
            });
            dispatch(setUser(respone.data.data));
            dispatch(setLogin());
        } catch (error) {
            console.log(error);
            dispatch(setLogOut());
        }
    }

    const handleRegister = async () => {
        setLoading(true)
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
            setNotiType(response.data.status)
            setNoti(true)
            setTimeout(async () => {
                setNoti(false);
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
                    setLoginIn();
                } catch (error) {
                    console.log(error)
                    setReport(error.response.data.message)
                }

                setLoading(false)
            }, 2000);
        } catch (error) {
            setLoading(false)
            setReport(error.response.data.message)
        }
        setLoading(false)
    }

    return (

        <div className='card w-96 bg-white shadow-2xl'>
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
                    <div style={{ position: 'relative' }}>
                        <div className='label'>
                            <span className='label-text' style={{ color: 'black' }}>Password</span>
                        </div>
                        <input
                            className='input input-bordered w-full bg-white'
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={handlePasswordChange}
                        />

                        {showPassword ? <div
                            style={{ position: 'absolute', right: '10px', top: 60, transform: 'translateY(-50%)' }}
                            onClick={toggleShowPassword}><BsEye /></div> : <div
                                style={{ position: 'absolute', right: '10px', top: 60, transform: 'translateY(-50%)' }}
                                onClick={toggleShowPassword}><BsEyeSlash /></div>}

                    </div>
                </div>
                <div>
                    <div
                        style={{ position: 'relative' }}>
                        <div className='label'>
                            <span className='label-text' style={{ color: 'black' }}>Confirm password</span>
                        </div>
                        <input
                            className='input input-bordered w-full bg-white'
                            type={showPasswordC ? 'text' : 'password'}
                            value={confirm}
                            onChange={handleConfirmChange}
                        />

                        {showPasswordC ? <div

                            style={{ position: 'absolute', right: '10px', top: 60, transform: 'translateY(-50%)' }}
                            onClick={toggleShowPasswordC}><BsEye /></div> : <div
                                style={{ position: 'absolute', right: '10px', top: 60, transform: 'translateY(-50%)' }}
                                onClick={toggleShowPasswordC}><BsEyeSlash /></div>}

                    </div>
                </div>
                <span className='label-text' style={{ color: 'red', fontSize: 13 }}>{report}</span>


                <div className='label form-control'>
                    <button className='btn btn-primary w-32 text-white font-bold'
                        onClick={handleContinue}>CONTINUE</button>
                </div>

                <dialog id='registerModal'>
                    <div className='w-96 bg-white shadow-2xl'>
                        <div className='card-body' style={{ gap: 20 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', zIndex: 555 }}>
                                <h1 style={{ fontWeight: '500', color: 'black', fontSize: 20 }}>Your information</h1>
                                <form method="dialog" className="modal-backdrop" style={{ borderRightColor: 'red' }} >
                                    <button
                                        className=" hover:bg-gray-200"
                                        style={{ width: 35, height: 35, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 30, }}>
                                        <BsXLg size={25} color={COLORS.text} />
                                    </button>
                                </form>
                            </div>
                            <div>
                                <span className='label-text' style={{ color: 'black' }}>Email</span>
                                <input className='input input-bordered w-full bg-white text-black'
                                    value={email}
                                    onChange={handleEmailChange}
                                />
                            </div>
                            <div >
                                <span className='label-text' style={{ color: 'black' }}>Name</span>
                                <input className='input input-bordered w-full bg-white text-black'
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
                            <span className='label-text' style={{ color: 'red', fontSize: 13 }}>{report}</span>

                            <div className='label form-control'>
                                <button className='btn btn-primary w-32  text-white font-bold'
                                    onClick={handleRegister}>
                                    {loading ? <div>
                                        <span className="loading loading-dots loading-sm"></span>
                                    </div> : <div>
                                        LOGIN
                                    </div>}
                                </button>
                            </div>
                        </div>
                    </div>
                </dialog>
            </div>
            <NotificationForm isOpen={isNoti} type={notiType} />
        </div>

    );
}

export default Register;
