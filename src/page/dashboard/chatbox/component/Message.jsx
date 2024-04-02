import { useSelector } from "react-redux";
import { COLORS } from "../../../../utils/COLORS";

// eslint-disable-next-line react/prop-types
const Message = ({ message }) => {

    return (
        <>
            {
                // eslint-disable-next-line react/prop-types
                message.isMine ? <UserMessage message={message} /> : <FriendMessage message={message} />
            }
        </>
    )
}

const UserMessage = ({ message }) => {
    function formatTime(datetimeString) {
        const datetime = new Date(datetimeString);
        const hour = datetime.getHours().toString().padStart(2, '0');
        const minute = datetime.getMinutes().toString().padStart(2, '0');
        return `${hour}:${minute}`;
    }
    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: "flex-end", marginTop: 5 }}>
            <div style={{ maxWidth: '80%', borderRadius: 5, backgroundColor: COLORS.bgComponentSelected, wordWrap: 'break-word', padding: 10, color: COLORS.text }}>
                {message.content}
                <div
                    className="text-wrap"
                    style={{ fontSize: 12, }}>
                    {formatTime(message.createdAt)}
                </div>
            </div>
        </div>
    )
}

const FriendMessage = ({ message }) => {
    function formatTime(datetimeString) {
        const datetime = new Date(datetimeString);
        const hour = datetime.getHours().toString().padStart(2, '0');
        const minute = datetime.getMinutes().toString().padStart(2, '0');
        return `${hour}:${minute}`;
    }
    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: "flex-start", marginTop: 5, gap: 8 }}>
            <div className="avatar">
                <div className="avatar w-8 h-8 rounded-full">
                    <img src={message.avatar} alt="avatar" />
                </div>
            </div>
            <div style={{ maxWidth: '80%', borderRadius: 5, backgroundColor: "lightgray", wordWrap: 'break-word', padding: 10, color: COLORS.text }}>
                {message.content}
                <div
                    className="text-wrap"
                    style={{ fontSize: 12, display: 'flex', justifyContent: 'flex-end' }}>
                    {formatTime(message.createdAt)}
                </div>
            </div>
        </div>
    )
}

export default Message;