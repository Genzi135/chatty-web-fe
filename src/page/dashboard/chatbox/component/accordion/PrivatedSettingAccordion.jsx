import { BsEyeSlash, BsTrash3, BsExclamationTriangle } from "react-icons/bs";
import { COLORS } from "../../../../../utils/COLORS";
import React from "react";


const PrivateSettingAccordion = () => {
    const [isHideChecked, setHideChecked] = React.useState(false);
    React.useEffect(() => {
        console.log(isHideChecked)
    }, [])
    return (
        <div style={{ width: "100%" }}>
            <div
                className="hover:bg-gray-100"
                style={{ display: 'flex', gap: 10, color: COLORS.text, padding: 10 }}>
                <BsEyeSlash size={20} color={"black"} />
                <div>Hide</div>
            </div>

            <div
                style={{ width: "100%", display: 'flex', justifyContent: 'space-between', alignItems: "center", paddingRight: 10 }}
                className="hover:bg-gray-100"
            >
                <div style={{ display: 'flex', gap: 10, color: COLORS.text, padding: 10 }}>
                    <BsExclamationTriangle size={20} color={"black"} />
                    <div>Report</div>
                </div>

                <div className="form-control">
                    <label className="cursor-pointer label">
                        <input type="checkbox" className="toggle [--tglbg:white] toggle-info toggle-sm" checked={isHideChecked}
                            onChange={() => setHideChecked(!isHideChecked)} />
                    </label>
                </div>
            </div>

            <div
                className="hover:bg-gray-100"
                style={{ display: 'flex', gap: 10, color: "red", padding: 10 }}>
                <BsTrash3 size={20} color={"red "} />
                <div >Delete chat history</div>
            </div>
        </div>
    )
}

export default PrivateSettingAccordion;