/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { COLORS } from "../../../../utils/COLORS";
import { BsLayoutSidebarReverse, BsLayoutSidebarInsetReverse } from "react-icons/bs";

const ChatBoxHeader = (
    // { onSideBarClick }
    { onSidebarButtonClick, isDrawerOpen }
) => {

    const [sideBarSelected, setSideBarSelected] = React.useState(false);

    const handleOpenSiderBar = () => {
        setSideBarSelected(!sideBarSelected);
        console.log("sideBar: " + !sideBarSelected);
    }
    return (<>
        <div style={{ width: '100%', height: 100, backgroundColor: COLORS.whiteBG, display: 'flex', justifyContent: "space-between", alignItems: 'center', padding: 15, }}>
            <div style={{ display: 'flex', gap: 20 }}>
                <div className="w-14 rounded-full">
                    <img src="https://res.cloudinary.com/diribdgsz/image/upload/v1704685598/chat-app/clone-avatar_a6lb3y.png" alt="avatar" />
                </div>
                <div>
                    <h1 className="card-title text-black">Name</h1>
                </div>
            </div>
            <div onClick={onSidebarButtonClick}>
                {sideBarSelected ? (
                    <div onClick={handleOpenSiderBar} style={{ color: COLORS.bdSelected, width: 40, height: 40, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 5 }} className="bg-blue-200">
                        <BsLayoutSidebarInsetReverse size={25} />
                    </div>
                ) : (
                    <div onClick={handleOpenSiderBar} style={{ color: 'black', width: 40, height: 40, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 3 }} className="hover:bg-gray-100">
                        <BsLayoutSidebarReverse size={25} />
                    </div>
                )}
            </div>
        </div>
    </>)
}

export default ChatBoxHeader;
