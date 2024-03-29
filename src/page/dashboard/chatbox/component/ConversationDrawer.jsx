import { CiEdit } from "react-icons/ci";
import { BsPinAngle, BsPeople, BsAlarm, BsBell, BsCaretRightFill, BsCaretDownFill } from "react-icons/bs";
import { COLORS } from "../../../../utils/COLORS";
import PhotoVidAccordion from "./accordion/PhotoVidAccordion";
import React from "react";
import FileAccodion from "./accordion/FileAccordion";
import LinkAccordian from "./accordion/LinkAccordion";
import PrivateSettingAccordion from "./accordion/PrivatedSettingAccordion";
import { useSelector } from "react-redux";

const ConversationDrawer = () => {
    const [isPhotoVidOpen, setPhotoVidOpen] = React.useState(true);
    const [isFileOpen, setFileOpen] = React.useState(true);
    const [isLinkOpen, setLinkOpen] = React.useState(true);
    const [isPrivateSettingOpen, setPrivateSettingOpen] = React.useState(true);

    const conversationData = useSelector((state) => state.currentConversation);

    return (<>
        <div style={{ width: 500, position: 'relative', backgroundColor: 'white', borderLeftWidth: 2 }}>

            <div className="card-title text-black" style={{ height: 74, borderBottomWidth: 1, justifyContent: "center", alignItems: "center", display: 'flex' }}>
                Conversation info
            </div>
            <div style={{ overflowY: "auto", height: "calc(100% - 74px)" }}>
                <div style={{ height: 280, borderBottomWidth: 10, justifyContent: "center", alignItems: "center", display: 'flex', flexDirection: "column" }}>
                    <div className="avatar">
                        <div className="w-14 rounded-full" style={{ marginBottom: 20 }}>
                            <img src={conversationData.image} alt="avatar" />
                        </div>

                    </div>
                    <div
                        className="text-black"
                        style={{ display: 'flex', gap: 10, justifyContent: "center", alignItems: 'center', marginBottom: 20 }}>
                        <div className="font-semibold text-black">{conversationData.name}</div>
                        <div className="bg-gray-200 rounded-full w-7 h-7 hover:bg-gray-300"
                            style={{ display: 'flex', justifyContent: "center", alignItems: "center" }}
                        >
                            <CiEdit size={20} />
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: "space-around", width: "70%", color: COLORS.text }}>
                        <div style={{ width: 50, display: 'flex', flexDirection: "column", justifyContent: "center", gap: 10 }}>
                            <div className="bg-gray-200 rounded-full w-10 h-10 hover:bg-gray-300"
                                style={{ display: 'flex', justifyContent: "center", alignItems: "center" }}
                            >
                                <BsBell size={20} />

                            </div>
                        </div>
                        <div style={{ width: 50, display: 'flex', flexDirection: "column", justifyContent: "center", gap: 10 }}>
                            <div className="bg-gray-200 rounded-full w-10 h-10 hover:bg-gray-300"
                                style={{ display: 'flex', justifyContent: "center", alignItems: "center" }}
                            >
                                <BsPinAngle size={20} />

                            </div>

                        </div>
                        <div style={{ width: 50, display: 'flex', flexDirection: "column", justifyContent: "center", gap: 10 }}>
                            <div className="bg-gray-200 rounded-full w-10 h-10 hover:bg-gray-300"
                                style={{ display: 'flex', justifyContent: "center", alignItems: "center" }}
                            >
                                <BsPeople size={20} />

                            </div>

                        </div>
                    </div>
                    <div
                        className=""
                        style={{ display: 'flex', justifyContent: "center", fontSize: 13 }}>
                        <div style={{ width: 55, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginRight: 23 }}>
                            Mute
                        </div>
                        <div style={{ width: 55, display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                            Pin
                        </div>
                        <div style={{ width: 55, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginLeft: 33 }}>
                            Create group
                        </div>
                    </div>

                </div>

                <div
                    className="hover:bg-gray-100"
                    style={{ display: 'flex', gap: 10, color: COLORS.text, padding: 10, borderBottomWidth: 10 }}>
                    <BsAlarm size={23} color={"black"} />
                    <div>Reminder board</div>
                </div>
                {
                    //Photos/Videos
                }
                <div style={{ borderBottomWidth: 10 }}>
                    <div
                        className="cursor-pointer"
                        onClick={() => setPhotoVidOpen(!isPhotoVidOpen)}
                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
                        <div className="font-semibold text-black">
                            Photos/Videos
                        </div>
                        <div>
                            {isPhotoVidOpen ? (<BsCaretDownFill size={20} color={"gray"} />) : (<BsCaretRightFill size={20} color={"gray"} />)}
                        </div>
                    </div>
                    {isPhotoVidOpen ? (<PhotoVidAccordion />) : (<div></div>)}
                </div>

                {
                    //Files
                }
                <div>
                    <div
                        className="cursor-pointer"
                        onClick={() => setFileOpen(!isFileOpen)}
                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
                        <div className="font-semibold text-black">
                            Files
                        </div>
                        <div>
                            {isFileOpen ? (<BsCaretDownFill size={20} color={"gray"} />) : (<BsCaretRightFill size={20} color={"gray"} />)}
                        </div>
                    </div>
                    {isFileOpen ? <FileAccodion /> : <div></div>}
                </div>

                {
                    //Links
                }
                <div>
                    <div
                        className="cursor-pointer"
                        onClick={() => setLinkOpen(!isLinkOpen)}
                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
                        <div className="font-semibold text-black">
                            Links
                        </div>
                        <div>
                            {isLinkOpen ? (<BsCaretDownFill size={20} color={"gray"} />) : (<BsCaretRightFill size={20} color={"gray"} />)}
                        </div>
                    </div>
                    {isLinkOpen ? <LinkAccordian /> : <div></div>}
                </div>

                {
                    //Private Settings
                }
                <div>
                    <div
                        className="cursor-pointer"
                        onClick={() => setPrivateSettingOpen(!isPrivateSettingOpen)}
                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
                        <div className="font-semibold text-black">
                            Private setting
                        </div>
                        <div>
                            {isPrivateSettingOpen ? (<BsCaretDownFill size={20} color={"gray"} />) : (<BsCaretRightFill size={20} color={"gray"} />)}
                        </div>
                    </div>
                    {isPrivateSettingOpen ? <PrivateSettingAccordion /> : <div></div>}
                </div>
            </div>


        </div>
    </>)
}

export default ConversationDrawer;
