import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import { BASE_URL } from "../../../../data/DUMMY_DATA";
import ForwardModal from "./modal/ForwardModal";

const ChatBody = ({ messageData }) => {
    const chatContainerRef = useRef(null);
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        setDataSource(messageData.slice().reverse());
    }, [messageData]);



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
                            {e.isMine && index === dataSource.length - 1 && (
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
