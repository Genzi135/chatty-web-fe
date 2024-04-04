/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import Menu from "./menu/Menu";
import SideBar from "./sideBar/SideBar";
import ChatBox from "./chatbox/ChatBox";
import Contact from "../dashboard/contact/index";
import { useSelector } from "react-redux";

export default function DashBoard() {
    const [selected, setSelected] = React.useState('Chat');
    const [menu, setMenu] = React.useState('FR');


    // const userCurrent = localStorage.getItem("userToken");

    // console.log("id: ", userCurrent)


    React.useEffect(() => {
    }, [])

    const handleItemClick = (text) => {
        setSelected(text);
    }

    const handleMenuClick = (text) => {
        setMenu(text)
        console.log(menu)
    }


    // const currentUser = useSelector((state) => state.user);

    // React.useEffect(() => {
    //     console.log("user connected")

    // }, [])

    return (
        <>
            <div style={{ display: 'flex', width: "100vw", height: "100vh", zIndex: 1 }}>
                <SideBar selectedItem={selected} onItemClick={handleItemClick} />
                <Menu selectedItem={selected} onMenuClick={handleMenuClick} />
                {selected === 'Chat' && <ChatBox />}
                {selected === 'Contact' && <Contact menu={menu} />}
            </div>
        </>
    )
}