import axios from "axios"
import { BASE_URL } from "../../../../data/DUMMY_DATA"

/* eslint-disable react/prop-types */
const FR = ({ data }) => {

    const userToken = JSON.parse(localStorage.getItem("userToken"))

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

            console.log("handle")
            //handleOpenConversation(id);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div
            key={data.id}
            style={{ width: "32%", display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'white', padding: 10, gap: 10, borderRadius: 5 }}>
            <div className="flex justify-start gap-4">
                <div className="avatar ">
                    <div className="w-12 rounded-full">
                        <img src={data.avatar} alt="avatar" />
                    </div>
                </div>
                <div>
                    <div className="text-black">
                        {data.name}
                    </div>
                    {/* <div style={{ fontSize: 13 }}>
                        {data.data.reason}
                    </div> */}
                </div>
            </div>
            {/* <div style={{ width: '100%', maxHeight: "100%", padding: 0 }}>
                <div
                    className="bg-gray-50"
                    style={{ borderWidth: 1, borderRadius: 5, width: '100%', height: "100%", padding: 10 }}>
                    <div className="text-black">
                        {data.data.requestText}
                    </div>
                </div>
            </div> */}
            <div className="flex justify-around gap-4">
                <div className="bg-gray-200 flex justify-center items-center text-black hover:bg-gray-300" style={{ borderRadius: 3, width: "50%", height: 30, padding: 10, }}>
                    <button onClick={() => { handleReject(data._id) }}>Reject</button>
                </div>
                <div className="bg-gray-200 flex justify-center items-center text-black hover:bg-gray-300" style={{ borderRadius: 3, width: "50%", height: 30, padding: 10, }}>
                    <button onClick={() => { handleAccept(data._id) }}>Accept</button>
                </div>
            </div>
        </div>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export default FR;