import { Link } from "react-router-dom";

export default function DropdownProfile() {
    let name = "Genzi";
    return (
        <>
            <div style={{ position: 'absolute', backgroundColor: 'white', borderRadius: 5, width: 300, height: 170, color: 'black', gap: 20, marginLeft: 65, borderWidth: 0.5 }}
                className="shadow-xl">
                <div style={{ fontSize: 30, paddingLeft: 20 }}>
                    {name}
                </div>
                <ul className="menu">
                    <div style={{ width: "100%", borderBottomWidth: 0.5 }}></div>
                    <li style={{}}><a>Profile</a></li>
                    <li><a>Settings</a></li>
                    <div style={{ width: "100%", borderBottomWidth: 0.5 }}></div>
                    <li><Link to={"/authentication"}>Log out</Link></li>
                </ul>
            </div>
        </>
    )
}