/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { COLORS } from "../../../utils/COLORS";
import { BsCheckCircleFill, BsChevronDoubleRight } from "react-icons/bs";
import axios from "axios";
import { BASE_URL } from "../../../data/DUMMY_DATA";

const ForgotPassword = ({ onLoginClick }) => {
    const [step, setStep] = React.useState('step1');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [OTP, setOTP] = React.useState('');
    const [report, setReport] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [cdBackToLogin, setCDBackToLogin] = React.useState(5);

    const [countdown, setCountdown] = React.useState(300);
    const [isCountingDown, setIsCountingDown] = React.useState(false);

    // const handlePhoneChange = (e) => {
    //     const input = e.target.value;
    //     const regex = /^[0-9]*$/;
    //     if (regex.test(input)) {
    //         setPhone(input);
    //     } else {
    //         setReport("Please enter only numbers.");
    //     }

    // }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handleOTPChange = (e) => {
        setOTP(e.target.value);
    }

    const handleEmailSend = async () => {

        if (email !== '') {

            // try {
            setCountdown(300);
            setIsCountingDown(true);
            setLoading(true)
            //     const response = await axios({
            //         url: BASE_URL + "/api/v1/users/forgetPassword",
            //         method: 'post',
            //         body: { email: email }
            //     })
            //     console.log(response)

            setStep('step2')
            setReport('')
            setLoading(false)
            // } catch (error) {
            //     console.log(error);
            //     setReport(error.response.data.message)
            // }
        } else {
            setReport('Email must not be empty');
        }
    }

    const verifyOTP = async () => {
        if (OTP !== '') {

            // try {
            setLoading(true)
            //     const response = await axios({
            //         url: BASE_URL + "/api/v1/users/verifyForgetPasswordOTP",
            //         method: 'post',
            //         body: {
            //             email: email,
            //             opt: OTP
            //         }
            //     })
            //     console.log(response)
            setStep('step3')
            setReport('')
            // } catch (error) {
            //     console.log(error);
            //     setReport(error.response.data.message)
            // }
            setLoading(false)
        } else {
            setReport('OTP must not be empty');

        }
    }

    const newPasswordSend = async () => {

        if (password !== '') {

            // try {
            setLoading(true)
            //     const response = await axios({
            //         url: BASE_URL + "/api/v1/users/verifyForgetPasswordOTP",
            //         method: 'post',
            //         body: {
            //             email: email,
            //             opt: OTP
            //         }
            //     })
            //     console.log(response)
            setStep('done')
            setReport('')
            onDoneClick();
            // } catch (error) {
            //     console.log(error);
            //     setReport(error.response.data.message)
            // }

            setLoading(false)
        } else {
            setReport('Password must not be empty');
        }

    }

    const onDoneClick = () => {
        let countdown = 5;
        const intervalId = setInterval(() => {
            countdown--;
            setCDBackToLogin(countdown);
            if (countdown < 0) {
                clearInterval(intervalId);
                onLoginClick();
            }
        }, 1000);
    }

    React.useEffect(() => {
        if (isCountingDown) {
            const timer = setInterval(() => {
                setCountdown(prevCountdown => prevCountdown - 1);
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [isCountingDown]);

    React.useEffect(() => {
        if (countdown === 0) {
            setIsCountingDown(false);
        }
    }, [countdown]);


    return (
        <div className="card w-96 bg-white shadow-2xl">
            {step === 'step1' && <div className='card-body' style={{ gap: 20 }}>
                <h2 className='card-title' style={{ color: 'black', fontSize: 25 }}>Forgot Password</h2>
                <div className="flex gap-1">
                    <h5>
                        Back to
                    </h5>
                    <h5 style={{ color: COLORS.bg, cursor: 'pointer' }} onClick={() => { onLoginClick() }}>Login</h5>
                    <h5>?</h5>
                </div>
                <div className="flex justify-around items-center">
                    <h5 style={{ color: COLORS.bg, fontWeight: 'bold', borderBottomWidth: 3, borderBottomColor: COLORS.bg }}>Step 1</h5>
                    <BsChevronDoubleRight />
                    <h5 style={{ cursor: 'default' }}>Step 2</h5>
                    <BsChevronDoubleRight />
                    <h5 style={{ cursor: 'default' }}>Step 3</h5>
                    <BsChevronDoubleRight />
                    <h5 style={{ cursor: 'default' }}>Done </h5>
                </div>
                {/* <div>
                    <span className='label-text' style={{ color: 'black' }}>Phone</span>
                    <input className='input input-bordered w-full bg-white'
                        value={phone}
                        onChange={handlePhoneChange}
                    />
                </div> */}
                <div>
                    <span className='label-text' style={{ color: 'black' }}>Email</span>
                    <input className='input input-bordered w-full bg-white text-black'
                        value={email}
                        onChange={handleEmailChange}
                        onKeyDown={(e) => { (e.key === 'Enter') && handleEmailSend() }}
                    />
                </div>
                <span className='label-text' style={{ color: 'red', fontSize: 13 }}>{report}</span>
                <div className='label form-control'>
                    <button className='btn btn-primary w-32  text-white font-bold'
                        onClick={() => { handleEmailSend() }}>
                        {loading ? <div>
                            <span className="loading loading-dots loading-sm"></span>
                        </div> : <div>
                            CONTINUE
                        </div>}
                    </button>
                </div>
            </div>}

            {step === 'step2' && <div className='card-body' style={{ gap: 20 }}>
                <h2 className='card-title' style={{ color: 'black', fontSize: 25 }}>Forgot Password</h2>
                <div className="flex gap-1">
                    <h5>
                        Back to
                    </h5>
                    <h5 style={{ color: COLORS.bg, cursor: 'pointer' }} onClick={() => { onLoginClick() }}>Login</h5>
                    <h5>?</h5>
                </div>


                <div>
                    <span className='label-text' style={{ color: 'grey', fontSize: 13 }}>OPT has been send to {email}</span>
                    <br />
                    <span className='label-text' style={{ color: 'grey', fontSize: 13 }}>reset in {countdown} s</span>
                </div>
                <div className="flex justify-around items-center">
                    <h5
                        onClick={() => setStep('step1')}
                        style={{ color: COLORS.success, fontWeight: 'bold', borderBottomWidth: 3, borderBottomColor: COLORS.success, cursor: 'pointer' }}>Step 1</h5>
                    <BsChevronDoubleRight color={COLORS.success} />
                    <h5 style={{ color: COLORS.bg, fontWeight: 'bold', borderBottomWidth: 3, borderBottomColor: COLORS.bg, cursor: 'default' }}>Step 2</h5>
                    <BsChevronDoubleRight />
                    <h5 style={{ cursor: 'default' }}>Step 3</h5>
                    <BsChevronDoubleRight />
                    <h5 style={{ cursor: 'default' }}>Done </h5>
                </div>
                <div >
                    <span className='label-text' style={{ color: 'black', }}>OTP</span>
                    <div className="flex justify-center items-center gap-5">
                        <input className='input input-bordered w-full bg-white text-black'
                            value={OTP}
                            onChange={handleOTPChange}
                        />
                        <button
                            onClick={() => handleEmailSend()}
                            disabled={isCountingDown}
                            className="btn btn-primary w-24 text-white">Get OTP</button>
                    </div>
                </div>
                <span className='label-text' style={{ color: 'red', fontSize: 13 }}>{report}</span>
                <div className='label form-control'>
                    <button className='btn btn-primary w-32  text-white font-bold'
                        onClick={() => { verifyOTP() }}>
                        {loading ? <div>
                            <span className="loading loading-dots loading-sm"></span>
                        </div> : <div>
                            CONTINUE
                        </div>}
                    </button>
                </div>
            </div>}

            {step === 'step3' && <div className='card-body' style={{ gap: 20 }}>
                <h2 className='card-title' style={{ color: 'black', fontSize: 25 }}>Forgot Password</h2>
                <div className="flex gap-1">
                    <h5>
                        Back to
                    </h5>
                    <h5 style={{ color: COLORS.bg, cursor: 'pointer' }} onClick={() => { onLoginClick() }}>Login</h5>
                    <h5>?</h5>
                </div>
                <div className="flex justify-around items-center">
                    <h5 style={{ color: COLORS.success, fontWeight: 'bold', borderBottomWidth: 3, borderBottomColor: COLORS.success, cursor: 'pointer' }}>Step 1</h5>
                    <BsChevronDoubleRight color={COLORS.success} />
                    <h5 style={{ color: COLORS.success, fontWeight: 'bold', borderBottomWidth: 3, borderBottomColor: COLORS.success, cursor: 'pointer' }}>Step 2</h5>
                    <BsChevronDoubleRight color={COLORS.success} />
                    <h5 style={{ color: COLORS.bg, fontWeight: 'bold', borderBottomWidth: 3, borderBottomColor: COLORS.bg, cursor: 'default' }}>Step 3</h5>
                    <BsChevronDoubleRight />
                    <h5 style={{ cursor: 'default' }}>Done </h5>
                </div>
                <div>
                    <span className='label-text' style={{ color: 'black' }}>New Password</span>
                    <input type="password" className='input input-bordered w-full bg-white text-black'
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <span className='label-text' style={{ color: 'red', fontSize: 13 }}>{report}</span>
                <div className='label form-control'>
                    <button className='btn btn-primary w-32  text-white font-bold'
                        onClick={() => { newPasswordSend() }}>
                        {loading ? <div>
                            <span className="loading loading-dots loading-sm"></span>
                        </div> : <div>
                            CONTINUE
                        </div>}
                    </button>
                </div>
            </div>}
            {step === 'done' && <div className='card-body' style={{ gap: 20 }}>
                <h2 className='card-title' style={{ color: 'black', fontSize: 25 }}>Forgot Password</h2>
                <div className="flex justify-around items-center">
                    <h5 style={{ color: COLORS.success, fontWeight: 'bold', borderBottomWidth: 3, borderBottomColor: COLORS.success, cursor: 'pointer' }}>Step 1</h5>
                    <BsChevronDoubleRight color={COLORS.success} />
                    <h5 style={{ color: COLORS.success, fontWeight: 'bold', borderBottomWidth: 3, borderBottomColor: COLORS.success, cursor: 'pointer' }}>Step 2</h5>
                    <BsChevronDoubleRight color={COLORS.success} />
                    <h5 style={{ color: COLORS.success, fontWeight: 'bold', borderBottomWidth: 3, borderBottomColor: COLORS.success, cursor: 'pointer' }}>Step 3</h5>
                    <BsChevronDoubleRight color={COLORS.success} />
                    <h5 style={{ color: COLORS.success, fontWeight: 'bold', borderBottomWidth: 3, borderBottomColor: COLORS.success, cursor: 'default' }}>Done </h5>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <BsCheckCircleFill size={30} color={COLORS.success} />
                    <div style={{ fontSize: 15, color: COLORS.success, fontWeight: COLORS.success }}>
                        Success
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    <div className="flex gap-1">
                        <h5>
                            Back to
                        </h5>
                        <h5 style={{ color: COLORS.bg, cursor: 'pointer' }} onClick={() => { onLoginClick() }}>Login</h5>
                        <h5> in {cdBackToLogin}s</h5>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default ForgotPassword;
