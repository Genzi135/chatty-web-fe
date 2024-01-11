import Menu from "./menu/Menu";
import SideBar from "./sideBar/sideBar";


export default function DashBoard() {
    return (
        <>
            <div style={{ display: 'flex', width: "100vw", height: "100vh" }}>
                <SideBar />
                <Menu />
            </div>
        </>
    )
}