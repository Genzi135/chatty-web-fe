import React from "react";
import Chat from "./component/chat/Chat";
import Contact from "./component/contact/Contact";
import Search from "./component/search/Search";
import ChatBox from "../chat/ChatBox"
//import Todo from "./component/todo/Todo";

// eslint-disable-next-line react/prop-types
export default function Menu({ selectedItem }) {
    const [subSelected, setSubSelected] = React.useState('');
    const handleSetSubSelected = (text) => {
        setSubSelected(text);
    }
    return (
        <>
            <div>
                <div style={{ width: 350, height: "100%", backgroundColor: 'white', borderRightWidth: 1 }}>
                    <Search />
                    {selectedItem === "Chat" && <Chat />}
                    {selectedItem === "Contact" && <Contact />}
                    {/* {selectedItem === "todo" && <Todo />} */}
                </div>
                <div>
                    {subSelected === "Chat" && <ChatBox />}
                </div>
            </div>
        </>
    )
}