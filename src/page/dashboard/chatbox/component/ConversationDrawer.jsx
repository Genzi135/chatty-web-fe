
import { BsPinAngle, BsPeople, BsAlarm, BsBell, BsCaretRightFill, BsCaretDownFill, BsSearch, BsXLg, BsXCircle, BsFillPersonPlusFill, BsFillPersonDashFill, BsBoxArrowRight } from "react-icons/bs";
import { COLORS } from "../../../../utils/COLORS";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL } from "../../../../data/DUMMY_DATA";
import axios from 'axios';
import { setConversation, setListConversation, setListMessage } from "../../../../hooks/redux/reducer";
import { CiEdit } from "react-icons/ci";


const ConversationDrawer = () => {
    const [isPhotoVidOpen, setPhotoVidOpen] = React.useState(true);
    const [isFileOpen, setFileOpen] = React.useState(true);
    const [isLinkOpen, setLinkOpen] = React.useState(true);
    const [isPrivateSettingOpen, setPrivateSettingOpen] = React.useState(true);

    const currentConversation = useSelector((state) => state.currentConversation);
    const currentUser = useSelector((state) => state.user)

    const onClose = () => {
        document.getElementById('AddMembersModal').close();
        document.getElementById('RemoveMemberModal').close();
        document.getElementById('RenameModal').close();
        document.getElementById('LeaveGroup').close();
    }

    return (<>
        <div style={{ width: 500, backgroundColor: 'white', borderLeftWidth: 2, display: 'flex', flexDirection: 'column' }}>
            {currentConversation.type === 'group' && <div>
                <div className="flex flex-col justify-center items-center w-full h-56">
                    <div className="avatar">
                        <div className="w-24 h-24 rounded-full avatar">
                            <img src={currentConversation.image} alt="avatar" />
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="text-black text-2xl">{currentConversation.name}</div>
                        <div className="rounded-full hover:bg-gray-300 p-1" onClick={() => document.getElementById("RenameModal").showModal()}>
                            <CiEdit size={25} color='black' />
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex justify-center items-center gap-3">
                        <div onClick={() => { document.getElementById('AddMembersModal').showModal() }}>
                            <button className="btn btn-outline"><BsFillPersonPlusFill size={20} /></button>
                        </div>
                        {currentConversation && currentConversation.leaders.map((e) => (
                            currentUser._id === e._id && (
                                <div key={e._id} onClick={() => { document.getElementById('RemoveMemberModal').showModal() }}>
                                    <button className="btn btn-outline"><BsFillPersonDashFill size={20} /></button>
                                </div>
                            )
                        ))}
                        {currentConversation && currentConversation.leaders.map((e) => (
                            currentUser._id !== e._id && (
                                <div key={e._id} onClick={() => { document.getElementById('LeaveGroup').showModal() }}>
                                    <button className="btn btn-outline btn-error"><BsBoxArrowRight size={20} /></button>
                                </div>
                            )
                        ))}

                    </div>
                </div>
                <div className="p-2">
                    {/* <div>
                        Conversation details:
                    </div>
                    <div>
                        Type: {currentConversation.type}
                    </div> */}
                    {/* <div>
                        Owner: {currentConversation.leaders.map((e) => (<div>{e._id}</div>))}
                    </div> */}
                    <div>
                        Members:
                        <div className="flex flex-col gap-2">
                            {currentConversation.members.map((e, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <div className="avatar">
                                        <div className="w-8 h-8 rounded-full avatar">
                                            <img src={e.avatar} alt="avatar" />
                                        </div>
                                    </div>
                                    <div>
                                        {e.name}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <dialog id='AddMembersModal' className="modal">
                    <AddMembersModel onClose={onClose} />
                </dialog>
                <dialog id="RemoveMemberModal" className="modal">
                    <RemoveMembersModel onClose={onClose} />
                </dialog>
                <dialog id="RenameModal" className="modal">
                    <RenameModal onClose={onClose} />
                </dialog>
                <dialog id="LeaveGroup" className="modal">
                    <LeaveGroup onClose={onClose} />
                </dialog>
            </div>}
            {currentConversation.type === 'private' && <div>
                <div className="flex flex-col justify-center items-center w-full h-56">
                    <div className="avatar">
                        <div className="w-24 h-24 rounded-full avatar">
                            <img src={currentConversation.image} alt="avatar" />
                        </div>
                    </div>
                    <div className="text-black text-2xl">{currentConversation.name}</div>
                </div>
            </div>}

        </div>
    </>)
}

const LeaveGroup = ({ onClose }) => {

    const currentConversation = useSelector((state) => state.currentConversation)
    const userToken = JSON.parse(localStorage.getItem("userToken"));
    const dispatch = useDispatch();

    const getConversation = async () => {
        try {
            const respone = await axios({
                url: BASE_URL + "/api/v1/conservations",
                method: 'get',
                headers: { Authorization: `Bearer ${userToken}` },
            })
            dispatch(setListConversation(respone.data.data))
            respone.data.data.map(e => {
                if (e._id === currentConversation._id) {
                    console.log(e);
                    dispatch(setConversation(e))
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleLeaveGroup = async () => {
        try {
            const response = await axios({
                url: BASE_URL + '/api/v1/conservations/' + `${currentConversation._id}/leaveGroup`,
                method: 'POST',
                headers: { Authorization: `Bearer ${userToken}` },
            });
            console.log(response);
            getConversation()
            dispatch(setConversation({}))
            onClose();
        } catch (error) {
            console.log(error);
        }

    }


    return (
        <div style={{ width: 500, backgroundColor: 'white', height: "auto", borderRadius: 5, color: COLORS.text, display: "flex", flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderBottomWidth: 0.7 }}>
                    <h1 style={{ fontWeight: '500' }}>Leave group</h1>
                    <div>
                        <form method="dialog" className="modal-backdrop" style={{ borderRightColor: 'red' }} >
                            <button
                                className=" hover:bg-gray-200"
                                style={{ width: 35, height: 35, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 30 }}>
                                <BsXLg size={25} color={COLORS.text} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="text-red-500 flex justify-center items-center p-5">
                Do you want to leave this group?
            </div>
            <div style={{ display: "flex", justifyContent: 'flex-end', alignItems: "center", gap: 20, padding: 20, borderTopWidth: 1 }}>
                <div>
                    <form method="dialog" className="modal-backdrop" style={{ borderRightColor: 'red' }} >
                        <button
                            className="hover:bg-gray-300 bg-gray-200"
                            style={{ width: 100, height: 45, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 5, fontWeight: '500' }}>
                            <h1 style={{ color: COLORS.text }}>Cancel</h1>
                        </button>
                    </form>
                </div>
                <div>
                    <button
                        onClick={() => { handleLeaveGroup() }}
                        className="hover:bg-red-700 bg-red-500"
                        style={{ width: 140, height: 45, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                        <h1 style={{ color: COLORS.whiteBG, fontWeight: '500' }}>Leave</h1>
                    </button>
                </div>
            </div>
        </div>
    )
}

const RenameModal = ({ onClose }) => {
    const userToken = JSON.parse(localStorage.getItem("userToken"));
    const user = useSelector((state) => state.user)
    const listConversation = useSelector((state) => state.listConversation)
    const currentConversation = useSelector((state) => state.currentConversation)

    const [loading, setLoading] = useState(false);
    const [listFriend, setListFriend] = useState([]);
    const [selectedFriends, setSelectedFriends] = useState([]);
    const [inputFriend, setInputFriend] = useState([]);

    const [report, setReport] = useState('');


    const dispatch = useDispatch();

    const [text, setText] = useState('');

    const setTextValue = (e) => {
        setText(e.target.value);
    }

    const handleRenameGroup = async () => {
        setLoading(true);
        try {
            const response = await axios({
                url: BASE_URL + '/api/v1/conservations/' + `${currentConversation._id}/changeName`,
                method: 'POST',
                headers: { Authorization: `Bearer ${userToken}` },
                data: { name: text }
            });
            console.log(response);
            getConversation()
            onClose();
        } catch (error) {
            console.log(error);
            setReport(error.response.data.message);
        }

        setLoading(false);

    }


    const getConversation = async () => {
        try {
            const respone = await axios({
                url: BASE_URL + "/api/v1/conservations",
                method: 'get',
                headers: { Authorization: `Bearer ${userToken}` },
            })
            dispatch(setListConversation(respone.data.data))
            respone.data.data.map(e => {
                if (e._id === currentConversation._id) {
                    console.log(e);
                    dispatch(setConversation(e))
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    // useEffect(() => {
    //     console.log(text);
    // }, [text])

    return (
        <div style={{ width: 500, backgroundColor: 'white', height: "auto", borderRadius: 5, color: COLORS.text, display: "flex", flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderBottomWidth: 0.7 }}>
                    <h1 style={{ fontWeight: '500' }}>Rename group</h1>
                    <div>
                        <form method="dialog" className="modal-backdrop" style={{ borderRightColor: 'red' }} >
                            <button
                                className=" hover:bg-gray-200"
                                style={{ width: 35, height: 35, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 30 }}>
                                <BsXLg size={25} color={COLORS.text} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center bg-white p-2 flex-col gap-2">
                <div>
                    Enter new group name
                </div>
                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs bg-white" onChange={(e) => { setTextValue(e) }} />
            </div>
            <div style={{ display: "flex", justifyContent: 'flex-end', alignItems: "center", gap: 20, padding: 20, borderTopWidth: 1 }}>
                <div>
                    <form method="dialog" className="modal-backdrop" style={{ borderRightColor: 'red' }} >
                        <button
                            className="hover:bg-gray-300 bg-gray-200"
                            style={{ width: 100, height: 45, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 5, fontWeight: '500' }}>
                            <h1 style={{ color: COLORS.text }}>Cancel</h1>
                        </button>
                    </form>
                </div>
                <div>
                    <button
                        onClick={() => { handleRenameGroup() }}
                        className="hover:bg-blue-700 bg-blue-600"
                        style={{ width: 140, height: 45, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                        <h1 style={{ color: COLORS.whiteBG, fontWeight: '500' }}>Save</h1>
                    </button>
                </div>
            </div>
        </div>
    )
}

const AddMembersModel = ({ onClose }) => {
    const userToken = JSON.parse(localStorage.getItem("userToken"));
    const user = useSelector((state) => state.user)
    const listConversation = useSelector((state) => state.listConversation)
    const currentConversation = useSelector((state) => state.currentConversation)

    const [loading, setLoading] = useState(false);
    const [listFriend, setListFriend] = useState([]);
    const [selectedFriends, setSelectedFriends] = useState([]);
    const [inputFriend, setInputFriend] = useState([]);

    const [report, setReport] = useState('');


    const dispatch = useDispatch();

    const getConversation = async () => {
        try {
            const respone = await axios({
                url: BASE_URL + "/api/v1/conservations",
                method: 'get',
                headers: { Authorization: `Bearer ${userToken}` },
            })
            dispatch(setListConversation(respone.data.data))
            respone.data.data.map(e => {
                if (e._id === currentConversation._id) {
                    console.log(e);
                    dispatch(setConversation(e))
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    const getMessageByConversation = async () => {
        let page = 1;
        if (currentConversation._id) {
            try {
                const response = await axios({
                    url: BASE_URL + "/api/v1/conservations/" + `${currentConversation._id}/messages`,
                    method: 'GET',
                    headers: { Authorization: `Bearer ${userToken}` },
                    params: {
                        page: page,
                        limit: 50
                    }
                });
                dispatch(setListMessage(response.data.data.slice().reverse()))
            } catch (error) {
                console.log(error);
            }
        }
    }

    const getFriendList = async () => {
        setLoading(true);
        try {
            const response = await axios({
                url: BASE_URL + '/api/v1/friends',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });
            setListFriend(response.data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const handleCreateGroup = async () => {
        console.log(inputFriend);
        console.log(JSON.stringify(inputFriend));
        setLoading(true);
        try {
            const response = await axios({
                url: BASE_URL + '/api/v1/conservations/' + `${currentConversation._id}/addMembers`,
                method: 'POST',
                headers: { Authorization: `Bearer ${userToken}` },
                data: { members: inputFriend }
            });
            getConversation()
            getMessageByConversation()
            console.log(response);
            setSelectedFriends([]);
            setLoading(false)
            setInputFriend([])
            onClose();
        } catch (error) {
            console.log(error);
        }

        setLoading(false);
        setSelectedFriends([]);
        setLoading(false)
        setInputFriend([])
    }

    useEffect(() => {
        setSelectedFriends([]);
        setLoading(false)
        setInputFriend([])
        getFriendList();
    }, []);

    const handleFriendSelect = (friend) => {
        console.log(friend);
        setSelectedFriends([...selectedFriends, friend]);
        setInputFriend([...inputFriend, friend.userId
        ]);
    }

    const removeFromList = (index) => {
        const newList = [...selectedFriends];
        newList.splice(index, 1);
        setSelectedFriends(newList);
        const newLF = [...inputFriend];
        newLF.splice(index, 1);
        setInputFriend(newList);
    }


    return (
        <div style={{ width: 500, backgroundColor: 'white', height: "auto", borderRadius: 5, color: COLORS.text, display: "flex", flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderBottomWidth: 0.7 }}>
                    <h1 style={{ fontWeight: '500' }}>Add to group</h1>
                    <div>
                        <form method="dialog" className="modal-backdrop" style={{ borderRightColor: 'red' }} >
                            <button
                                className=" hover:bg-gray-200"
                                style={{ width: 35, height: 35, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 30 }}>
                                <BsXLg size={25} color={COLORS.text} />
                            </button>
                        </form>
                    </div>
                </div>
                <div style={{ padding: 15, gap: 20, display: 'flex', flexDirection: 'column' }}>

                    <div style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, paddingBottom: 20 }}>
                        <BsSearch size={15} style={{ position: 'absolute', marginLeft: 15, color: "grey" }} />
                        <input type="text" placeholder={"Enter name or phone number"}
                            id="search"
                            className="input input-bordered"
                            style={{ width: "100%", height: 45, backgroundColor: COLORS.whiteBG, padding: 10, borderRadius: 30, paddingLeft: 40 }} />
                    </div>
                    <div className="flex items-center overflow-x-auto p-2 gap-2">
                        {selectedFriends && selectedFriends.map((e, index) => (
                            <div key={index} className="flex gap-2 items-center justify-center border-blue-300 bg-blue-100 text-blue-600 border rounded-full p-2 whitespace-nowrap">
                                {e.name}
                                <div className="flex justify-center items-center hover:bg-blue-300 w-6 h-6 rounded-full" onClick={() => removeFromList(index)}> <BsXCircle size={20} color='blue' /></div>
                            </div>
                        ))}
                    </div>
                    <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                        {listFriend && listFriend.map((e, index) => (
                            <div key={index} className="flex items-center justify-between p-2">
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-2">
                                        <div className="avatar">
                                            <div className="w-12 h-12 avatar rounded-full">
                                                <img src={e.avatar} alt="avatar" />
                                            </div>
                                        </div>
                                        <div>
                                            {e.name}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    {selectedFriends && selectedFriends.includes(e) || currentConversation.members && currentConversation.members.includes(e) ? (
                                        <button className="btn btn-primary text-white" disabled>Select</button>
                                    ) : (
                                        <button className="btn btn-primary text-white" onClick={() => handleFriendSelect(e)}>Select</button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div style={{ display: "flex", justifyContent: 'flex-end', alignItems: "center", gap: 20, padding: 20, borderTopWidth: 1 }}>
                <div>
                    <form method="dialog" className="modal-backdrop" style={{ borderRightColor: 'red' }} >
                        <button
                            className="hover:bg-gray-300 bg-gray-200"
                            style={{ width: 100, height: 45, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 5, fontWeight: '500' }}>
                            <h1 style={{ color: COLORS.text }}>Cancel</h1>
                        </button>
                    </form>
                </div>
                <div>
                    <button
                        onClick={() => { handleCreateGroup() }}
                        className="hover:bg-blue-700 bg-blue-600"
                        style={{ width: 140, height: 45, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                        <h1 style={{ color: COLORS.whiteBG, fontWeight: '500' }}>Confirm</h1>
                    </button>
                </div>
            </div>
        </div>
    );
}

const RemoveMembersModel = ({ onClose }) => {
    const userToken = JSON.parse(localStorage.getItem("userToken"));
    const user = useSelector((state) => state.user)
    const listConversation = useSelector((state) => state.listConversation)
    const currentConversation = useSelector((state) => state.currentConversation)

    const [loading, setLoading] = useState(false);
    const [listFriend, setListFriend] = useState([]);
    const [selectedFriends, setSelectedFriends] = useState([]);
    const [inputFriend, setInputFriend] = useState([]);

    const [report, setReport] = useState('');

    const dispatch = useDispatch();

    const getConversation = async () => {
        try {
            const respone = await axios({
                url: BASE_URL + "/api/v1/conservations",
                method: 'get',
                headers: { Authorization: `Bearer ${userToken}` },
            })
            dispatch(setListConversation(respone.data.data))
            respone.data.data.map(e => {
                if (e._id === currentConversation._id) {
                    console.log(e);
                    dispatch(setConversation(e))
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    const getMessageByConversation = async () => {
        let page = 1;
        if (currentConversation._id) {
            try {
                const response = await axios({
                    url: BASE_URL + "/api/v1/conservations/" + `${currentConversation._id}/messages`,
                    method: 'GET',
                    headers: { Authorization: `Bearer ${userToken}` },
                    params: {
                        page: page,
                        limit: 50
                    }
                });
                dispatch(setListMessage(response.data.data.slice().reverse()))
            } catch (error) {
                console.log(error);
            }
        }
    }


    // const getFriendList = async () => {
    //     setLoading(true);
    //     try {
    //         const response = await axios({
    //             url: BASE_URL + '/api/v1/friends',
    //             method: 'GET',
    //             headers: {
    //                 Authorization: `Bearer ${userToken}`
    //             }
    //         });
    //         setListFriend(response.data.data);
    //     } catch (error) {
    //         console.log(error);
    //     } finally {
    //         setLoading(false);
    //     }
    // }

    const handleRemoveFromGroup = async () => {
        console.log(inputFriend);
        console.log(JSON.stringify(inputFriend));
        setLoading(true);
        try {
            const response = await axios({
                url: BASE_URL + '/api/v1/conservations/' + `${currentConversation._id}/removeMembers`,
                method: 'POST',
                headers: { Authorization: `Bearer ${userToken}` },
                data: { members: inputFriend }
            });
            getConversation()
            getMessageByConversation()
            console.log(response);
            setSelectedFriends([]);
            setLoading(false)
            setInputFriend([])
            onClose();
            setReport('')
        } catch (error) {
            console.log(error);
            setReport(error.response.data.message);
        }

        setLoading(false);
        setSelectedFriends([]);
        setLoading(false)
        setInputFriend([])

    }

    useEffect(() => {
        setSelectedFriends([]);
        setLoading(false)
        setInputFriend([])

        setReport('')
    }, []);

    const handleFriendSelect = (friend) => {
        console.log(friend);
        setSelectedFriends([...selectedFriends, friend]);
        setInputFriend([...inputFriend, friend._id
        ]);
    }

    const removeFromList = (index) => {
        const newList = [...selectedFriends];
        newList.splice(index, 1);
        setSelectedFriends(newList);
        const newLF = [...inputFriend];
        newLF.splice(index, 1);
        setInputFriend(newList);
    }


    return (
        <div style={{ width: 500, backgroundColor: 'white', height: "auto", borderRadius: 5, color: COLORS.text, display: "flex", flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderBottomWidth: 0.7 }}>
                    <h1 style={{ fontWeight: '500' }}>Remove from group</h1>
                    <div>
                        <form method="dialog" className="modal-backdrop" style={{ borderRightColor: 'red' }} >
                            <button
                                className=" hover:bg-gray-200"
                                style={{ width: 35, height: 35, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 30 }}>
                                <BsXLg size={25} color={COLORS.text} />
                            </button>
                        </form>
                    </div>
                </div>
                <div style={{ padding: 15, gap: 20, display: 'flex', flexDirection: 'column' }}>

                    <div style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, paddingBottom: 20 }}>
                        <BsSearch size={15} style={{ position: 'absolute', marginLeft: 15, color: "grey" }} />
                        <input type="text" placeholder={"Enter name or phone number"}
                            id="search"
                            className="input input-bordered"
                            style={{ width: "100%", height: 45, backgroundColor: COLORS.whiteBG, padding: 10, borderRadius: 30, paddingLeft: 40 }} />
                    </div>
                    <div className="flex items-center overflow-x-auto p-2 gap-2">
                        {selectedFriends && selectedFriends.map((e, index) => (
                            <div key={index} className="flex gap-2 items-center justify-center border-blue-300 bg-blue-100 text-blue-600 border rounded-full p-2 whitespace-nowrap">
                                {e.name}
                                <div className="flex justify-center items-center hover:bg-blue-300 w-6 h-6 rounded-full" onClick={() => removeFromList(index)}> <BsXCircle size={20} color='blue' /></div>
                            </div>
                        ))}
                    </div>
                    <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                        {currentConversation.members.length > 0 && currentConversation.members.map((e, index) => (
                            <div key={index} className="flex items-center justify-between p-2">
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-2">
                                        <div className="avatar">
                                            <div className="w-12 h-12 avatar rounded-full">
                                                <img src={e.avatar} alt="avatar" />
                                            </div>
                                        </div>
                                        <div>
                                            {e.name}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    {selectedFriends && selectedFriends.includes(e) ? (
                                        <button className="btn btn-primary text-white" disabled>Select</button>
                                    ) : (
                                        <button className="btn btn-primary text-white" onClick={() => handleFriendSelect(e)}>Select</button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div>
                {report && <div style={{ maxHeight: 40, width: '100%', color: 'red', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 13 }}>
                    {report}
                </div>}
            </div>
            <div style={{ display: "flex", justifyContent: 'flex-end', alignItems: "center", gap: 20, padding: 20, borderTopWidth: 1 }}>
                <div>
                    <form method="dialog" className="modal-backdrop" style={{ borderRightColor: 'red' }} >
                        <button
                            className="hover:bg-gray-300 bg-gray-200"
                            style={{ width: 100, height: 45, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 5, fontWeight: '500' }}>
                            <h1 style={{ color: COLORS.text }}>Cancel</h1>
                        </button>
                    </form>
                </div>
                <div>
                    <button
                        onClick={() => { handleRemoveFromGroup() }}
                        className="hover:bg-blue-700 bg-red-600"
                        style={{ width: 140, height: 45, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                        <h1 style={{ color: COLORS.whiteBG, fontWeight: '500' }}>Remove</h1>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConversationDrawer;
