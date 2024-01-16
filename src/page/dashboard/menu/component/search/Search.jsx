import React from "react";
import { BsPeople, BsPersonPlus } from "react-icons/bs";
import DropdownAddFriend from "./component/DropdownAddFriend";

export default function Search() {
    const [selected, setSelected] = React.useState('');
    const [showDropdown, setShowDropdown] = React.useState(false);
    const dropdownAddFriendRef = React.useRef(null);

    const handleClickOutside = (event) => {
        if (dropdownAddFriendRef.current && !dropdownAddFriendRef.current.contains(event.target)) {
            setShowDropdown(false);
        }
    }

    const handleClickDropdown = (text) => {
        if (selected === 'AddFriend') {
            setShowDropdown(!showDropdown);
        } else if (selected === 'AddGroup') {
            setShowDropdown(!showDropdown);
        } else {
            setSelected(text);
        }
    }

    React.useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        }
    }, [])
    return (
        <>
            <div style={{ width: "100%", height: 80, backgroundColor: "white", display: 'flex', justifyContent: "space-around", alignItems: 'center', gap: 10, padding: 10 }}>
                <input type="input" placeholder="Search" className="input w-72 h-10 max-w-xs bg-gray-200" style={{ color: 'black' }} />
                <div
                    ref={dropdownAddFriendRef}
                    onClick={() => { handleClickDropdown('AddFriend') }}
                    className="hover:bg-gray-200"
                    style={{ width: 40, height: 40, borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", position: 'relative' }}>
                    <BsPersonPlus size={25} color={"black"} />
                    {showDropdown && <DropdownAddFriend />}
                </div>
                <div className="hover:bg-gray-200" style={{ width: 40, height: 40, borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <BsPeople size={25} color={"black"} />
                </div>
            </div>
        </>
    )
}