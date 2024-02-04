/* eslint-disable react/prop-types */

import React from "react";
import { PiUserListLight, PiUsersLight } from "react-icons/pi";
import { VscMailRead } from "react-icons/vsc";

const Contact = ({ onMenuClick }) => {
    const [selected, setSelected] = React.useState('FR');

    const handleSelected = (text) => {
        setSelected(text);
        onMenuClick(text);
    }

    React.useEffect(() => { }, [])

    return (
        <>
            <div style={{ color: 'black' }}>
                <div
                    onClick={() => { handleSelected('FR') }}
                    className="hover:bg-gray-200"
                    style={{ height: 70, backgroundColor: selected === "FR" ? "#a2d6f9" : "", display: "flex", justifyContent: "flex-start", alignItems: 'center', padding: 20, gap: 20 }}>
                    <PiUserListLight size={25} />
                    <h1 style={{ fontWeight: '500' }}>Friend Lists</h1>
                </div>
                <div
                    onClick={() => { handleSelected('GL') }}
                    className="hover:bg-gray-200"
                    style={{ height: 70, backgroundColor: selected === "GL" ? "#a2d6f9" : "", display: "flex", justifyContent: "flex-start", alignItems: 'center', padding: 20, gap: 20 }}>
                    <PiUsersLight size={25} />
                    <h1 style={{ fontWeight: '500' }}>Joined Group</h1>
                </div>
                <div
                    onClick={() => { handleSelected('RS') }}
                    className="hover:bg-gray-200"
                    style={{ height: 70, backgroundColor: selected === "RS" ? "#a2d6f9" : "", display: "flex", justifyContent: "flex-start", alignItems: 'center', padding: 20, gap: 20 }}>
                    <VscMailRead size={25} />
                    <h1 style={{ fontWeight: '500' }}>Friend Requests</h1>
                </div>
            </div>
        </>
    )
}

export default Contact;