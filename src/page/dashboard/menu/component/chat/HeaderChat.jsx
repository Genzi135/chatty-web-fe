import React from "react"
import { FiMoreHorizontal } from "react-icons/fi";
import DropdownOption from "./DropdownOption";

export default function HeaderChat() {
    const [selectedItem, setSelectedItem] = React.useState('All');
    const [showDropdown, setShowDropdown] = React.useState(false);

    const dropdownRef = React.useRef(null);

    const handleClickOutside = () => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowDropdown(false);
        }
    }

    const handleFilterClick = (text) => {
        setSelectedItem(text);
    }

    const handleSelectOption = () => {
        setShowDropdown(!showDropdown);
    }

    React.useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        }
    }, [])

    return (
        <>
            <div style={{ borderBottomWidth: 0.5, display: "flex", alignItems: 'center', justifyContent: 'space-between', paddingLeft: 20, paddingRight: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 15 }}>
                    <div style={{ height: "100%", fontWeight: '500', borderBottomColor: 'blue', borderBottomWidth: selectedItem === 'All' ? 3 : 0, color: selectedItem === 'All' ? 'blue' : '', fontSize: 15 }}
                        className="hover:text-blue-700 cursor-pointer"
                        onClick={() => { handleFilterClick("All") }}>
                        All
                    </div>
                    <div style={{ height: "100%", fontWeight: '500', borderBottomColor: 'blue', borderBottomWidth: selectedItem === 'Unread' ? 3 : 0, color: selectedItem === 'Unread' ? 'blue' : '', fontSize: 15 }}
                        className="hover:text-blue-700 cursor-pointer"
                        onClick={() => { handleFilterClick('Unread') }}>
                        Unread
                    </div>
                </div>
                <div
                    ref={dropdownRef}
                    style={{ height: 30, width: 30, borderRadius: 50, display: "flex", justifyContent: 'center', alignItems: 'center', position: "relative" }}
                    className="hover:bg-gray-200 cursor-pointer"
                    onClick={() => { handleSelectOption() }}>
                    <FiMoreHorizontal size={18} />
                    {showDropdown && <DropdownOption />}
                </div>
            </div>
        </>
    )
}