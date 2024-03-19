import { VscMailRead } from "react-icons/vsc";
import { COLORS } from "../../../utils/COLORS";
import FR from "./component/FR";
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
            console.log(respone)
            setDataSource(respone.data.data)
        } catch (error) {
            console.log(error)
        }
    }



    React.useEffect(() => {
        getData();
    }, [])

    // const dataSource = {
    //     listFriendRequest: [{
    //         id: 1,
    //         img: "https://i.pinimg.com/736x/25/47/c7/2547c7ecb55605fbb39e04157f157021.jpg",
    //         name: "Phu",
    //         reason: "from phone number",
    //         requestText: "Hello",
    //         dataTime: "12/12/2024"
    //     }, {
    //         id: 2,
    //         img: "https://img.freepik.com/premium-photo/3d-cat-avatar-online-games-web-account-avatar_147351-47.jpg",
    //         name: "Genzi",
    //         reason: "from manual group",
    //         requestText: "We have in a group together",
    //         dataTime: "12/12/2024"
    //     }, {
    //         id: 3,
    //         img: "https://i.pinimg.com/564x/49/c9/58/49c95817f95d5c1b940e3f4f71f96f18.jpg",
    //         name: "Nana",
    //         reason: "from phone number",
    //         requestText: "I have your number and i wanna be your friend, can you accept me?",
    //         dataTime: "12/12/2024"
    //     }],
    //     listRequestSent: [{
    //         id: 1,
    //         name: 'Litch',
    //         img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ75gsWPiO29FPya84IUVex5m4P26qzSEOAH1qkZsWZwHSHrd8eiJR5wEzRU7a5Jx_BMRo&usqp=CAU",
    //         tittle: "20/12",
    //         dataTime: "12/12/2024"
    //     }, {
    //         id: 2,
    //         name: 'Garat',
    //         img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz1d7dyhK9wlaNFNjp5DtZ_adkVwr8BHv8YgV6a_TK52Uos1pSpjsn3GgJEQovOWCP8sY&usqp=CAU",
    //         tittle: "20/1",
    //         dataTime: "12/12/2024"
    //     }],
    //     listRecommendedFriend: [{
    //         id: 1,
    //         name: "Raiden Shogun",
    //         img: "https://upload-os-bbs.hoyolab.com/upload/2021/09/22/10653699/eda8d1a751183b8617071c3012475679_9064075400744745566.png?x-oss-process=image%2Fresize%2Cs_1000%2Fauto-orient%2C0%2Finterlace%2C1%2Fformat%2Cwebp%2Fquality%2Cq_80",
    //         title: "From Inazuma",

    //     }, {
    //         id: 2,
    //         name: "Nahida",
    //         img: "https://i.ex-cdn.com/mgn.vn/files/news/2022/12/22/genshin-impact-hay-can-than-voi-nhung-nguoi-choi-co-nahida-172220.jpg",
    //         title: "From Sumeru",

    //     }, {
    //         id: 3,
    //         name: "ZhongLi",
    //         img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuBlKkJ7IqXoC3hNmUIqpPpW9cW0kpEVPCQA&usqp=CAU",
    //         title: "From Liyue",

    //     }, {
    //         id: 4,
    //         name: "Venti",
    //         img: "https://fptshop.com.vn/Uploads/Originals/2023/1/18/638096547294993795_thumb.png",
    //         title: "From Monstard",

    //     }, {
    //         id: 5,
    //         name: "Furina",
    //         img: "https://i.ytimg.com/vi/aau-c8l5z9c/maxresdefault.jpg",
    //         title: "From Fontaine",

    //     },],
    // }

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
                    {dataSource.map((request) => (
                        <FR data={request} key={request.id} />
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