/* eslint-disable no-unused-vars */
import { BsCamera, BsChevronLeft, BsEye, BsEyeSlash, BsXLg } from "react-icons/bs";
import { COLORS } from "../../../../utils/COLORS";
import { CiEdit } from "react-icons/ci";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "../../../../data/DUMMY_DATA";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../../hooks/redux/reducer";
import DateInput from "../../../../component/DateInput";
import NotificationForm from "../../../../component/NotiForm";

const ProfileModal = () => {

    let userDatas = useSelector(state => state.user);
    const [userData, setUserData] = React.useState(userDatas);
    // eslint-disable-next-line no-unused-vars
    const [viewState, setViewState] = React.useState('Profile');
    const [name, setName] = React.useState(`${userData.name}`);
    const [dateOfBirth, setDateOfBirth] = React.useState('');
    const [gender, setGender] = React.useState(userData.gender);
    const [reportStt, setReportStt] = React.useState('');
    const [avatar, setAvatar] = React.useState(null);
    const [inputAva, setInputAva] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [report, setReport] = React.useState('');

    const [password, setPassword] = React.useState('');
    const [confirm, setConfirm] = React.useState('');
    const [reportPass, setReportPass] = React.useState('');

    const [noti, setNoti] = React.useState(false);
    const [notiType, setNotiType] = React.useState('');

    const userToken = JSON.parse(localStorage.getItem("userToken"))
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleConfirmChange = (e) => {
        setConfirm(e.target.value);
    }
    const [showPassword, setShowPassword] = React.useState(false);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const [showPasswordC, setShowPasswordC] = React.useState(false);
    const toggleShowPasswordC = () => {
        setShowPasswordC(!showPasswordC);
    };


    const dispatch = useDispatch()

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        return `${day}/${month}/${year}`;
    }

    const getData = async () => {
        const respone = await axios({
            url: BASE_URL + "/api/v1/users/getMe",
            method: 'get',
            headers: { Authorization: `Bearer ${userToken}` },
        })
        dispatch(setUser(respone.data.data))
    }

    const handleDateChange = (e) => {
        setDateOfBirth(e);
    }

    const handleConfirm = async () => {
        console.log(dateOfBirth)
        setLoading(true)
        try {
            const respone = await axios({
                url: BASE_URL + "/api/v1/users/updateMe",
                method: "put",
                type: "application/json",
                headers: { Authorization: `Bearer ${userToken}` },
                data: {
                    name: name,
                    gender: gender,
                    dateOfBirth: dateOfBirth
                }
            })
            setName(`${respone.data.data.name}`);
            setDateOfBirth('');
            setReportStt('');
            getData();
            setViewState('Profile');
        } catch (error) {
            console.log(error);
            setReportStt(error.response.data.message)
        }
        setLoading(false);

    }

    const handleUploadAvatar = async () => {
        setLoading(true)
        const u = localStorage.getItem("userToken");
        console.log(u)
        console.log(avatar)
        console.log(inputAva)
        try {
            const url = BASE_URL + "/api/v1/users/updateAvatar";
            const response = await axios({
                url: BASE_URL + "/api/v1/users/updateAvatar",
                method: "put",
                type: "application/json",
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    'Content-Type': 'multipart/form-data',
                },
                data: { avatar: inputAva },
            })
            console.log(response)

            // const response = await fetch((url), {
            //     method: 'PUT',
            //     mode: 'cors',
            //     headers: {
            //         Authorization: `Bearer ${userToken}`,
            //         'Content-Type': 'multipart/form-data',
            //     },
            //     data: { avatar: inputAva }
            // })

            // console.log(response.json())
            setLoading(false)
            setAvatar(null)
            setInputAva(null);
            getData();
            setViewState('Profile')
        } catch (error) {
            console.error(error);
            if (error.message === 'Network Error') {
                setReport('Unable to change your image. Please check your network connection.');
            } else {
                console.log("error")
            }
            setLoading(false)

        }
    }



    const onCloseModal = () => {

        setViewState('Profile')
        document.getElementById("profileModal").close()
    }

    React.useEffect(() => {
        setUserData(userDatas)
    }, [userDatas])

    const handleChangePassword = async () => {
        const email = userDatas.email
        if (password === '') {
            setReportPass('Password must not be empty')
        } else if (confirm === '') {
            setReportPass('Password confirm must not be empty')
        } else if (password !== confirm) {
            setReportPass('Password and password confirm is not the same');
        } else if (password.length < 6) {
            setReportPass('Password must be as least 6 characters');
        } else if (confirm.length < 6) {
            setReportPass('Password confirm must be as least 6 characters');
        } else {
            try {
                setLoading(true);
                const response = await axios({
                    url: BASE_URL + "/api/v1/users/resetPassword",
                    method: 'post',
                    data: {
                        email: email,
                        password: password
                    }
                })
                console.log(response)
                setNoti(true)
                setTimeout(() => {
                    setNotiType(response.data.status)
                    setNoti(false);
                    setViewState('Profile'); setPassword(''); setConfirm(''); setReportPass('');
                }, 1000);

            } catch (error) {
                console.log(error);
                setReport(error.response.data.message)
            }
            setLoading(false)

        }
    }

    return (
        <>
            {viewState === 'Profile' && (
                <div style={{ width: 400, backgroundColor: 'white', maxHeight: "80%", borderRadius: 5, color: COLORS.text, display: "flex", flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderBottomWidth: 0.7 }}>
                            <h1 style={{ fontWeight: '500' }}>Profile</h1>
                            <div>
                                <form method="dialog" className="modal-backdrop" style={{ borderRightColor: 'red' }} >
                                    <button
                                        className=" hover:bg-gray-200"
                                        style={{ width: 35, height: 35, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 30, }}>
                                        <BsXLg size={25} color={COLORS.text} />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div style={{ width: '100%', maxHeight: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
                        <div style={{ borderBottomWidth: 5 }}>
                            <img src="https://res.cloudinary.com/diribdgsz/image/upload/v1704685988/chat-app/clone-background_bb1l7i.png" style={{ width: '100%', height: 150, overflow: 'hidden', zIndex: 10, }} />
                            <div className="flex">
                                <div id="avatar" style={{ width: 'auto', height: 100, zIndex: 100, }}>
                                    <div style={{ position: 'absolute', top: 120, left: 20, padding: 1, borderRadius: 50, }}>
                                        <img src={userData.avatar} style={{ width: 80, height: 80, borderRadius: 50 }} />
                                    </div>
                                    <div
                                        onClick={() => setViewState('changeAvatar')}
                                        style={{ position: 'absolute', left: 75, top: 175, width: 30, height: 30, borderRadius: 30 }} className="bg-gray-200 flex justify-center items-center hover:bg-gray-300">
                                        <BsCamera size={20} />

                                    </div>
                                    {/* <input type="file" style={{ position: 'absolute', left: 75, top: 175, width: 30, height: 30, borderRadius: 30, opacity: 0 }} /> */}
                                </div>
                                <div className="flex" style={{ marginLeft: 140, gap: 10 }}>
                                    <h1 style={{ fontSize: 20 }}>
                                        {userData.name}
                                    </h1>
                                    <div
                                        onClick={() => setViewState('EditProfile')}
                                        style={{ marginTop: 4, width: 30, height: 30, borderRadius: 30 }}
                                        className="flex justify-center items-center hover:bg-gray-300"><CiEdit size={20} /></div>
                                </div>
                            </div>


                        </div>
                        <div style={{ padding: 10 }}>

                            <h1 style={{ fontWeight: 'bold' }}>Personal information</h1>

                            <div style={{ marginTop: 10, display: 'flex', gap: 10, fontSize: 14 }}>
                                <div style={{ display: 'flex', flexDirection: "column", gap: 10, color: 'gray' }}>
                                    <div>Gender</div>
                                    <div>Birthday</div>
                                    <div>Phone number</div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: "column", gap: 10 }}>
                                    <div>{userData.gender}</div>
                                    <div>{formatDate(userData.dateOfBirth)}</div>
                                    <div>{userData.phone}</div>
                                </div>
                            </div>
                            <div style={{ color: 'gray', fontSize: 12 }}>Just your friend can see your number</div>
                        </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: 'column', justifyContent: 'flex-end', alignItems: "center", padding: 20, borderTopWidth: 1 }}>
                        <div style={{ width: '100%' }}>
                            <button
                                onClick={() => setViewState('EditProfile')}
                                className=" hover:bg-gray-300 bg-gray-200"
                                style={{ width: "100%", height: 45, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 5, fontWeight: '500' }}>
                                <CiEdit size={25} />
                                <h1 style={{ color: COLORS.text }}>Update</h1>
                            </button>
                        </div>
                        <div><button className="btn btn-link" onClick={() => { setViewState('ChangePassword') }}>Change password</button></div>
                    </div>

                </div>
            )}
            {viewState === 'EditProfile' && (<div style={{ width: 400, backgroundColor: 'white', maxHeight: "80%", borderRadius: 5, color: COLORS.text, display: "flex", flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderBottomWidth: 0.7 }}>
                        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <div style={{ width: 35, height: 35, borderRadius: 30, display: 'flex', gap: 10, justifyContent: 'center', alignItems: 'center' }} className="hover:bg-gray-300">
                                <BsChevronLeft size={25} onClick={() => { setViewState('Profile') }} />
                            </div>
                            <h1 style={{ fontWeight: '500' }}>Edit your personal information</h1>
                        </div>
                        <div>
                            <button
                                onClick={() => { onCloseModal() }}
                                className=" hover:bg-gray-200"
                                style={{ width: 35, height: 35, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 30, }}>
                                <BsXLg size={25} color={COLORS.text} />
                            </button>
                        </div>
                    </div>
                </div>

                <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 10, padding: 10 }}>
                    <div>
                        <h1>
                            Display name
                        </h1>
                        <input style={{ width: '100%', height: 40, borderRadius: 10, backgroundColor: COLORS.whiteBG, padding: 10 }} placeholder={`${userData.name}`} onChange={(e) => { setName(e.target.value) }} value={name} />
                    </div>
                    <h1>
                        Gender
                    </h1>
                    <form style={{ display: 'flex', gap: 30, alignItems: 'center' }}>
                        <div>
                            <label>
                                <input type="radio" value={'male'} checked={gender === 'male'} onChange={() => setGender('male')} />
                                Male
                            </label>
                        </div>
                        <div>
                            <label>
                                <input type="radio" value={'female'} checked={gender === 'female'} onChange={() => setGender('female')} />
                                Female
                            </label>
                        </div>
                    </form>
                    <DateInput onDateChange={handleDateChange} />
                    <div style={{ color: 'red', fontSize: 12 }}>
                        {reportStt}
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: 'flex-end', alignItems: "center", gap: 20, padding: 20, borderTopWidth: 1 }}>
                    <div>
                        <form method="dialog" className="modal-backdrop" style={{ borderRightColor: 'red' }} >
                            <button
                                onClick={() => { setViewState('Profile'); setName(''), setDateOfBirth('') }}
                                className=" hover:bg-gray-300 bg-gray-200"
                                style={{ width: 100, height: 45, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 5, fontWeight: '500' }}>
                                <h1 style={{ color: COLORS.text }}>Cancel</h1>
                            </button>
                        </form>
                    </div>
                    <div>
                        <button
                            onClick={() => { handleConfirm() }}
                            className="hover:bg-blue-700 bg-blue-600"
                            style={{ width: 100, height: 45, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 5, }}>
                            <h1 style={{ color: COLORS.whiteBG, fontWeight: '500' }}>Confirm</h1>
                        </button>
                    </div>
                </div>

            </div>)
            }
            {viewState === 'changeAvatar' && <div style={{ width: 400, backgroundColor: 'white', maxHeight: "80%", borderRadius: 5, color: COLORS.text, display: "flex", flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderBottomWidth: 0.7 }}>
                        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <div style={{ width: 35, height: 35, borderRadius: 30, display: 'flex', gap: 10, justifyContent: 'center', alignItems: 'center' }} className="hover:bg-gray-300">
                                <BsChevronLeft size={25} onClick={() => { setViewState('Profile') }} />
                            </div>
                            <h1 style={{ fontWeight: '500' }}>Edit your profile image</h1>
                        </div>
                        <div>
                            <button
                                onClick={() => { onCloseModal() }}
                                className=" hover:bg-gray-200"
                                style={{ width: 35, height: 35, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 30, }}>
                                <BsXLg size={25} color={COLORS.text} />
                            </button>

                        </div>
                    </div>
                </div>

                <div className="flex justify-center items-center" style={{ padding: 10 }}>
                    <input type="file"
                        id="file"
                        accept="image/png, image/gif, image/jpeg"
                        value={""}
                        style={{ position: 'absolute', overflow: 'hidden', zIndex: 11, width: 130, height: 50, cursor: 'pointer', opacity: 0 }}
                        onChange={(e) => {
                            setAvatar(URL.createObjectURL(e.target.files[0]));
                            setInputAva(e.target.files[0])
                        }} />
                    <label className='btn bg-blue-600  text-white ' style={{ zIndex: 10, fontWeight: '500', fontSize: 15 }}>
                        Choose image
                    </label>
                </div>

                <div>
                    {avatar && (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                            <div style={{ paddingLeft: 20, position: 'relative', width: 'auto', height: 'auto', maxWidth: 200, maxHeight: 200, padding: 10 }}
                            >
                                <span style={{
                                    position: 'absolute',
                                    top: 5,
                                    right: 5,
                                    zIndex: 100,
                                    backgroundColor: COLORS.whiteBG,
                                    borderRadius: '50%',
                                    cursor: 'pointer',
                                }}
                                    onClick={() => setAvatar(null)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18 18 6M6 6l12 12"
                                        />
                                    </svg>
                                </span>
                                <div className="avatar">
                                    <div className="w-24 rounded-full">
                                        <img src={avatar} alt="avatar" style={{ width: 100, height: 100, objectFit: 'contain', borderRadius: 50 }} />
                                    </div>

                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div
                    className="flex justify-center items-center"
                    style={{ color: 'red', fontSize: 12 }}>
                    {report}
                </div>
                <div style={{ display: "flex", justifyContent: 'flex-end', alignItems: "center", gap: 20, padding: 20, borderTopWidth: 1 }}>
                    <div>
                        <form method="dialog" className="modal-backdrop" style={{ borderRightColor: 'red' }} >
                            <button
                                onClick={() => { setViewState('Profile'); setAvatar('') }}
                                className=" hover:bg-gray-300 bg-gray-200"
                                style={{ width: 100, height: 45, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 5, fontWeight: '500' }}>
                                <h1 style={{ color: COLORS.text }}>Cancel</h1>
                            </button>
                        </form>
                    </div>
                    <div>
                        <button
                            onClick={() => { handleUploadAvatar() }}
                            className="hover:bg-blue-700 bg-blue-600"
                            style={{ width: 100, height: 45, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 5, }}>
                            <h1 style={{ color: COLORS.whiteBG, fontWeight: '500' }}>{loading ? <div>
                                <span className="loading loading-dots loading-sm"></span>
                            </div> : <div>
                                Confirm
                            </div>}</h1>
                        </button>
                    </div>
                </div>
            </div>}
            {viewState === 'ChangePassword' && <div style={{ width: 400, backgroundColor: 'white', maxHeight: "80%", borderRadius: 5, color: COLORS.text, display: "flex", flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderBottomWidth: 0.7 }}>
                        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <div style={{ width: 35, height: 35, borderRadius: 30, display: 'flex', gap: 10, justifyContent: 'center', alignItems: 'center' }} className="hover:bg-gray-300">
                                <BsChevronLeft size={25} onClick={() => { setViewState('Profile') }} />
                            </div>
                            <h1 style={{ fontWeight: '500' }}>Edit your personal information</h1>
                        </div>
                        <div>
                            <button
                                onClick={() => { onCloseModal() }}
                                className=" hover:bg-gray-200"
                                style={{ width: 35, height: 35, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 30, }}>
                                <BsXLg size={25} color={COLORS.text} />
                            </button>
                        </div>
                    </div>
                </div>

                <form>
                    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 10, padding: 10 }}>
                        {/* <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: 10 }}>
                            <h1>
                                New password
                            </h1>
                            <input
                                type="password"
                                className="input input-bordered"
                                style={{ width: '100%', height: 40, borderRadius: 10, backgroundColor: COLORS.whiteBG, padding: 10 }} onChange={(e) => { setPassword(e.target.value) }} value={pwd} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: 10 }}>
                            <h1>
                                Confirm new password
                            </h1>
                            <input
                                type="password"
                                className="input input-bordered"
                                style={{ width: '100%', height: 40, borderRadius: 10, backgroundColor: COLORS.whiteBG, padding: 10 }} onChange={(e) => { setConfirm(e.target.value) }} value={confirm} />
                        </div> */}

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

                                    style={{ position: 'absolute', right: '10px', top: 60, transform: 'translateY(-50%)', width: 30, height: 30 }}
                                    onClick={toggleShowPasswordC}><BsEye /></div> : <div
                                        style={{ position: 'absolute', right: '10px', top: 60, transform: 'translateY(-50%)' }}
                                        onClick={toggleShowPasswordC}><BsEyeSlash /></div>}

                            </div>
                        </div>
                        <div style={{ color: 'red', fontSize: 12 }}>
                            {reportPass}
                        </div>
                    </div>
                </form>
                <div style={{ display: "flex", justifyContent: 'flex-end', alignItems: "center", gap: 20, padding: 20, borderTopWidth: 1 }}>
                    <div>
                        <form method="dialog" className="modal-backdrop" style={{ borderRightColor: 'red' }} >
                            <button
                                onClick={() => { setPassword(''); setConfirm(''); setReportPass(''); setLoading(false); setViewState('Profile'); }}
                                className=" hover:bg-gray-300 bg-gray-200"
                                style={{ width: 100, height: 45, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 5, fontWeight: '500' }}>
                                <h1 style={{ color: COLORS.text }}>Cancel</h1>
                            </button>
                        </form>
                    </div>
                    <div>
                        <button
                            onClick={() => { handleChangePassword() }}
                            className="hover:bg-blue-700 bg-blue-600"
                            style={{ width: 100, height: 45, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 5, }}>
                            <h1 style={{ color: COLORS.whiteBG, fontWeight: '500' }}>{loading ? <div>
                                <span className="loading loading-dots loading-sm"></span>
                            </div> : <div>
                                Confirm
                            </div>}</h1>
                        </button>
                    </div>
                </div>

            </div>}
            <NotificationForm isOpen={noti} type={notiType} />
        </>
    )
}

export default ProfileModal;