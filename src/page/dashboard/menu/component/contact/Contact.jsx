
import React from "react";
import { PiUserListLight, PiUsersLight } from "react-icons/pi";
import { VscMailRead } from "react-icons/vsc";

const Contact = () => {
    const [selected, setSelected] = React.useState('FriendList');

    const handleSelected = (text) => {
        setSelected(text);
    }

    return (
        <>
            <div style={{ color: 'black' }}>
                <div
                    onClick={() => { handleSelected('FriendList') }}
                    className="hover:bg-gray-200"
                    style={{ height: 70, backgroundColor: selected === "FriendList" ? "#a2d6f9" : "", display: "flex", justifyContent: "flex-start", alignItems: 'center', padding: 20, gap: 20 }}>
                    <PiUserListLight size={30} />
                    <h1 style={{ fontWeight: '500' }}>Friend Lists</h1>
                </div>
                <div
                    onClick={() => { handleSelected('JoinedGroup') }}
                    className="hover:bg-gray-200"
                    style={{ height: 70, backgroundColor: selected === "JoinedGroup" ? "#a2d6f9" : "", display: "flex", justifyContent: "flex-start", alignItems: 'center', padding: 20, gap: 20 }}>
                    <PiUsersLight size={30} />
                    <h1 style={{ fontWeight: '500' }}>Joined Group</h1>
                </div>
                <div
                    onClick={() => { handleSelected('FriendRequest') }}
                    className="hover:bg-gray-200"
                    style={{ height: 70, backgroundColor: selected === "FriendRequest" ? "#a2d6f9" : "", display: "flex", justifyContent: "flex-start", alignItems: 'center', padding: 20, gap: 20 }}>
                    <VscMailRead size={30} />
                    <h1 style={{ fontWeight: '500' }}>Friend Requests</h1>
                </div>
            </div>
        </>
    )
}

export default Contact;