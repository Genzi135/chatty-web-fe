import { COLORS } from "../../../../utils/COLORS";

const ChatInput = () => {
    return (
        <>
            <div style={{ width: "100%", height: 120, backgroundColor: COLORS.whiteBG }}>
                <div style={{ height: "40%", width: "100%", borderBottomWidth: 1, display: 'flex', justifyContent: "flex-start", alignItems: "center", padding: 20 }}>
                    tag
                </div>
                <div style={{ height: "60%", width: '100%', display: 'flex', justifyContent: "space-between", alignItems: "center", padding: 20 }}>
                    chat
                </div>
            </div>
        </>
    )
}

export default ChatInput;