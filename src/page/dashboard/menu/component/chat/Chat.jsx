/* eslint-disable react/prop-types */
import React from "react"
import Conversation from "./Conversation"
import HeaderChat from "./HeaderChat"

export default function Chat() {

    const chatClick = (conversation) => {
        console.log("click")
        console.log(conversation)
    }

    const dataSource = []

    React.useEffect(() => {
        console.log("in Chat")
    }, [])

    return (
        <>
            <HeaderChat />
            <div style={{ width: "100%" }}>
                {dataSource.map((conversation, index) => (
                    <div key={index} onClick={() => chatClick(conversation)}>
                        <Conversation data={conversation} />
                    </div>
                ))}
            </div>
        </>
    )
}