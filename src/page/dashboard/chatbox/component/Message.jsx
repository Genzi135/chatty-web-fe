import { useDispatch, useSelector } from "react-redux";
import { COLORS } from "../../../../utils/COLORS";
import { BsArrow90DegDown, BsFillTrashFill, BsReplyAllFill } from 'react-icons/bs'
import axios from "axios";
import { BASE_URL } from "../../../../data/DUMMY_DATA";
import React from "react";
import { setCurrentMessage, setReplyMessage } from "../../../../hooks/redux/reducer";

// eslint-disable-next-line react/prop-types
const Message = ({ message, onOpenFWM }) => {
    return (
        <>
            {
                // eslint-disable-next-line react/prop-types
                message.isMine ? <UserMessage message={message} onOpenFWM={onOpenFWM} /> : <FriendMessage message={message} onOpenFWM={onOpenFWM} />
            }
        </>
    )
}

const UserMessage = ({ message, onOpenFWM }) => {

    const dispatch = useDispatch()

    function formatTime(datetimeString) {
        const datetime = new Date(datetimeString);
        const hour = datetime.getHours().toString().padStart(2, '0');
        const minute = datetime.getMinutes().toString().padStart(2, '0');
        return `${hour}:${minute}`;
    }
    const userToken = JSON.parse(localStorage.getItem("userToken"))

    const handleDeleteMessage = async (id) => {
        try {
            const response = await axios({
                url: BASE_URL + `/api/v1/messages/${id}`,
                method: 'DELETE',
                headers: { Authorization: `Bearer ${userToken}` }
            })
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }
    const onClickForwardMessage = (message) => {
        console.log(message)
        dispatch(setCurrentMessage(message))
        onOpenFWM()
    }
    const hanldeReplyMessage = async () => {
        console.log(message.content);
        dispatch(setReplyMessage(message));
    }

    const [isShowOption, setShowOption] = React.useState(false)

    const onMouseEnter = React.useCallback(() => {
        setShowOption(true);
    }, [])

    const onMouseLeave = React.useCallback(() => {
        setShowOption(false)
    }, [])
    return (
        <div
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            style={{ width: '100%', display: 'flex', justifyContent: "flex-end", marginTop: 5 }}>
            {isShowOption && <div style={{ backgroundColor: '', display: 'flex', alignItems: 'center', marginRight: 10, opacity: '80%' }}>
                <div className="flex gap-2 bg-white p-1 rounded-md">
                    <div
                        className="hover:bg-blue-300 p-1 rounded-md tooltip"
                        data-tip="Forward"
                        onClick={() => { onClickForwardMessage(message.content); console.log(message.content) }}>
                        <BsReplyAllFill size={15} color={COLORS.text} />
                    </div>
                    <div
                        className="hover:bg-blue-300 p-1 rounded-md tooltip"
                        data-tip="Reply"
                        onClick={() => { hanldeReplyMessage() }}>
                        <BsArrow90DegDown size={15} color={COLORS.text} />
                    </div>
                    <div
                        className="hover:bg-red-200 p-1 rounded-md tooltip"
                        data-tip="Delete"
                        onClick={() => { handleDeleteMessage(message._id) }}>
                        <BsFillTrashFill size={15} color={'red'} />
                    </div>
                </div>
            </div>}
            <div
                className="shadow-xl"
                style={{ maxWidth: '60%', borderRadius: 10, backgroundColor: COLORS.bgComponentSelected, wordWrap: 'break-word', padding: 10, color: message.isDelete ? 'grey' : COLORS.text }}>
                <div style={{ wordBreak: 'break-all' }}>
                    {message.content}

                </div>
                <div
                    className="text-wrap"
                    style={{ fontSize: 12, }}>
                    {formatTime(message.createdAt)}
                </div>
            </div>
        </div>
    )
}

const FriendMessage = ({ message, onOpenFWM }) => {
    const dispatch = useDispatch()
    function formatTime(datetimeString) {
        const datetime = new Date(datetimeString);
        const hour = datetime.getHours().toString().padStart(2, '0');
        const minute = datetime.getMinutes().toString().padStart(2, '0');
        return `${hour}:${minute}`;
    }
    const onClickForwardMessage = (message) => {
        dispatch(setCurrentMessage(message))
        onOpenFWM();
    }
    const [isShowOption, setShowOption] = React.useState(false)

    const onMouseEnter = React.useCallback(() => {
        setShowOption(true);
    }, [])

    const onMouseLeave = React.useCallback(() => {
        setShowOption(false)
    }, [])

    return (
        <div

            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            style={{ width: '100%', display: 'flex', justifyContent: "flex-start", marginTop: 5, }}>
            <div className="avatar">
                <div className="avatar w-8 h-8 rounded-full mr-2">
                    <img src={message.avatar} alt="avatar" />
                </div>
            </div>
            <div
                className="shadow-xl"
                style={{ maxWidth: '60%', borderRadius: 10, backgroundColor: "white", wordWrap: 'break-word', padding: 10, color: COLORS.text }}>
                <div style={{ wordBreak: 'break-all' }}>
                    {message.content}
                </div>
                <div
                    className="text-wrap"
                    style={{ fontSize: 12, display: 'flex', justifyContent: 'flex-end' }}>
                    {formatTime(message.createdAt)}
                </div>
            </div>
            {isShowOption && <div style={{ backgroundColor: '', display: 'flex', alignItems: 'center', marginLeft: 10, opacity: '80%' }}>
                <div className="flex gap-2 bg-white p-1 rounded-md">
                    <div
                        className="hover:bg-blue-300 p-1 rounded-md tooltip"
                        data-tip="Reply"
                    >
                        <BsArrow90DegDown size={15} color={COLORS.text} />
                    </div>
                    <div
                        className="hover:bg-blue-300 p-1 rounded-md tooltip"
                        data-tip="Forward"
                        onClick={() => { onClickForwardMessage(message.content) }}>
                        <BsReplyAllFill size={15} color={COLORS.text} />
                    </div>

                </div>
            </div>}
        </div>
    )
}

export default Message;