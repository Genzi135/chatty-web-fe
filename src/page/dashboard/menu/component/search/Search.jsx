import { BsPeople, BsPersonPlus } from "react-icons/bs";
import AddFriendModal from "./AddFriendModal";
import AddGroupModal from "./AddGroupModal";

export default function Search() {

    return (
        <>
            <div style={{ width: "100%", height: 80, backgroundColor: "white", display: 'flex', justifyContent: "space-around", alignItems: 'center', gap: 10, padding: 10 }}>
                <input type="input" placeholder="Search" className="input w-72 h-10 max-w-xs bg-gray-200" style={{ color: 'black' }} />
                <div
                    onClick={() => { document.getElementById("AddFriendModal").showModal() }}
                    className="hover:bg-gray-200"
                    style={{ width: 40, height: 40, borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", position: 'relative' }}>
                    <BsPersonPlus size={25} color={"black"} />
                </div>
                <dialog id="AddFriendModal" className="modal">
                    <AddFriendModal />
                </dialog>
                <div
                    onClick={() => { document.getElementById('AddGroupModal').showModal() }}
                    className="hover:bg-gray-200" style={{ width: 40, height: 40, borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <BsPeople size={25} color={"black"} />
                </div>
                <dialog id="AddGroupModal" className="modal">
                    <AddGroupModal />
                </dialog>
            </div>
        </>
    )
}