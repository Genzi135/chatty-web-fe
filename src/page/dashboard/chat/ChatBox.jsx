import { useState } from "react";
import ChatBody from "./component/ChatBoxBody";
import ChatBoxHeader from "./component/ChatBoxHeader";
import ChatInput from "./component/ChatBoxInput";
import ConversationDrawer from "./component/ConversationDrawer";

const ChatBox = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);

    const handleSidebarButtonClick = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    return (
        <>
            <div style={{ width: "100%", height: "100%" }}>
                <div style={{ width: "100%", backgroundColor: 'gray', height: "100%", display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <div style={{ width: "100%", backgroundColor: 'gray', height: "100%", display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <ChatBoxHeader onSidebarButtonClick={handleSidebarButtonClick} isDrawerOpen={isDrawerOpen} />
                        <ChatBody />
                        <ChatInput />
                    </div>
                    {isDrawerOpen && <ConversationDrawer />}
                </div>
            </div>
        </>
    )
}

export default ChatBox;