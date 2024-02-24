import { COLORS } from "../../../../utils/COLORS";

// eslint-disable-next-line react/prop-types
const Message = ({ message }) => {

    const currentUser = localStorage.getItem("currentUser");
    const id = JSON.parse(currentUser);


    return (
        <>
            {
                // eslint-disable-next-line react/prop-types
                id === message.userId ? <UserMessage message={message} /> : <FriendMessage message={message} />
            }
        </>
    )
}

const UserMessage = ({ message }) => {
    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: "flex-end", marginTop: 5 }}>
            <div style={{ maxWidth: '80%', borderRadius: 5, backgroundColor: "blue", wordWrap: 'break-word', padding: 5, color: COLORS.text }}>
                {message.text}
            </div>
        </div>
    )
}

const FriendMessage = ({ message }) => {
    return (
        <div>
            f
        </div>
    )
}

export default Message;