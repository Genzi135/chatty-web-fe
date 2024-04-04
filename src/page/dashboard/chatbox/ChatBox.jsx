import { useEffect, useState } from "react";
import ChatBody from "./component/ChatBoxBody";
import ChatBoxHeader from "./component/ChatBoxHeader";
import ChatInput from "./component/ChatBoxInput";
import ConversationDrawer from "./component/ConversationDrawer";
import { useSelector } from "react-redux";
import LandingPage from "../../../component/LandingPage";
import { COLORS } from "../../../utils/COLORS";
import { BASE_URL } from "../../../data/DUMMY_DATA";
import axios from "axios";

const ChatBox = () => {

    const [isDrawerOpen, setIsDrawerOpen] = useState(true);
    const currentConversation = useSelector((state) => state.currentConversation);
    const userToken = JSON.parse(localStorage.getItem("userToken"))

    const [messageData, setMessageData] = useState([]);

    const handleSidebarButtonClick = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

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
                console.log(response.data)
                setMessageData(response.data.data);
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        getMessageByConversation();
    }, [currentConversation])





    return (
        <div style={{ width: "100%", height: "100%" }}>
            {/* <div>Socket.IO connection</div>; */}
            {Object.keys(currentConversation).length === 0 ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.whiteBG, width: '100%', height: '100%' }}>
                    <LandingPage />
                </div>
            ) : (
                <div
                    className="bg-gray-300"
                    style={{ width: "100%", height: "100%", display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <div style={{ width: "100%", height: "100%", display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <ChatBoxHeader onSidebarButtonClick={handleSidebarButtonClick} isDrawerOpen={isDrawerOpen} />
                        <ChatBody messageData={messageData} />
                        <ChatInput />
                    </div>
                    {isDrawerOpen && <ConversationDrawer />}
                </div>
            )}
        </div>
    );
}

export default ChatBox;
