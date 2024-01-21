import ChatInput from "./component/ChatInput";

const Chat = () => {
    return (
        <>
            <div style={{ width: "100%", height: "100%" }}>
                <div style={{ width: "100%", backgroundColor: 'gray', height: "100%", display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>Header</div>
                    <div>Body</div>
                    <ChatInput />
                </div>
            </div>
        </>
    )
}

export default Chat;