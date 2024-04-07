import { useDispatch, useSelector } from "react-redux";
import { COLORS } from "../../../../utils/COLORS";
import { BsArrow90DegDown, BsFileEarmarkPptFill, BsFileEarmarkWord, BsFileEarmarkWordFill, BsFileEarmarkXFill, BsFileEarmarkZipFill, BsFillFileEarmarkTextFill, BsFillTrashFill, BsReplyAllFill, BsXLg } from 'react-icons/bs'
import axios from "axios";
import { BASE_URL } from "../../../../data/DUMMY_DATA";
import React from "react";
import { setCurrentMessage, setListMessage, setReplyMessage } from "../../../../hooks/redux/reducer";
import { useSocket } from "../../../../hooks/context/socketContext";

// eslint-disable-next-line react/prop-types
const Message = ({ message, onOpenFWM }) => {
    const current = useSelector((state) => state.user)
    return (
        <>
            {
                // eslint-disable-next-line react/prop-types  

                message.sender._id === current._id ? <UserMessage message={message} onOpenFWM={onOpenFWM} /> : <FriendMessage message={message} onOpenFWM={onOpenFWM} />
            }
        </>
    )
}

const UserMessage = ({ message, onOpenFWM }) => {

    const dispatch = useDispatch();
    const currentConversation = useSelector((state) => state.currentConversation);
    const userToken = JSON.parse(localStorage.getItem("userToken"));
    const { socket } = useSocket();


    function formatTime(datetimeString) {
        const datetime = new Date(datetimeString);
        const hour = datetime.getHours().toString().padStart(2, '0');
        const minute = datetime.getMinutes().toString().padStart(2, '0');
        return `${hour}:${minute}`;
    }

    const getMessageByConversation = async () => {
        //let page = 1;
        if (currentConversation._id) {
            try {
                const response = await axios({
                    url: BASE_URL + "/api/v1/conservations/" + `${currentConversation._id}/messages`,
                    method: 'GET',
                    headers: { Authorization: `Bearer ${userToken}` },
                    params: {
                        page: 1,
                        limit: 50
                    }
                });
                dispatch(setListMessage(response.data.data))
            } catch (error) {
                console.log(error);
            }
        }
    }


    const handleDeleteMessage = async (id) => {
        try {
            const response = await axios({
                url: BASE_URL + `/api/v1/messages/${id}`,
                method: 'DELETE',
                headers: { Authorization: `Bearer ${userToken}` }
            })
            console.log(response)
            getMessageByConversation();

            socket.emit("message:delete", {
                id: id,
                conversation: currentConversation,
            })

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

    const [selectedImage, setSelectedImage] = React.useState(null);

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    const handleCloseImage = () => {
        setSelectedImage(null);
    };
    return (

        <div
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            style={{ width: 'auto', display: 'flex', justifyContent: "flex-end", marginBottom: 5 }}>
            {isShowOption && message.content !== "This message has been deleted" && <div style={{ backgroundColor: '', display: 'flex', alignItems: 'center', marginRight: 10, opacity: '80%' }}>
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
                        onClick={() => { hanldeReplyMessage(message) }}>
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
                {message.parent && message.content !== "This message has been deleted" && <div className="bg-blue-100 p-2 w-48 border-l-4 border-blue-600 rounded-lg mb-2">
                    <div className="font-medium">
                        {message.parent.name}
                    </div>
                    <div className="text-ellipsis overflow-hidden whitespace-nowrap text-gray-500">
                        {message.parent.content}
                    </div>
                </div>}
                <div style={{ wordBreak: 'break-all' }}>
                    {message.content}
                </div>
                {message.attachments && message.content !== "This message has been deleted" &&
                    <div>
                        {message.attachments.map((e, index) => (
                            <div className="" key={index}>
                                <div className="flex flex-col justify-center p-1 rounded-lg">
                                    {e.type === 'image' &&
                                        <div onClick={() => handleImageClick(e.url)} className="">
                                            <img src={e.url} className="cursor-pointer" style={{ width: 'auto', height: 'auto' }} />
                                            {/* <div className="text-ellipsis whitespace-nowrap overflow-hidden">{e.url.split("/").pop()}</div> */}
                                        </div>
                                    }
                                    {e.type === 'application' &&
                                        <div onClick={() => { window.open(e.url) }} className="cursor-pointer flex items-center bg-blue-100 p-1 rounded-lg  ">
                                            {e.url.split(".").pop() === 'docx' && <BsFileEarmarkWordFill size={40} color='blue' />}
                                            {e.url.split(".").pop() === 'doc' && <BsFileEarmarkWordFill size={40} color='blue' />}

                                            {e.url.split(".").pop() === 'pptx' && <BsFileEarmarkPptFill size={40} color='red' />}
                                            {e.url.split(".").pop() === 'ppt' && <BsFileEarmarkPptFill size={40} color='red' />}

                                            {e.url.split(".").pop() === 'xlsx' && <BsFileEarmarkXFill size={40} color='green' />}
                                            {e.url.split(".").pop() === 'xls' && <BsFileEarmarkXFill size={40} color='green' />}

                                            {e.url.split(".").pop() === 'rar' && <BsFileEarmarkZipFill size={40} color='purple' />}
                                            {e.url.split(".").pop() === 'zip' && <BsFileEarmarkZipFill size={40} color='purple' />}

                                            {e.url.split(".").pop() === 'txt' && <BsFillFileEarmarkTextFill size={40} color='black' />}
                                            <div className="text-ellipsis whitespace-nowrap overflow-hidden ml-2">{e.url.split("/").pop()}</div>
                                        </div>
                                    }
                                    {e.type === 'video' && <div>
                                        <video controls width={'auto'}>
                                            <source src={e.url} type="video/mp4" />
                                        </video>
                                    </div>}

                                </div>
                            </div>
                        ))}
                    </div>
                }
                {selectedImage && (
                    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center z-50">
                        <img src={selectedImage} alt="Selected" className="max-w-full max-h-full" />
                        <button onClick={handleCloseImage} className="absolute top-2 right-2 bg-white p-1 rounded-full">
                            <BsXLg size={25} color={COLORS.text} />
                        </button>
                    </div>
                )}
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

    const dispatch = useDispatch();
    const currentConversation = useSelector((state) => state.currentConversation);
    const userToken = JSON.parse(localStorage.getItem("userToken"));
    const { socket } = useSocket();

    function formatTime(datetimeString) {
        const datetime = new Date(datetimeString);
        const hour = datetime.getHours().toString().padStart(2, '0');
        const minute = datetime.getMinutes().toString().padStart(2, '0');
        return `${hour}:${minute}`;
    }
    const onClickForwardMessage = (message) => {
        dispatch(setCurrentMessage(message))
        onOpenFWM()
    }
    const hanldeReplyMessage = async () => {
        dispatch(setReplyMessage(message));
    }
    const [isShowOption, setShowOption] = React.useState(false)

    const onMouseEnter = React.useCallback(() => {
        setShowOption(true);
    }, [])

    const onMouseLeave = React.useCallback(() => {
        setShowOption(false)
    }, [])

    const [selectedImage, setSelectedImage] = React.useState(null);

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    const handleCloseImage = () => {
        setSelectedImage(null);
    };

    return (
        <div

            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            style={{ width: '100%', display: 'flex', justifyContent: "flex-start", marginBottom: 5, }}>
            <div className="avatar">
                <div className="avatar w-8 h-8 rounded-full mr-2">
                    <img src={message.avatar} alt="avatar" />
                </div>
            </div>
            <div
                className="shadow-xl"
                style={{ maxWidth: '60%', borderRadius: 10, backgroundColor: "white", wordWrap: 'break-word', padding: 10, color: message.isDelete ? 'grey' : COLORS.text }}>
                {message.parent && message.content !== "This message has been deleted" && <div className="bg-blue-100 p-2 w-48 border-l-4 border-blue-600 rounded-lg mb-2">
                    <div className="font-medium">
                        {message.parent.name}
                    </div>
                    <div className="text-ellipsis overflow-hidden whitespace-nowrap text-gray-500">
                        {message.parent.content}
                    </div>
                </div>}
                <div style={{ wordBreak: 'break-all' }}>
                    {message.content}
                </div>
                {message.attachments && message.content !== "This message has been deleted" &&
                    <div>
                        {message.attachments.map((e, index) => (
                            <div className="" key={index}>
                                <div className="flex flex-col justify-center p-1 rounded-lg">
                                    {e.type === 'image' &&
                                        <div onClick={() => handleImageClick(e.url)}>
                                            <img src={e.url} className="cursor-pointer" style={{ width: 'auto', height: 'auto' }} />
                                            {/* <div className="text-ellipsis whitespace-nowrap overflow-hidden">{e.url.split("/").pop()}</div>s */}
                                        </div>
                                    }
                                    {e.type === 'application' &&
                                        <div onClick={() => { window.open(e.url) }} className="cursor-pointer flex items-center bg-blue-100 p-1 rounded-lg">
                                            {e.url.split(".").pop() === 'docx' && <BsFileEarmarkWordFill size={40} color='blue' />}
                                            {e.url.split(".").pop() === 'doc' && <BsFileEarmarkWordFill size={40} color='blue' />}

                                            {e.url.split(".").pop() === 'pptx' && <BsFileEarmarkPptFill size={40} color='red' />}
                                            {e.url.split(".").pop() === 'ppt' && <BsFileEarmarkPptFill size={40} color='red' />}

                                            {e.url.split(".").pop() === 'xlsx' && <BsFileEarmarkXFill size={40} color='green' />}
                                            {e.url.split(".").pop() === 'xls' && <BsFileEarmarkXFill size={40} color='green' />}

                                            {e.url.split(".").pop() === 'rar' && <BsFileEarmarkZipFill size={40} color='purple' />}
                                            {e.url.split(".").pop() === 'zar' && <BsFileEarmarkZipFill size={40} color='purple' />}

                                            {e.url.split(".").pop() === 'txt' && <BsFillFileEarmarkTextFill size={40} color='black' />}
                                            <div className="text-ellipsis whitespace-nowrap overflow-hidden ml-2">{e.url.split("/").pop()}</div>
                                        </div>
                                    }
                                    {e.type === 'video' && <div>
                                        <video controls width={'auto'}>
                                            <source src={e.url} type="video/mp4" />
                                        </video>
                                    </div>}

                                </div>
                            </div>
                        ))}
                    </div>
                }
                {selectedImage && (
                    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center z-50">
                        <img src={selectedImage} alt="Selected" className="max-w-full max-h-full" />
                        <button onClick={handleCloseImage} className="absolute top-2 right-2 bg-white p-1 rounded-full">
                            <BsXLg size={25} color={COLORS.text} />
                        </button>
                    </div>
                )}
                <div
                    className="text-wrap"
                    style={{ fontSize: 12, display: 'flex', justifyContent: 'flex-end' }}>
                    {formatTime(message.createdAt)}
                </div>
            </div>
            {isShowOption && message.content !== "This message has been deleted" && <div style={{ backgroundColor: '', display: 'flex', alignItems: 'center', marginLeft: 10, opacity: '80%' }}>
                <div className="flex gap-2 bg-white p-1 rounded-md">
                    <div
                        className="hover:bg-blue-300 p-1 rounded-md tooltip"
                        data-tip="Reply"
                        onClick={() => { hanldeReplyMessage(message) }}
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