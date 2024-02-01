import { useEffect, useRef } from "react";
import Message from "./Message";

const ChatBody = () => {
    const chatContainerRef = useRef(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, []);


    return (
        <>
            <div style={{ width: "100%", height: "100%", position: "relative", overflowY: "auto", padding: 5 }}
                ref={chatContainerRef}
            >
                <Message text={"hello Genzi"} type={"chat-start"} />
                <Message text={"hi"} type={"chat-end"} />
                <Message text={"My name is January14th"} type={"chat-start"} />
                <Message text={"Can i chat with u?"} type={"chat-start"} />
                <Message text={"of course"} type={"chat-end"} />
                <Message text={"u r welcome <3"} type={"chat-end"} />
                <Message text={"yay! thank you, nice to meet u"} type={"chat-start"} />
                <Message text={"so, ur name is January14th right?"} type={"chat-end"} />
                <Message text={"it's ur nickname or ur birthday?"} type={"chat-end"} />
                <Message text={"it's both :)))"} type={"chat-start"} />
                <Message text={"Ohhh that's great!"} type={"chat-end"} />
                <Message text={"and Genzi is ur nickname or ur real name???"} type={"chat-start"} />
                <Message text={"oh that's my nickname though"} type={"chat-end"} />
                <Message text={"so what's ur real name???"} type={"chat-start"} />
                <Message text={"that's a secret"} type={"chat-end"} />
                <Message text={":))))"} type={"chat-end"} />
            </div>
        </>
    )
}

export default ChatBody;