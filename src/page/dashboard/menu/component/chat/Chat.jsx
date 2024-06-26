/* eslint-disable react/prop-types */
import React from "react"
import Conversation from "./Conversation"
import HeaderChat from "./HeaderChat"
import axios from "axios";
import { BASE_URL } from "../../../../../data/DUMMY_DATA";
import { COLORS } from "../../../../../utils/COLORS";
import { useDispatch, useSelector } from "react-redux";
import { addMess, setConversation, setListConversation, updateConversationIsReadMessageFalse, updateConversationLastMessage } from "../../../../../hooks/redux/reducer";
import { useSocket } from "../../../../../hooks/context/socketContext";

export default function Chat() {

    const userToken = JSON.parse(localStorage.getItem("userToken"))

    const { socket } = useSocket();

    const dispatch = useDispatch();

    // const currentConversation = useSelector((state) => state.currentConversation)

    const data = useSelector((state) => state.listConversation)

    const [listConversation, setListConversation] = React.useState([]);


    const getData = async () => {
        try {
            const respone = await axios({
                url: BASE_URL + "/api/v1/conservations",
                method: 'get',
                headers: { Authorization: `Bearer ${userToken}` },
            })
            setListConversation(respone.data.data)
            // dispatch(setListConversation(respone.data.data))
        } catch (error) {
            console.log(error)
        }
    }

    // const setIsReadConveration = async (id) => {
    //     try {
    //         const respone = await axios({
    //             url: BASE_URL + "/api/v1/conservations/" + `${id}`,
    //             method: 'get',
    //             headers: { Authorization: `Bearer ${userToken}` },
    //         })
    //         dispatch(setConversation(respone.data.data))
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    const chatClick = (conversation) => {
        console.log(conversation);
        dispatch(setConversation(conversation))
    }

    React.useEffect(() => {
        socket.on("message:receive", (response) => {
            // getData();
            dispatch(updateConversationLastMessage(response.conversation._id, response))
            dispatch(addMess(response))
        });
    }, []);

    React.useEffect(() => {
        getData();
    }, [data])

    // React.useEffect(() => {
    //     // setListConversations(data)
    //     getData();
    // }, [data])




    return (
        <div>
            <HeaderChat />
            <div style={{ width: "100%", height: 600, overflowY: 'auto' }}>
                {listConversation.length > 0 ? (listConversation.map((conversation, index) => (
                    <div key={index} onClick={() => chatClick(conversation)}>
                        <Conversation data={conversation} />
                    </div>
                ))) : (<div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 20, }}>
                    <h1 style={{ color: COLORS.bg, fontWeight: 400, fontSize: 20 }}>Your do not have any conversation</h1>
                </div>)
                }
            </div>
        </div>
    )
}