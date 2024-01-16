
import { BsXLg } from "react-icons/bs";

const DropdownAddFriend = () => {

    return (
        <>
            <div
                className="shadow-xl border"
                style={{ padding: 10, height: 700, width: 450, backgroundColor: 'white', color: 'black', borderRadius: 5, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'absolute', marginTop: 750, marginLeft: 400 }}>
                <div style={{}}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: 15, borderBottomWidth: 0.5, alignItems: 'center' }}>
                        <h1 style={{ fontWeight: '500' }}>Add friend</h1>
                        <div className="hover:bg-gray-200" style={{ borderRadius: 30, display: "flex", justifyContent: 'center', alignItems: 'center', height: 35, width: 35 }}><BsXLg size={20} /></div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: "center", padding: 20 }}>
                        <div style={{ borderBottomWidth: 0.5, width: '20%', display: "flex", justifyContent: 'center', alignItems: 'center', height: 35 }}>
                            <h1>VN +84</h1>
                        </div>
                        <div style={{ borderBottomWidth: 0.5, width: '70%', height: 35 }}>
                            <input type="text" placeholder="Phone number" style={{ backgroundColor: 'white', width: '100%', height: '100%', padding: 10 }} />
                        </div>
                    </div>
                    <div>

                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', alignSelf: 'flex-end', padding: 10, gap: 20, borderTopWidth: 0.5, width: '100%' }}>
                    <div
                        className="bg-gray-200"
                        style={{ borderRadius: 5, height: 45, width: 80, display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: "500" }}>
                        Cancel
                    </div>
                    <div style={{ borderRadius: 5, backgroundColor: 'blue', height: 45, width: 80, color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: "500" }}>
                        Search
                    </div>
                </div>
            </div>
        </>
    )
}

export default DropdownAddFriend;