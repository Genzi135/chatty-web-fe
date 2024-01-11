import React from "react";
import { BsChatDotsFill, BsChatDots, BsJournalBookmark, BsJournalBookmarkFill, BsGear, BsGearFill, BsChevronRight, BsPerson, BsDatabase, BsTools, BsInfoCircle, BsGlobe } from "react-icons/bs";

export default function SideBar() {
    const [selectedItem, setSelectedItem] = React.useState("chat");

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    return (
        <div style={{ width: 80, backgroundColor: "blue", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: "center" }}>
            <div
                className="avatar"
                style={{ marginTop: 20, marginBottom: 10, padding: 10 }}
            >
                <div className="w-14 rounded-full">
                    <img src="https://res.cloudinary.com/diribdgsz/image/upload/v1704685598/chat-app/clone-avatar_a6lb3y.png" alt="avatar" />
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: 'space-between',
                    alignItems: "center",
                    height: "100%",
                    width: "100%",
                }}
            >
                <div style={{
                    width: "100%",
                }}>
                    <div
                        onClick={() => handleItemClick("chat")}
                        style={{
                            backgroundColor: selectedItem === "chat" ? "darkBlue" : "blue",
                            width: "100%",
                            height: 80,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {selectedItem === "chat" ? (
                            <BsChatDotsFill size={30} color={"white"} />
                        ) : (
                            <BsChatDots size={30} color={"white"} />
                        )}
                    </div>
                    <div
                        onClick={() => handleItemClick("contact")}
                        style={{
                            backgroundColor: selectedItem === "contact" ? "darkBlue" : "blue",
                            width: "100%",
                            height: 80,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {selectedItem === "contact" ? (
                            <BsJournalBookmarkFill size={30} color={"white"} />
                        ) : (
                            <BsJournalBookmark size={30} color={"white"} />
                        )}
                    </div>
                </div>
                <div
                    className="dropdown dropdown-top hover:bg-blue-700"
                    style={{
                        backgroundColor: selectedItem === "settings" ? "darkBlue" : "blue",
                        width: "100%",
                        height: 80,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        alignSelf: 'flex-end'
                    }}
                >
                    <div tabIndex={0} role="button">
                        {selectedItem === "settings" ? (
                            <BsGearFill size={30} color={"white"} />
                        ) : (
                            <BsGear size={30} color={"white"} />
                        )}
                        <ul tabIndex={0} className="dropdown-content z-[1] menu bg-white drop-shadow-lg border" style={{ width: 250, marginBottom: 2, borderRadius: 5, gap: 10, padding: 10, color: 'black', display: "block" }}>
                            <li>
                                <a className="dropdown-item"><BsPerson size={20} /> Account information</a>
                            </li>
                            <li>
                                <a className="dropdown-item"><BsGear size={20} /> Settings</a>
                            </li>
                            <div style={{ width: "100%", borderBottomWidth: 0.5 }}></div>
                            <li>
                                <a className="dropdown-item" style={{ display: 'flex', justifyContent: 'space-between' }}><div style={{ display: 'flex', gap: 10 }}><BsDatabase size={20} /> Data</div> <BsChevronRight size={15} color={"black"} /></a>
                            </li>
                            <li>
                                <a className="dropdown-item" style={{ display: 'flex', justifyContent: 'space-between' }}><div style={{ display: 'flex', gap: 10 }}><BsTools size={20} /> Tools</div> <BsChevronRight size={15} color={"black"} /></a>
                            </li>
                            <li>
                                <a className="dropdown-item" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', gap: 10 }} tabIndex={2} role="button" >
                                        <BsGlobe size={20} />
                                        Language
                                    </div>
                                    <BsChevronRight size={15} color={"black"} />
                                </a>
                            </li>
                            <li>
                                <a className="dropdown-item" style={{ display: 'flex', justifyContent: 'space-between' }}><div style={{ display: 'flex', gap: 10 }}><BsInfoCircle size={20} /> Tools</div> <BsChevronRight size={15} color={"black"} /></a>
                            </li>
                            <div style={{ width: "100%", borderBottomWidth: 0.5 }}></div>
                            <li>
                                <a className="dropdown-item" style={{ color: 'red' }} >Logout</a>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    );
}