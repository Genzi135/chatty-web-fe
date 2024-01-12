import React from "react";
import { BsChatDotsFill, BsChatDots, BsJournalBookmark, BsJournalBookmarkFill, BsGear, BsGearFill, BsCheckSquare, BsCheckSquareFill } from "react-icons/bs";
import DropdownSetting from "./component/dropdownSetting";

export default function SideBar() {
    const [selectedItem, setSelectedItem] = React.useState("chat");
    const [showDropdown, setShowDropdown] = React.useState(false);
    const dropdownRef = React.useRef(null);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowDropdown(false);
        }
    }

    const handleItemClick = (item) => {
        if (item === "settings") {
            setShowDropdown(!showDropdown);
        } else {
            setSelectedItem(item);
        }
    };

    React.useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside)
        }
    }, [])

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
                            width: "100%",
                            height: 80,
                        }}
                        className="hover:bg-blue-600"
                    >
                        <div
                            style={{
                                backgroundColor: selectedItem === "chat" ? "darkBlue" : "",
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                            {selectedItem === "chat" ? (
                                <BsChatDotsFill size={30} color={"white"} />
                            ) : (
                                <BsChatDots size={30} color={"white"} />
                            )}
                        </div>
                    </div>
                    <div
                        onClick={() => handleItemClick("contact")}
                        style={{
                            width: "100%",
                            height: 80,

                        }}
                        className="hover:bg-blue-600"
                    >
                        <div
                            style={{
                                backgroundColor: selectedItem === "contact" ? "darkBlue" : "",
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                            {selectedItem === "contact" ? (
                                <BsJournalBookmarkFill size={30} color={"white"} />
                            ) : (
                                <BsJournalBookmark size={30} color={"white"} />
                            )}
                        </div>
                    </div>
                    <div
                        onClick={() => handleItemClick("todo")}
                        style={{
                            width: "100%",
                            height: 80,

                        }}
                        className="hover:bg-blue-600"
                    >
                        <div
                            style={{
                                backgroundColor: selectedItem === "todo" ? "darkBlue" : "",
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                            {selectedItem === "todo" ? (
                                <BsCheckSquareFill size={30} color={"white"} />
                            ) : (
                                <BsCheckSquare size={30} color={"white"} />
                            )}
                        </div>
                    </div>
                </div>
                <div
                    ref={dropdownRef}
                    style={{
                        width: "100%",
                        height: 80,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        alignSelf: 'flex-end'
                    }}
                    onClick={() => handleItemClick("settings")}
                    className="hover:bg-blue-600"
                >
                    {selectedItem === "settings" ? (
                        <BsGearFill size={30} color={"white"} />
                    ) : (
                        <BsGear size={30} color={"white"} />
                    )}
                    {showDropdown && <DropdownSetting />}
                </div>

            </div>
        </div>
    );
}