/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import {
    BsChatDotsFill, BsChatDots, BsJournalBookmark, BsJournalBookmarkFill, BsGear, BsGearFill,
    // BsCheckSquare, BsCheckSquareFill 
} from "react-icons/bs";
import DropdownSetting from "./component/DropdownSetting";
import DropdownProfile from "./component/DropdownProfile";
import { COLORS } from "../../../utils/COLORS";
import DUMMY_DATA from "../../../data/DUMMY_DATA";
import ProfileModal from "./component/ProfileModal";

export default function SideBar({ selectedItems, onItemClick, dataIn }) {
    const [selectedItem, setSelectedItem] = React.useState("Chat");
    const [showDropdown, setShowDropdown] = React.useState(false);
    const [showDropdownProfile, setShowDropdownProfile] = React.useState(false);
    const dropdownRef = React.useRef(null);
    const dropdownProfileRef = React.useRef(null);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowDropdown(false);
        }
    }

    const handleClickOutsideProfile = (event) => {
        if (dropdownProfileRef.current && !dropdownProfileRef.current.contains(event.target)) {
            setShowDropdownProfile(false);
        }
    }

    const handleItemClick = (item) => {
        if (item === "profile") {
            setShowDropdownProfile(!showDropdownProfile);
        }
        else if (item === "settings") {
            setShowDropdown(!showDropdown);
        } else {
            setSelectedItem(item);
            onItemClick(item);
        }
    };

    React.useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        document.addEventListener("click", handleClickOutsideProfile);
        return () => {
            document.removeEventListener("click", handleClickOutside);
            document.removeEventListener("click", handleClickOutsideProfile);
        }
    }, [])

    const openModal = () => {
        document.getElementById("profileModal").showModal();
    }

    return (
        <div style={{ width: 70, backgroundColor: "blue", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: "center" }}>

            <div
                ref={dropdownProfileRef}
                className="avatar"
                style={{ marginTop: 20, marginBottom: 10, padding: 10, position: 'relative' }}
                onClick={() => handleItemClick("profile")}
            >
                <div className="w-12 rounded-full">
                    <img src={dataIn.avatar} alt="avatar" />
                </div>
                {showDropdownProfile && <DropdownProfile handleOpenModal={openModal} />}
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
                        onClick={() => handleItemClick("Chat")}
                        style={{
                            width: "100%",
                            height: 80,
                        }}
                        className="hover:bg-blue-600"
                    >
                        <div
                            style={{
                                backgroundColor: selectedItem === "Chat" ? COLORS.bdSelected : "",
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                            {selectedItem === "Chat" ? (
                                <BsChatDotsFill size={28} color={"white"} />
                            ) : (
                                <BsChatDots size={28} color={"white"} />
                            )}
                        </div>
                    </div>
                    <div
                        onClick={() => handleItemClick("Contact")}
                        style={{
                            width: "100%",
                            height: 80,

                        }}
                        className="hover:bg-blue-600"
                    >
                        <div
                            style={{
                                backgroundColor: selectedItem === "Contact" ? COLORS.bdSelected : "",
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                            {selectedItem === "Contact" ? (
                                <BsJournalBookmarkFill size={25} color={"white"} />
                            ) : (
                                <BsJournalBookmark size={25} color={"white"} />
                            )}
                        </div>
                    </div>
                    <dialog id="profileModal" className="modal">
                        <ProfileModal />
                    </dialog>
                    {/* <div
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
                    </div> */}
                </div>
                <div
                    ref={dropdownRef}
                    style={{
                        position: 'relative',
                        //bottom: '100%',
                        //left: 100,
                        //bottom: 100,
                        //transform: showDropdown ? 'translateY(-10   0%)' : 'translateY(0)',
                        //transition: 'transform 0.3s ease-in-out', 
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
                        <BsGear className="z-0" size={30} color={"white"} />
                    )}
                    {showDropdown && <DropdownSetting handleOpenModal={openModal} />}
                </div>

            </div>
        </div>
    );
}