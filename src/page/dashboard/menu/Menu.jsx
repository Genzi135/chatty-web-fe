import React from "react";
import Chat from "./component/chat/Chat";
import Contact from "./component/contact/Contact";
import Search from "./component/search/Search";
import ChatBox from "../chatbox/ChatBox"
//import Todo from "./component/todo/Todo";

// eslint-disable-next-line react/prop-types
export default function Menu({ selectedItem, onMenuClick }) {
    const [subSelected, setSubSelected] = React.useState('');

    const handleSetSubSelected = (text) => {
        setSubSelected(text);
    }


    React.useEffect(() => {
        console.log("in Menu")
    }, [])

    return (
        <>
            <div className="flex">
                <div style={{ width: 350, height: "100%", backgroundColor: 'white', borderRightWidth: 1 }}>
                    <Search />
                    {selectedItem === "Chat" && <Chat />}
                    {selectedItem === "Contact" && <Contact onMenuClick={onMenuClick} />}
                    {/* {selectedItem === "todo" && <Todo />} */}
                </div>

            </div>
        </>
    )
}