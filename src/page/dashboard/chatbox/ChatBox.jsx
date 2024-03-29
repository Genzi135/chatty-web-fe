import { useEffect, useState } from "react";
import ChatBody from "./component/ChatBoxBody";
import ChatBoxHeader from "./component/ChatBoxHeader";
import ChatInput from "./component/ChatBoxInput";
import ConversationDrawer from "./component/ConversationDrawer";
import { useSelector } from "react-redux";
import LandingPage from "../../../component/LandingPage";
import { COLORS } from "../../../utils/COLORS";

const ChatBox = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);
    const currentConversation = useSelector((state) => state.currentConversation);

    const handleSidebarButtonClick = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    useEffect(() => { console.log(currentConversation) }, [currentConversation])

    return (

        <div style={{ width: "100%", height: "100%" }}>
            {Object.keys(currentConversation).length === 0 ? (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.whiteBG, width: '100%', height: '100%' }}>
                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" style={{ position: 'absolute', top: 0, height: 200, right: 0 }}><path fill="#0099ff" fillOpacity="0.8" d="M0,0L26.7,5.3C53.3,11,107,21,160,58.7C213.3,96,267,160,320,160C373.3,160,427,96,480,90.7C533.3,85,587,139,640,154.7C693.3,171,747,149,800,165.3C853.3,181,907,235,960,256C1013.3,277,1067,267,1120,224C1173.3,181,1227,107,1280,112C1333.3,117,1387,203,1413,245.3L1440,288L1440,0L1413.3,0C1386.7,0,1333,0,1280,0C1226.7,0,1173,0,1120,0C1066.7,0,1013,0,960,0C906.7,0,853,0,800,0C746.7,0,693,0,640,0C586.7,0,533,0,480,0C426.7,0,373,0,320,0C266.7,0,213,0,160,0C106.7,0,53,0,27,0L0,0Z"></path></svg> */}
                <LandingPage />

            </div>) : (<div style={{ width: "100%", backgroundColor: 'gray', height: "100%", display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <div style={{ width: "100%", backgroundColor: 'gray', height: "100%", display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <ChatBoxHeader onSidebarButtonClick={handleSidebarButtonClick} isDrawerOpen={isDrawerOpen} />
                    <ChatBody />
                    <ChatInput />
                </div>
                {isDrawerOpen && <ConversationDrawer />}
            </div>)}
        </div>

    )
}

export default ChatBox;