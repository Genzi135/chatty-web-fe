import { VscMailRead } from "react-icons/vsc";
import { COLORS } from "../../../utils/COLORS";

const FriendRequest = () => {

    const dataSource = {
        listFriendRequest: [{}, {}, {}],
        listRequestSent: [{}, {}],
        listRecommendedFriend: [{}, {}, {}, {}, {}, {}, {}],
    }

    let numFriendRequest = dataSource.listFriendRequest.length;
    let numRequestSend = dataSource.listRequestSent.length;
    let numRecommendedFriend = dataSource.listRecommendedFriend.length; //limit 30
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
                    {dataSource.listFriendRequest.map((request, index) => (
                        <div
                            key={index}
                            style={{ width: "32%", display: 'flex', flexDirection: 'column', backgroundColor: 'white', padding: 10, gap: 10, borderRadius: 5 }}>
                            <div className="flex justify-start gap-4">
                                <div className="avatar ">
                                    <div className="w-12 rounded-full">
                                        <img src="https://res.cloudinary.com/diribdgsz/image/upload/v1706161304/chat-app/ava_prof_lk8bos.jpg" alt="avatar" />
                                    </div>
                                </div>
                                <div>
                                    <div className="text-black">
                                        Name
                                    </div>
                                    <div style={{ fontSize: 13 }}>
                                        { } from phone number
                                    </div>
                                </div>
                            </div>
                            <div style={{ width: '100%', height: 50, padding: 0 }}>
                                <div
                                    className="bg-gray-50"
                                    style={{ borderWidth: 1, borderRadius: 5, width: '100%', height: "100%", padding: 10 }}>
                                    <div className="text-black">
                                        Hello! can i be your friend?
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-around gap-4">
                                <div className="bg-gray-200 flex justify-center items-center text-black hover:bg-gray-300" style={{ borderRadius: 3, width: "50%", height: 30, padding: 10, }}>
                                    <button>Reject</button>
                                </div>
                                <div className="bg-gray-200 flex justify-center items-center text-black hover:bg-gray-300" style={{ borderRadius: 3, width: "50%", height: 30, padding: 10, }}>
                                    <button>Accept</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ height: 70, width: "100%", display: "flex", justifyContent: "flex-start", alignItems: 'center', padding: 20, }}>
                    <h1 style={{ fontWeight: "500", color: COLORS.text, cursor: "default" }}>Requests sent ({numRequestSend})</h1>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', padding: 20, gap: 20 }}>
                    {dataSource.listRequestSent.map((request, index) => (
                        <div
                            key={index}
                            style={{ width: "32%", display: 'flex', flexDirection: 'column', backgroundColor: 'white', padding: 10, gap: 10, borderRadius: 5 }}>
                            <div className="flex justify-start gap-4">
                                <div className="avatar ">
                                    <div className="w-12 rounded-full">
                                        <img src="https://res.cloudinary.com/diribdgsz/image/upload/v1706161304/chat-app/ava_prof_lk8bos.jpg" alt="avatar" />
                                    </div>
                                </div>
                                <div>
                                    <div className="text-black">
                                        Name
                                    </div>
                                    <div style={{ fontSize: 13 }}>
                                        tittle
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-around gap-4">
                                <div className="bg-gray-200 flex justify-center items-center text-black hover:bg-gray-300" style={{ borderRadius: 3, width: "100%", height: 30, padding: 10, }}>
                                    <button>Cancel request</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{ height: 70, width: "100%", display: "flex", justifyContent: "flex-start", alignItems: 'center', padding: 20, }}>
                    <h1 style={{ fontWeight: "500", color: COLORS.text, cursor: "default" }}>Recommended Friends ({numRecommendedFriend})</h1>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', padding: 20, gap: 20 }}>
                    {dataSource.listRecommendedFriend.map((request, index) => (
                        <div
                            key={index}
                            style={{ width: "32%", display: 'flex', flexDirection: 'column', backgroundColor: 'white', padding: 10, gap: 10, borderRadius: 5 }}>
                            <div className="flex justify-start gap-4">
                                <div className="avatar ">
                                    <div className="w-12 rounded-full">
                                        <img src="https://res.cloudinary.com/diribdgsz/image/upload/v1706161304/chat-app/ava_prof_lk8bos.jpg" alt="avatar" />
                                    </div>
                                </div>
                                <div>
                                    <div className="text-black">
                                        Name
                                    </div>
                                    <div style={{ fontSize: 13 }}>
                                        { } mutual groups
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-around gap-4">
                                <div className="bg-gray-200 flex justify-center items-center text-black hover:bg-gray-300" style={{ borderRadius: 3, width: "50%", height: 30, padding: 10, }}>
                                    <button>Remove</button>
                                </div>
                                <div className="bg-gray-200 flex justify-center items-center text-black hover:bg-gray-300" style={{ borderRadius: 3, width: "50%", height: 30, padding: 10, }}>
                                    <button>Add friend</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FriendRequest;