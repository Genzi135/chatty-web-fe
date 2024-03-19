import axios from "axios";
import { COLORS } from "../../../../../utils/COLORS";
import { BASE_URL } from "../../../../../data/DUMMY_DATA";

const UserCard = (data) => {

    const userToken = JSON.parse(localStorage.getItem("userToken"))


    const handleAddFriendRequest = async () => {
        console.log(data.data._id)
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
                    <button
                        onClick={() => handleAddFriendRequest()}
                        className="hover:bg-blue-200"
                        style={{ color: COLORS.bg, borderWidth: 1, borderColor: COLORS.bg, borderRadius: 10, width: 70, height: 35, fontSize: 15, fontWeight: 500 }}>
                        Add
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UserCard;