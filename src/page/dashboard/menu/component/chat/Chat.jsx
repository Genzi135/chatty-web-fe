/* eslint-disable react/prop-types */
import React from "react"
import Conversation from "./Conversation"
import HeaderChat from "./HeaderChat"
import axios from "axios";
import { BASE_URL } from "../../../../../data/DUMMY_DATA";
import { COLORS } from "../../../../../utils/COLORS";
import { useDispatch, useSelector } from "react-redux";
import { setConversation } from "../../../../../hooks/redux/reducer";

export default function Chat() {

    const userToken = JSON.parse(localStorage.getItem("userToken"))

    const dispatch = useDispatch();

    const dataSources = useSelector(state => state.currentConversation)

    const data = useSelector((state) => state.listConversation)

    const [listConversation, setListConversation] = React.useState([]);


    const getData = async () => {
        try {
            const respone = await axios({
                url: BASE_URL + "/api/v1/conservations",
                method: 'get',
                headers: { Authorization: `Bearer ${userToken}` },
            })
            console.log(respone.data.data)
            // setDataSource(respone.data.data)
            setListConversation(respone.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const setIsReadConveration = async (id) => {
        try {
            const respone = await axios({
                url: BASE_URL + "/api/v1/conservations/" + `${id}`,
                method: 'get',
                headers: { Authorization: `Bearer ${userToken}` },
            })
            console.log(respone.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const chatClick = (conversation) => {
        console.log("click")
        dispatch(setConversation(conversation))
        console.log(dataSources)
        setIsReadConveration(conversation._id)
    }


    React.useEffect(() => {
        getData();
    }, [data])

    return (
        <div>
            <HeaderChat />
            <div style={{ width: "100%" }}>
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