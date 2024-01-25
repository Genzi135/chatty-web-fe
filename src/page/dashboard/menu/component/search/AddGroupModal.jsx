import { BsXLg, BsSearch } from "react-icons/bs";
import { COLORS } from "../../../../../utils/COLORS";
import React from "react";

const AddGroupModal = () => {

    const [textInput, setTextInput] = React.useState('');

    const handleInput = (text) => {
        setTextInput(text)
    }

    React.useEffect(() => {
        console.log("text input: " + textInput)
    }, [textInput])

    return (
        <div style={{ width: 500, backgroundColor: 'white', height: "80%", borderRadius: 5, color: COLORS.text, display: "flex", flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderBottomWidth: 0.7 }}>
                    <h1 style={{ fontWeight: '500' }}>Create group</h1>
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
                <div style={{ padding: 15, gap: 20, display: 'flex', flexDirection: 'column' }}>
                    <div>
                        <input onChange={(e) => handleInput(e.target.value)} type="text" placeholder="Enter group name"
                            id="groupName"
                            style={{ width: "100%", height: 40, backgroundColor: COLORS.whiteBG, padding: 10, outline: "none", borderBottomWidth: 1 }} />
                    </div>
                    <div style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, paddingBottom: 20 }}>
                        <BsSearch size={15} style={{ position: 'absolute', marginLeft: 15, color: "grey" }} />
                        <input type="text" placeholder={"Enter name or phone number"}
                            id="search"
                            className="input input-bordered"
                            style={{ width: "100%", height: 45, backgroundColor: COLORS.whiteBG, padding: 10, borderRadius: 30, paddingLeft: 40, }} />
                    </div>
                </div>
                <div>
                    {/* list in here */}
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
                        style={{ width: 140, height: 45, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 5, }}>
                        <h1 style={{ color: COLORS.whiteBG, fontWeight: '500' }}>Create group</h1>
                    </button>
                </div>
            </div>

        </div>
    )
}

export default AddGroupModal;