import { VscMailRead } from "react-icons/vsc";
import { COLORS } from "../../../utils/COLORS";
import RS from "./component/RS";
import RF from "./component/RF";
import React from "react";
import axios from "axios";
import { BASE_URL } from "../../../data/DUMMY_DATA";

const FriendRequest = () => {

    const [dataSource, setDataSource] = React.useState([]);

    const userToken = JSON.parse(localStorage.getItem("userToken"))

    const getData = async () => {
        try {
            const respone = await axios({
                url: BASE_URL + "/api/v1/friends/requests",
                method: 'get',
                headers: { Authorization: `Bearer ${userToken}` },

            })
            setDataSource(respone.data.data)
        } catch (error) {
            console.log(error)
        }
    }
    const handleOpenConversation = async (id) => {
        try {
            const respone = await axios({
                url: BASE_URL + "/api/v1/conservations/open/" + `${id}`,
                method: 'post',
                headers: { Authorization: `Bearer ${userToken}` },

            })
            console.log("conversation:")
            console.log(respone)
        } catch (error) {
            console.log(error)
        }
    }
    const handleReject = async (id) => {
        try {
            const respone = await axios({
                url: BASE_URL + "/api/v1/friends/cancel/" + `${id}`,
                method: 'post',
                headers: { Authorization: `Bearer ${userToken}` },
            })
            getData()
        } catch (error) {
            console.log(error)
        }
    }
    const handleAccept = async (id) => {
        try {
            const respone = await axios({
                url: BASE_URL + "/api/v1/friends/accept/" + `${id}`,
                method: 'post',
                headers: { Authorization: `Bearer ${userToken}` },

            })
            getData()
        } catch (error) {
            console.log(error)
        }
    }



    React.useEffect(() => {
        getData();
    }, [])

    let numFriendRequest = 0// dataSource.listFriendRequest.length;
    let numRequestSend = 0// dataSource.listRequestSent.length;
    let numRecommendedFriend = 0// dataSource.listRecommendedFriend.length; //limit 30
    return (
        <div style={{ width: '100%', height: '100%', display: "flex", flexDirection: 'column' }}>
            <div
                style={{ height: 70, backgroundColor: COLORS.whiteBG, display: "flex", justifyContent: "flex-start", alignItems: 'center', padding: 20, gap: 20, color: COLORS.text }}>
                <VscMailRead size={25} />
                <h1 style={{ fontWeight: '500', cursor: "default" }}>Friend Requests</h1>
            </div>
            <div className="bg-gray-100"
                style={{ height: "100%", width: "100%", overflow: 'hidden', overflowY: 'auto' }}
            >
                <div style={{ height: 70, width: "100%", display: "flex", justifyContent: "flex-start", alignItems: 'center', padding: 20, }}>
                    <h1 style={{ fontWeight: "500", color: COLORS.text, cursor: "default" }}>Friend requests ({numFriendRequest})</h1>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', padding: 20, gap: 20 }}>
                    {dataSource.map((e) => (
                        <div
                            key={e._id}
                            style={{ width: "32%", display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'white', padding: 10, gap: 10, borderRadius: 5 }}>
                            <div className="flex justify-start gap-4">
                                <div className="avatar ">
                                    <div className="w-12 rounded-full">
                                        <img src={e.avatar} alt="avatar" />
                                    </div>
                                </div>
                                <div>
                                    <div className="text-black">
                                        {e.name}
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-around gap-4">
                                <div className="bg-gray-200 flex justify-center items-center text-black hover:bg-gray-300" style={{ borderRadius: 3, width: "50%", height: 30, padding: 10, }}>
                                    <button style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={() => { handleReject(e._id) }}>Reject</button>
                                </div>
                                <div className="bg-gray-200 flex justify-center items-center text-black hover:bg-gray-300" style={{ borderRadius: 3, width: "50%", height: 30, padding: 10, }}>
                                    <button style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={() => { handleAccept(e._id) }}>Accept</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ height: 70, width: "100%", display: "flex", justifyContent: "flex-start", alignItems: 'center', padding: 20, }}>
                    <h1 style={{ fontWeight: "500", color: COLORS.text, cursor: "default" }}>Requests sent ({numRequestSend})</h1>
                </div>
                {/* <div style={{ display: 'flex', flexWrap: 'wrap', padding: 20, gap: 20 }}>
                    {dataSource.listRequestSent.map((request) => (
                        <RS data={request} key={request.id} />
                    ))}
                </div> */}
                <div style={{ height: 70, width: "100%", display: "flex", justifyContent: "flex-start", alignItems: 'center', padding: 20, }}>
                    <h1 style={{ fontWeight: "500", color: COLORS.text, cursor: "default" }}>Recommended Friends ({numRecommendedFriend})</h1>
                </div>
                {/* <div style={{ display: 'flex', flexWrap: 'wrap', padding: 20, gap: 20 }}>
                    {dataSource.listRecommendedFriend.map((request) => (
                        <RF data={request} key={request.id} />
                    ))}
                </div> */}
            </div>
        </div>
    )
}

export default FriendRequest;