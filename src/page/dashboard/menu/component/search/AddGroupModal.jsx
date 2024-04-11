import React, { useState, useEffect } from "react";
import axios from "axios";
import { BsXLg, BsSearch, BsXCircle } from "react-icons/bs";
import { COLORS } from "../../../../../utils/COLORS";
import { BASE_URL } from "../../../../../data/DUMMY_DATA";
import { useDispatch, useSelector } from "react-redux";
import { setListConversation } from "../../../../../hooks/redux/reducer";


const AddGroupModal = ({ onClose }) => {
    const userToken = JSON.parse(localStorage.getItem("userToken"));
    const user = useSelector((state) => state.user)
    const listConversation = useSelector((state) => state.listConversation)

    const [textInput, setTextInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [listFriend, setListFriend] = useState([]);
    const [selectedFriends, setSelectedFriends] = useState([]);
    const [inputFriend, setInputFriend] = useState([]);

    const dispatch = useDispatch();

    const handleInput = (text) => {
        setTextInput(text);
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
        console.log(textInput);
        console.log(inputFriend);
        setLoading(true);
        try {
            const response = await axios({
                url: BASE_URL + '/api/v1/conservations/createGroup',
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${userToken}`
                },
                data: {
                    name: textInput,
                    members: inputFriend
                }
            });
            console.log(response);
            const newListConversation = [...listConversation, response.data.data];
            dispatch(setListConversation(newListConversation));
            onClose();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);

        }
    }

    useEffect(() => {
        setSelectedFriends([]);
        setLoading(false)
        getFriendList();
    }, []);

    const handleFriendSelect = (friend) => {
        setSelectedFriends([...selectedFriends, friend]);
        setInputFriend([...inputFriend, friend.userId]);
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
                    <h1 style={{ fontWeight: '500' }}>Create group</h1>
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
                    <div>
                        <input onChange={(e) => handleInput(e.target.value)} type="text" placeholder="Enter group name"
                            id="groupName"
                            style={{ width: "100%", height: 40, backgroundColor: COLORS.whiteBG, padding: 10, outline: "none", borderBottomWidth: 1 }} />
                    </div>
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
                        <h1 style={{ color: COLORS.whiteBG, fontWeight: '500' }}>Create group</h1>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddGroupModal;
