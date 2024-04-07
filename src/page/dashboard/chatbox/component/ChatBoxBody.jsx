import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import ForwardModal from "./modal/ForwardModal";
import { useDispatch, useSelector } from "react-redux";
import { addMess, setListConversation, setListMessage, updateConversationLastMessage } from "../../../../hooks/redux/reducer";
import axios from "axios";
import { useSocket } from "../../../../hooks/context/socketContext";
import { BASE_URL } from "../../../../data/DUMMY_DATA";

const ChatBody = () => {
    const chatContainerRef = useRef(null);
    const currentConversation = useSelector((state) => state.currentConversation);
    const listConversation = useSelector((state) => state.listConversation);
    const userToken = JSON.parse(localStorage.getItem("userToken"))

    const listMessage = useSelector((state) => state.listMessage);

    const [dataSource, setDataSource] = useState([]);

    const { socket } = useSocket();

    const dispatch = useDispatch();

    const getMessageByConversation = async () => {
        let page = 1;
        if (currentConversation._id) {
            try {
                const response = await axios({
                    url: BASE_URL + "/api/v1/conservations/" + `${currentConversation._id}/messages`,
                    method: 'GET',
                    headers: { Authorization: `Bearer ${userToken}` },
                    params: {
                        page: page,
                        limit: 50
                    }
                });
                // dispatch(setListMessage(response.data.data.slice().reverse()))
                setDataSource(response.data.data.slice().reverse())
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        // setDataSource(listMessage)
        // console.log(listMessage);
        getMessageByConversation()
    }, [listMessage])

    useEffect(() => {
        socket.on("message:receive", (response) => {
            if (currentConversation._id === response.conversation._id) {
                dispatch(addMess(response))
            }
            console.log(response);

            // getMessageByConversation()

            //     const newListCoversation = listConversation.map(e => {
            //         if (e._id === response.conversation._id) {
            //             return { ...e, lastMessage: response }
            //         }
            //         return e;
            //     })
            //     dispatch(setListConversation(newListCoversation))

        });

        // socket.on("message:delete", (respone) => {
        //     if (respone.data.message === 'Message deleted successfully') {
        //         console.log("delete");
        //         getMessageByConversation();
        //     }

        // })
    }, [])

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [dataSource]);

    useEffect(() => {

        const handleScroll = () => {
            if (chatContainerRef.current) {
                const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
                const isAtBottom = scrollHeight - scrollTop === clientHeight;
                if (isAtBottom) {
                    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [dataSource]);

    const onOpenFWM = () => {
        document.getElementById("forwardMessage").showModal();
    }
    const setCloseFWN = () => {
        document.getElementById("forwardMessage").close();
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }

    let prevDate = null;

    return (
        <div style={{ width: "100%", height: "100%", position: "relative", overflowY: "auto", padding: 5, paddingBottom: 10, zIndex: 777 }} ref={chatContainerRef}>
            {dataSource.map((e, index) => {
                const showDateDivider = prevDate !== formatDate(e.createdAt);
                prevDate = formatDate(e.createdAt);
                return (
                    <div key={e._id}>
                        {showDateDivider && (
                            <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <div style={{ width: 100, height: 30, backgroundColor: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center', opacity: '30%', borderRadius: 30, marginTop: 10, color: 'white' }}>{prevDate}</div>
                            </div>
                        )}
                        <div>
                            <Message message={e} onOpenFWM={onOpenFWM} />
                            {e.isMine && index === listMessage.length - 1 && (
                                <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 10 }}>
                                    {e.type}
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
            <div>
                <dialog id="forwardMessage">
                    <ForwardModal onClose={setCloseFWN} />
                </dialog>
            </div>
        </div>
    );
}

export default ChatBody;
