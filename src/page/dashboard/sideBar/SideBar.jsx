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
import DUMMY_DATA, { BASE_URL } from "../../../data/DUMMY_DATA";
import ProfileModal from "./component/ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "../../../hooks/redux/reducer";
import { data } from "autoprefixer";

export default function SideBar({ selectedItems, onItemClick }) {
    const [selectedItem, setSelectedItem] = React.useState("Chat");
    const [showDropdown, setShowDropdown] = React.useState(false);
    const [showDropdownProfile, setShowDropdownProfile] = React.useState(false);
    const dropdownRef = React.useRef(null);
    const dropdownProfileRef = React.useRef(null);

    // eslint-disable-next-line no-unused-vars
    const [userData, setData] = React.useState({});
    const userToken = JSON.parse(localStorage.getItem("userToken"))

    const dispatch = useDispatch()

    const getData = async () => {
        const respone = await axios({
            url: BASE_URL + "/api/v1/users/getMe",
            method: 'get',
            headers: { Authorization: `Bearer ${userToken}` },

        })
        setData(respone.data.data);
        dispatch(setUser(respone.data.data))
    }

    const dataSource = useSelector((state) => state.user);

    React.useEffect(() => {
        getData()
    }, [])

    React.useEffect(() => {
        setData(dataSource)
    }, [dataSource])


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
                    <img src={userData.avatar} alt="avatar" />
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

                </div>
                <div
                    ref={dropdownRef}
                    style={{
                        position: 'relative',
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