import { BsPeople, BsPersonPlus } from "react-icons/bs";
import AddFriendModal from "./AddFriendModal";
import AddGroupModal from "./AddGroupModal";

export default function Search() {

    return (
        <>
            <div style={{ width: "100%", height: 70, backgroundColor: "white", display: 'flex', justifyContent: "space-around", alignItems: 'center', gap: 10, padding: 10 }}>
                <input type="input" placeholder="Search" className="input w-60 h-9 max-w-xs bg-gray-200" style={{ color: 'black' }} />
                <div
                    onClick={() => { document.getElementById("AddFriendModal").showModal() }}
                    className="hover:bg-gray-200 cursor-pointer"
                    style={{ width: 35, height: 35, borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", position: 'relative' }}>
                    <BsPersonPlus size={20} color={"black"} />
                </div>
                <dialog id="AddFriendModal" className="modal">
                    <AddFriendModal />
                </dialog>
                <div
                    onClick={() => { document.getElementById('AddGroupModal').showModal() }}
                    className="hover:bg-gray-200 cursor-pointer" style={{ width: 35, height: 35, borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <BsPeople size={20} color={"black"} />
                </div>
                <dialog id="AddGroupModal" className="modal">
                    <AddGroupModal />
                </dialog>
            </div>
        </>
    )
}