/* eslint-disable no-unused-vars */
import { BsCamera, BsChevronLeft, BsXLg } from "react-icons/bs";
import { COLORS } from "../../../../utils/COLORS";
import { CiEdit } from "react-icons/ci";
import axios from "axios";
import { BASE_URL } from "../../../../data/DUMMY_DATA";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../../hooks/redux/reducer";
import { redirect } from "react-router-dom";

const ProfileModal = () => {

    // eslint-disable-next-line no-unused-vars
    const [viewState, setViewState] = React.useState('Profile');
    const userData = useSelector(state => state.user)
    const [date, setDate] = React.useState('');
    //const [data, setData] = React.useState(userData);
    const [name, setName] = React.useState('');
    const [days, setDay] = React.useState('');
    const [months, setMonths] = React.useState('');
    const [years, setYear] = React.useState('');
    const [gender, setGender] = React.useState(userData.gender);
    const [reportStt, setReportStt] = React.useState('');
    const [avatar, setAvatar] = React.useState(null);
    const [inputAva, setInputAva] = React.useState(null);

    const userToken = JSON.parse(localStorage.getItem("userToken"))

    const dispatch = useDispatch()

    const getData = async () => {
        const respone = await axios({
            url: BASE_URL + "/api/v1/users/getMe",
            method: 'get',
            headers: { Authorization: `Bearer ${userToken}` },
        })
        //setData(respone.data.data);
        dispatch(setUser(respone.data.data))
    }

    const formatDateString = () => {
        const date = new Date(userData.dateOfBirth);
        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;
        const formattedDate = `${year}-${month}-${day}`;
        setDate(formattedDate);
    };

    const handleConfirm = async () => {
        console.log(name, `${years}-${months}-${days}`)

        try {
            const respone = await axios({
                url: BASE_URL + "/api/v1/users/updateMe",
                method: "put",
                type: "application/json",
                headers: { Authorization: `Bearer ${userToken}` },
                data: {
                    name: name,
                    gender: 'male',
                    dateOfBirth: `${years}-${months}-${days}`
                }
            })
            setName('');
            setDay('');
            setMonths('');
            setYear('');
            getData();
            setReportStt('');
            setViewState('Profile');
        } catch (error) {
            console.log(error);
            setReportStt(error.response.data.message)
        }

    }

    const handleUploadAvatar = async () => {
        try {

            const respone = await axios({
                url: BASE_URL + "/api/v1/users/updateAvatar",
                method: "put",
                type: "application/json",
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    'Content-Type': 'multipart/form-data',
                },
                data: { avatar: inputAva },
            })

        } catch (error) {
            console.log(error)
        }
        setAvatar(null)
        setInputAva(null);
        redirect("/dashboard");
    }

    React.useEffect(() => {
        formatDateString();
        setViewState('Profile');
    }, [])

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
                                    <div>{date}</div>
                                    <div>{userData.phone}</div>
                                </div>
                            </div>
                            <div style={{ color: 'gray', fontSize: 12 }}>Just your friend can see your number</div>
                        </div>
                    </div>

                    <div style={{ display: "flex", justifyContent: 'flex-end', alignItems: "center", gap: 20, padding: 20, borderTopWidth: 1 }}>
                        <div style={{ width: '100%' }}>
                            <button
                                onClick={() => setViewState('EditProfile')}
                                className=" hover:bg-gray-300 bg-gray-200"
                                style={{ width: "100%", height: 45, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 5, fontWeight: '500' }}>
                                <CiEdit size={25} />
                                <h1 style={{ color: COLORS.text }}>Update</h1>
                            </button>
                        </div>

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
                    <div>Birthday</div>
                    <div style={{ fontSize: 12, color: 'gray' }}>
                        <div>Please following format dd-MM-yyyy</div>
                        <div>Example: 01-01-1999</div>
                    </div>
                    <div style={{ display: 'flex', gap: 40, justifyContent: 'center', alignItems: 'center' }}>
                        <div>
                            <input style={{ backgroundColor: COLORS.whiteBG, width: 80, height: 30 }} placeholder="Days" onChange={(e) => { setDay(e.target.value) }} value={days} />
                        </div>
                        <div>
                            <input style={{ backgroundColor: COLORS.whiteBG, width: 80, height: 30 }} placeholder="Months" onChange={(e) => { setMonths(e.target.value) }} value={months} />
                        </div>
                        <div>
                            <input style={{ backgroundColor: COLORS.whiteBG, width: 80, height: 30 }} placeholder="Years" onChange={(e) => { setYear(e.target.value) }} value={years} />
                        </div>
                    </div>
                    <div style={{ color: 'red', fontSize: 12 }}>
                        {reportStt}
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: 'flex-end', alignItems: "center", gap: 20, padding: 20, borderTopWidth: 1 }}>
                    <div>
                        <form method="dialog" className="modal-backdrop" style={{ borderRightColor: 'red' }} >
                            <button
                                onClick={() => { setViewState('Profile') }}
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
                            <h1 style={{ fontWeight: '500' }}>Edit your personal information</h1>
                        </div>
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

                <div>
                    <input type="file"
                        id="file"
                        accept="image/png, image/gif, image/jpeg"
                        value={""}
                        onChange={(e) => {
                            setAvatar(URL.createObjectURL(e.target.files[0]));
                            setInputAva(e.target.files[0])
                        }} />
                </div>
                <div>
                    {avatar && (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                            <div style={{ paddingLeft: 20, position: 'relative', width: 'auto', height: 'auto', maxWidth: 200, maxHeight: 200, paddingBottom: 10, paddingTop: 10, }}

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
                                <img src={avatar} style={{ width: 100, height: 100, objectFit: 'contain', borderRadius: 50 }} />
                            </div>
                        </div>
                    )}
                </div>
                <div style={{ display: "flex", justifyContent: 'flex-end', alignItems: "center", gap: 20, padding: 20, borderTopWidth: 1 }}>
                    <div>
                        <form method="dialog" className="modal-backdrop" style={{ borderRightColor: 'red' }} >
                            <button
                                onClick={() => { setViewState('Profile') }}
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
                            <h1 style={{ color: COLORS.whiteBG, fontWeight: '500' }}>Confirm</h1>
                        </button>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default ProfileModal;