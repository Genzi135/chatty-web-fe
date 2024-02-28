import { BsCamera, BsXLg } from "react-icons/bs";
import { COLORS } from "../../../../utils/COLORS";
import { CiEdit } from "react-icons/ci";

const ProfileModal = () => {
    return (
        <>
            <div style={{ width: 400, backgroundColor: 'white', maxHeight: "80%", borderRadius: 5, color: COLORS.text, display: "flex", flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderBottomWidth: 0.7 }}>
                        <h1 style={{ fontWeight: '500' }}>Profile</h1>
                        <div>
                            <form method="dialog" className="modal-backdrop" style={{ borderRightColor: 'red' }} >
                                <button
                                    className=" hover:bg-gray-200"
                                    style={{ width: 35, height: 35, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 30, }}>
                                    <BsXLg size={25} color={COLORS.text} />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                <div style={{ width: '100%', maxHeight: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
                    <div style={{ borderBottomWidth: 5 }}>
                        <img src="https://res.cloudinary.com/diribdgsz/image/upload/v1704685988/chat-app/clone-background_bb1l7i.png" style={{ width: '100%', height: 150, overflow: 'hidden', zIndex: 10, }} />
                        <div className="flex">
                            <div id="avatar" style={{ width: 'auto', height: 100, zIndex: 100, }}>
                                <div style={{ position: 'absolute', top: 120, left: 20, padding: 1, borderRadius: 50, }}>
                                    <img src="https://res.cloudinary.com/diribdgsz/image/upload/v1704685598/chat-app/clone-avatar_a6lb3y.png" style={{ width: 80, height: 80 }} />
                                </div>
                                <div style={{ position: 'absolute', left: 75, top: 175, width: 30, height: 30, borderRadius: 30 }} className="bg-gray-200 flex justify-center items-center hover:bg-gray-300">
                                    <BsCamera size={20} />
                                </div>
                            </div>
                            <div className="flex" style={{ marginLeft: 140, gap: 10 }}>
                                <h1 style={{ fontSize: 20 }}>
                                    Name
                                </h1>
                                <div style={{ marginTop: 4, width: 30, height: 30, borderRadius: 30 }} className="flex justify-center items-center hover:bg-gray-300"><CiEdit size={20} /></div>
                            </div>
                        </div>
                    </div>
                    <div style={{ padding: 10 }}>
                        <h1 style={{ fontWeight: 'bold' }}>Personal information</h1>
                        <div style={{ marginTop: 10, display: 'flex', gap: 10, fontSize: 14 }}>
                            <div style={{ display: 'flex', flexDirection: "column", gap: 10, color: 'gray' }}>
                                <div>Gender</div>
                                <div>Birthday</div>
                                <div>Phone number</div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: "column", gap: 10 }}>
                                <div>Gender</div>
                                <div>Birthday</div>
                                <div>Phone number</div>
                            </div>
                        </div>
                        <div style={{ color: 'gray', fontSize: 14 }}>Just your friend can see your number</div>
                    </div>
                </div>

                <div style={{ display: "flex", justifyContent: 'flex-end', alignItems: "center", gap: 20, padding: 20, borderTopWidth: 1 }}>
                    <div style={{ width: '100%' }}>
                        <button
                            className=" hover:bg-gray-300 bg-gray-200"
                            style={{ width: "100%", height: 45, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 5, fontWeight: '500' }}>
                            <CiEdit size={25} />
                            <h1 style={{ color: COLORS.text }}>Update</h1>
                        </button>
                    </div>

                </div>

            </div>
        </>
    )
}

export default ProfileModal;