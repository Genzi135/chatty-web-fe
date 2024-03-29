/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { COLORS } from "../../../../utils/COLORS";
import { BsLayoutSidebarReverse, BsLayoutSidebarInsetReverse } from "react-icons/bs";
import { useSelector } from "react-redux";

const ChatBoxHeader = ({ onSidebarButtonClick, isDrawerOpen }) => {
    const conversationData = useSelector((state) => state.currentConversation)
    const [sideBarSelected, setSideBarSelected] = React.useState(false);

    const handleOpenSiderBar = () => {
        setSideBarSelected(!sideBarSelected);
        console.log("sideBar: " + !sideBarSelected);
    }
    return (<>
        <div style={{ width: '100%', height: 90, backgroundColor: COLORS.whiteBG, display: 'flex', justifyContent: "space-between", alignItems: 'center', padding: 10, paddingLeft: 15 }}>
            <div style={{ display: 'flex', gap: 20 }}>
                <div className="avatar">
                    <div className="w-12 rounded-full">
                        <img src={conversationData.image} alt="avatar" />
                    </div>

                </div>
                <div className="flex items-center">
                    <h1 className="card-title text-black">{conversationData.name}</h1>
                </div>
            </div>
            <div onClick={onSidebarButtonClick}>
                {sideBarSelected ? (
                    <div onClick={handleOpenSiderBar} style={{ color: 'black', width: 40, height: 40, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 3 }} className="hover:bg-gray-100">
                        <BsLayoutSidebarReverse size={22} />
                    </div>
                ) : (

                    <div onClick={handleOpenSiderBar} style={{ color: COLORS.bdSelected, width: 40, height: 40, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 5 }} className="bg-blue-100">
                        <BsLayoutSidebarInsetReverse size={22} />
                    </div>
                )}
            </div>
        </div>
    </>)
}

export default ChatBoxHeader;
