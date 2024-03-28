import axios from "axios";
import { COLORS } from "../../../../../utils/COLORS";
import { BASE_URL } from "../../../../../data/DUMMY_DATA";
import React from "react";

const UserCard = (data) => {

    const [loading, setLoading] = React.useState(false);

    const userToken = JSON.parse(localStorage.getItem("userToken"))

    console.log(data)

    const handleAddFriendRequest = async () => {
        setLoading(true)
        try {
            const respone = await axios({
                url: BASE_URL + "/api/v1/friends/request/" + data.data._id,
                method: 'post',
                headers: { Authorization: `Bearer ${userToken}` },
            })
            console.log(respone)

        } catch (error) {
            console.log(error)

        }
        setLoading(false)

    }
    return (
        <div style={{ padding: 10, }}>
            <div
                style={{ width: "100%", height: 90, display: "flex", justifyContent: 'space-between', alignItems: "center", padding: 10, borderWidth: 1, borderRadius: 10 }}
            >
                <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center', gap: 10 }} >
                    <div className="w-12 rounded-full">
                        <img src={data.data.avatar} alt="avatar" style={{ borderRadius: 30 }} />
                    </div>
                    <div >
                        <div className="stat-title text-black">
                            {data.data.name}
                        </div>
                    </div>
                </div>

                <div>
                    {data.data.friend === null ? <button
                        onClick={() => handleAddFriendRequest()}
                        className="hover:bg-blue-200"
                        style={{ color: COLORS.bg, borderWidth: 1, borderColor: COLORS.bg, borderRadius: 10, width: 70, height: 35, fontSize: 15, fontWeight: 500 }}>
                        {loading ? <div>
                            <span className="loading loading-dots loading-sm"></span>
                        </div> : <div>
                            ADD
                        </div>}
                    </button> : <button
                        className=""
                        style={{ color: 'grey', borderWidth: 1, borderColor: 'grey', borderRadius: 10, width: 70, height: 35, fontSize: 15, fontWeight: 500 }}
                    >ADD</button>
                    }

                </div>
            </div>
        </div>
    )
}

export default UserCard;