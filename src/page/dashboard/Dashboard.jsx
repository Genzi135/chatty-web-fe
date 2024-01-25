import React from "react";
import Menu from "./menu/Menu";
import SideBar from "./sideBar/SideBar";

export default function DashBoard() {
    const [selected, setSelected] = React.useState('Chat');

    const currentUser = localStorage.getItem("currentUser");
    console.log("type: " + typeof currentUser)

    React.useEffect(() => {
        console.log("current: " + currentUser);
    }, [currentUser])

    const handleItemClick = (text) => {
        setSelected(text);
    }
    return (
        <>
            <div style={{ display: 'flex', width: "100vw", height: "100vh" }}>
                <SideBar selectedItem={selected} onItemClick={handleItemClick} userid={currentUser} />
                <Menu selectedItem={selected} />
            </div>
        </>
    )
}