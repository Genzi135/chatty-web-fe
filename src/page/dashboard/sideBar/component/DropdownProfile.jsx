import { Link } from "react-router-dom";
import ProfileModal from "./ProfileModal";

export default function DropdownProfile() {
    let name = "Genzi";

    const openProfileModal = () => {
        const modal = document.getElementById("profileModal");
        console.log(modal)
        modal.showModal();
        console.log("open Click")
    };

    return (
        <>
            <div style={{ position: 'absolute', backgroundColor: 'white', borderRadius: 5, width: 300, height: 170, color: 'black', gap: 20, marginLeft: 65, borderWidth: 0.5 }}
                className="shadow-xl">
                <div style={{ fontSize: 30, paddingLeft: 20 }}>
                    {name}
                </div>
                <ul className="menu">
                    <div style={{ width: "100%", borderBottomWidth: 0.5 }}></div>
                    <li style={{}}><div onClick={() => { document.getElementById("profileModall").showModal() }}>Profile</div></li>
                    <li>
                        <a>
                            Settings
                        </a>
                    </li>
                    <div style={{ width: "100%", borderBottomWidth: 0.5 }}></div>
                    <li><Link to={"/authentication"}>Log out</Link></li>
                </ul>
            </div>

            <dialog id="profileModall" className="modal" style={{ zIndex: 100 }}>
                <ProfileModal />
            </dialog>

        </>
    )
}
