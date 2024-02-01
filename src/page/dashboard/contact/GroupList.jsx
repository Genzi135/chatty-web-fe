import { FiMoreHorizontal } from "react-icons/fi";
import { COLORS } from "../../../utils/COLORS";
import { PiUsersLight } from "react-icons/pi";

const GroupList = () => {
    const dataSource = {
        listFriend: [
            {
                ava: 'https://res.cloudinary.com/diribdgsz/image/upload/v1706161304/chat-app/ava_prof_lk8bos.jpg',
                name: 'A',
                member: 12
            }, {
                ava: 'https://res.cloudinary.com/diribdgsz/image/upload/v1706161304/chat-app/ava_prof_lk8bos.jpg',
                name: 'C',
                member: 5
            }, {
                ava: 'https://res.cloudinary.com/diribdgsz/image/upload/v1706161304/chat-app/ava_prof_lk8bos.jpg',
                name: 'B',
                member: 78
            }, {
                ava: 'https://res.cloudinary.com/diribdgsz/image/upload/v1706161304/chat-app/ava_prof_lk8bos.jpg',
                name: 'D',
                member: 123
            },
        ]
    }

    const sortList = dataSource.listFriend.sort((a, b) => a.name.localeCompare(b.name));
    let numGroups = dataSource.listFriend.length;


    return (
        <div style={{ width: "100%", height: "100%", display: 'flex', flexDirection: 'column' }}>
            <div
                style={{ height: 70, backgroundColor: COLORS.whiteBG, display: "flex", justifyContent: "flex-start", alignItems: 'center', padding: 20, gap: 20, color: COLORS.text }}>
                <PiUsersLight size={25} />
                <h1 style={{ fontWeight: '500', cursor: "default" }}>Joined Groups</h1>
            </div>
            <div className="bg-gray-100"
                style={{ height: "100%", width: "100%", overflow: 'hidden', overflowY: 'auto' }}>
                <div style={{ height: 70, width: "100%", display: "flex", justifyContent: "flex-start", alignItems: 'center', padding: 20, }}>
                    <h1 style={{ fontWeight: "500", color: COLORS.text, cursor: "default" }}>Groups ({numGroups})</h1>
                </div>
                <div style={{ backgroundColor: COLORS.whiteBG, marginLeft: 15, marginRight: 15, borderTopLeftRadius: 5, borderTopRightRadius: 5, gap: 10 }}>
                    <div style={{ height: 60, display: 'flex', alignItems: 'center', gap: 20, padding: 15 }}>
                        <input type="input" placeholder="Search" className="input w-72 h-8 max-w-xs bg-gray-100" style={{ color: 'black' }} />
                        <div className="w-60 h-8 max-w-xs bg-gray-300 text-black flex items-center" style={{ borderRadius: 2, paddingLeft: 10, paddingRight: 10 }}>
                            Name
                        </div>
                    </div>
                    {
                        sortList.map((friend, index) => (
                            <div
                                key={index}
                                style={{ height: 60, width: '100%', display: "flex", justifyContent: 'space-between', alignItems: 'center', padding: 10, }}
                                className=" hover:bg-gray-200">
                                <div className="flex items-center flex-row gap-6">
                                    <div className="avatar">
                                        <div className="w-10 rounded-full">
                                            <img src={friend.ava} alt="avatar" />
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{ color: COLORS.text }}>
                                            {friend.name}
                                        </div>
                                        <div style={{ fontSize: 12 }}>
                                            {friend.member} members
                                        </div>
                                    </div>
                                </div>
                                <div
                                    //ref={dropdownRef}
                                    style={{ height: 30, width: 30, borderRadius: 2, display: "flex", justifyContent: 'center', alignItems: 'center', position: "relative" }}
                                    className="hover:bg-gray-300 cursor-pointer"
                                //onClick={() => { handleSelectOption() }}
                                >
                                    <FiMoreHorizontal size={18} />
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}

export default GroupList;