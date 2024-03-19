/* eslint-disable react/prop-types */
import React from "react"
import Conversation from "./Conversation"
import HeaderChat from "./HeaderChat"
import axios from "axios";
import { BASE_URL } from "../../../../../data/DUMMY_DATA";
import { COLORS } from "../../../../../utils/COLORS";

export default function Chat() {

    const userToken = JSON.parse(localStorage.getItem("userToken"))


    const [dataSource, setDataSource] = React.useState([]);


    const getData = async () => {
        try {
            const respone = await axios({
                url: BASE_URL + "/api/v1/conservations",
                method: 'get',
                headers: { Authorization: `Bearer ${userToken}` },
            })
            console.log(respone)
            setDataSource(respone.data.data)
        } catch (error) {
            console.log(error)
        }
    }
    console.log(dataSource)

    const chatClick = (conversation) => {
        console.log("click")
        console.log(conversation)
    }

    React.useEffect(() => {
        console.log("in Chat")
        getData();
        console.log(dataSource)
    }, [])

    return (
        <>
            <HeaderChat />
            <div style={{ width: "100%" }}>
                {dataSource !== null ? (dataSource.map((conversation, index) => (
                    <div key={index} onClick={() => chatClick(conversation)}>
                        <Conversation data={conversation} />
                    </div>
                ))) : (<div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 20, }}>
                    <h1 style={{ color: COLORS.bg, fontWeight: 400, fontSize: 20 }}>Your do not have any conversation</h1>
                </div>)
                }
            </div>
        </>
    )
}