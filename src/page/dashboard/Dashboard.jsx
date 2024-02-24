/* eslint-disable no-unused-vars */
import React from "react";
import Menu from "./menu/Menu";
import SideBar from "./sideBar/SideBar";
import DUMMY_DATA from "../../data/DUMMY_DATA";
import ChatBox from "./chatbox/ChatBox";
import Contact from "../dashboard/contact/index";
import { useDispatch, useSelector } from "react-redux";

export default function DashBoard() {
    const [selected, setSelected] = React.useState('Chat');
    const [data, setData] = React.useState({});
    const [conversation, setConversation] = React.useState([]);
    const currentUser = localStorage.getItem("currentUser");

    const [menu, setMenu] = React.useState('FR');

    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user)


    const id = JSON.parse(currentUser)
    const user = DUMMY_DATA.user.find((e) => e.id === id);

    const getData = () => {
        if (user) {
            setData(user);
        } else {
            console.log("load data fail" + JSON.stringify(data))
        }
    }

    const getConversationByIdMember = () => {
        const conversations = DUMMY_DATA.conversation.filter((e) => e.memberId.includes(id));
        if (conversations) {
            setConversation(conversations);
        }
    }

    const getUser = () => {
        const user = DUMMY_DATA.user.find()
    }

    React.useEffect(() => {
        getConversationByIdMember();
        getData();
        console.log("in Dashboard")
    }, [])

    const handleItemClick = (text) => {
        setSelected(text);
    }

    const handleMenuClick = (text) => {
        setMenu(text)
        console.log(menu)
    }
    console.log("Select: " + selected)
    return (
        <>
            <div style={{ display: 'flex', width: "100vw", height: "100vh" }}>
                <SideBar selectedItem={selected} onItemClick={handleItemClick} dataIn={data} />
                <Menu selectedItem={selected} onMenuClick={handleMenuClick} />
                {selected === 'Chat' && <ChatBox />}
                {selected === 'Contact' && <Contact menu={menu} />}
            </div>
        </>
    )
}