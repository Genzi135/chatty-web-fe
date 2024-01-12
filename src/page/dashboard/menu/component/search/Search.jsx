import { BsPeople, BsPersonPlus } from "react-icons/bs";

export default function Search() {
    return (
        <>
            <div style={{ width: "100%", height: 80, backgroundColor: "white", display: 'flex', justifyContent: "space-around", alignItems: 'center', gap: 10, padding: 10 }}>
                <input type="input" placeholder="Search" className="input w-72 h-10 max-w-xs bg-gray-200" style={{ color: 'black' }} />
                <div className="hover:bg-gray-200" style={{ width: 40, height: 40, borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <BsPersonPlus size={25} color={"black"} />
                </div>
                <div className="hover:bg-gray-200" style={{ width: 40, height: 40, borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <BsPeople size={25} color={"black"} />
                </div>
            </div>
        </>
    )
}