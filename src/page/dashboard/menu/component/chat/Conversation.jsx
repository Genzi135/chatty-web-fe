/* eslint-disable react/prop-types */
import React from "react";
import { FiMoreHorizontal } from "react-icons/fi";

const Conversation = ({ data }) => {

    const formatDate = (updatedAt) => {
        const today = new Date();
        const updatedDate = new Date(updatedAt);
        const isToday = updatedDate.getDate() === today.getDate() &&
            updatedDate.getMonth() === today.getMonth() &&
            updatedDate.getFullYear() === today.getFullYear();
        if (isToday) {
            const diff = today.getTime() - updatedDate.getTime();
            const minutes = Math.floor(diff / 60000);
            if (minutes === 0) {
                return "now";
            } else
                if (minutes >= 60) {
                    const hours = Math.floor(minutes / 60);
                    return `${hours} ${hours > 1 ? 'hours' : 'hour'} ago`;
                } else {
                    return `${minutes} ${minutes > 1 ? 'minutes' : 'minute'} ago`;
                }
        } else {
            return updatedDate.toLocaleString();
        }
    }

    const [isHover, setHover] = React.useState(false);

    const handleMouseEnter = React.useCallback(() => {
        setHover(true);
    }, []);

    const handleMouseLeave = React.useCallback(() => {
        setHover(false);
    }, []);

    // console.log(userMember, "u");
    React.useEffect(() => {
    }, [])
    return (
        <div>
            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ width: "100%", height: 90, display: "flex", justifyContent: 'space-between', alignItems: "center", padding: 10 }}
                className="hover:bg-gray-100">
                <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center', gap: 10 }} >
                    <div className="avatar">
                        <div className="w-12 rounded-full">
                            <img src={data.image} alt="avatar" />
                        </div>
                    </div>
                    <div>
                        <div className="stat-title text-black">
                            {data.name}
                        </div>
                        <div className="text">
                            {data.isReadMessage ? (<div className="text-gray-400 overflow-hidden text-ellipsis whitespace-nowrap w-40">
                                {data.lastMessage !== null ? data.lastMessage.content : ""}
                            </div>) : (<div className="text-black overflow-hidden text-ellipsis whitespace-nowrap w-40">
                                {data.lastMessage !== null ? data.lastMessage.content : ""}
                            </div>)}
                        </div>
                    </div>
                </div>
                {isHover ? (
                    <div>
                        <FiMoreHorizontal size={15} />

                    </div>
                ) : (
                    <div>
                        <div style={{ fontSize: 12 }}>{data.lastMessage !== null ? formatDate(data.lastMessage.updatedAt) : ""}</div>

                    </div>
                )}
            </div>
        </div>
    )
}

export default Conversation;