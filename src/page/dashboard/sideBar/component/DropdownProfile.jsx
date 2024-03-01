/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import ProfileModal from "./ProfileModal";
import { useSelector } from "react-redux";

export default function DropdownProfile({ handleOpenModal }) {
    const userData = useSelector(state => state.user)

    const openProfileModal = () => {
        console.log("open Click")
    };



    return (
        <>
            <div style={{ position: 'absolute', backgroundColor: 'white', borderRadius: 5, width: 300, height: 170, color: 'black', gap: 20, marginLeft: 65, borderWidth: 0.5 }}
                className="shadow-xl">
                <div style={{ fontSize: 30, paddingLeft: 20 }}>
                    {userData.name}
                </div>
                <ul className="menu">
                    <div style={{ width: "100%", borderBottomWidth: 0.5 }}></div>
                    <li style={{}}><div onClick={() => handleOpenModal()}>Profile</div></li>
                    <li>
                        <a>
                            Settings
                        </a>
                    </li>
                    <div style={{ width: "100%", borderBottomWidth: 0.5 }}></div>
                    <li><Link to={"/authentication"}>Log out</Link></li>
                </ul>
            </div>

            {/* <dialog id="profileModal" className="modal">
                <ProfileModal />
            </dialog> */}

        </>
    )
}
