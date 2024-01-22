import Conversation from "./Conversation"
import HeaderChat from "./HeaderChat"

// const message = [
//     {
//         id: 1,
//         user_id: "u1",
//         con_id: "c1",

//     }, {

//     }
// ]

export default function Chat() {
    return (
        <>
            <HeaderChat />
            <div style={{ width: "100%" }}>
                <Conversation />
                <Conversation />
                <Conversation />
            </div>

        </>
    )
}