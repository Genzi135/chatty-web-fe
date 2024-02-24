import { COLORS } from "../../../../utils/COLORS";

const ProfileModal = () => {
    return (
        <>
            <div style={{ width: 450, backgroundColor: 'white', height: "70%", borderRadius: 5, color: COLORS.text, display: "flex", flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderBottomWidth: 0.7 }}>
                        <h1 style={{ fontWeight: '500' }}>Add friend</h1>
                        <div>
                            <form method="dialog" className="modal-backdrop" style={{ borderRightColor: 'red' }} >
                                <button
                                    className=" hover:bg-gray-200"
                                    style={{ width: 35, height: 35, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 30, }}>

                                </button>
                            </form>
                        </div>
                    </div>

                </div>
                <div style={{ display: "flex", justifyContent: 'flex-end', alignItems: "center", gap: 20, padding: 20, borderTopWidth: 1 }}>
                    <div>
                        <form method="dialog" className="modal-backdrop" style={{ borderRightColor: 'red' }} >
                            <button
                                className=" hover:bg-gray-300 bg-gray-200"
                                style={{ width: 100, height: 45, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 5, fontWeight: '500' }}>
                                <h1 style={{ color: COLORS.text }}>Cancel</h1>
                            </button>
                        </form>
                    </div>
                    <div>
                        <button
                            onClick={() => { }}
                            className="hover:bg-blue-700 bg-blue-600"
                            style={{ width: 100, height: 45, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 5, }}>
                            <h1 style={{ color: COLORS.whiteBG, fontWeight: '500' }}>Search</h1>
                        </button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default ProfileModal;