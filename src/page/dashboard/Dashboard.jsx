import React from "react";
import Menu from "./menu/Menu";
import SideBar from "./sideBar/sideBar";


export default function DashBoard() {
    const [selected, setSelected] = React.useState('Chat');

    const handleItemClick = (text) => {
        setSelected(text);
    }
    return (
        <>
            <div style={{ display: 'flex', width: "100vw", height: "100vh" }}>
                <SideBar selectedItem={selected} onItemClick={handleItemClick} />
                <Menu selectedItem={selected} />

            </div>
        </>
    )
}