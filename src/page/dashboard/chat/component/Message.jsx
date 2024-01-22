// eslint-disable-next-line react/prop-types
const Message = ({ text, type }) => {

    let style = '';

    if (type === "chat-start") {
        style = "chat-bubble-primary";
    } else if (type === "chat-end") {
        style = 'chat-bubble-secondary';
    }

    return (
        <>
            <div className={`chat ${type}`}>
                <div className={`chat-bubble ${style}`}>{text}</div>
            </div>
        </>
    )
}

export default Message;