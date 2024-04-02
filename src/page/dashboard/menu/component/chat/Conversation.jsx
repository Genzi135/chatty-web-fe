/* eslint-disable react/prop-types */
import React from "react";
import { FiMoreHorizontal } from "react-icons/fi";

const Conversation = ({ data }) => {
    function formatTime(datetimeString) {
        const datetime = new Date(datetimeString);
        const hour = datetime.getHours().toString().padStart(2, '0');
        const minute = datetime.getMinutes().toString().padStart(2, '0');
        return `${hour}:${minute}`;
    }
    const formatDate = (updatedAt) => {
        const today = new Date();
        const updatedDate = new Date(updatedAt);
        const isToday = updatedDate.getDate() === today.getDate() &&
            updatedDate.getMonth() === today.getMonth() &&
            updatedDate.getFullYear() === today.getFullYear();
        if (isToday) {
            const diff = today.getTime() - updatedDate.getTime();
            const minutes = Math.floor(diff / 60000);
            return `${minutes} minutes ago`;
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
                            {data.lastMessage !== null ? data.lastMessage.content : ""}
                        </div>
                    </div>
                </div>
                {isHover ? (
                    <div>
                        <FiMoreHorizontal size={15} />

                    </div>
                ) : (
                    <div>
                        <div>{data.lastMessage !== null ? formatDate(data.lastMessage.updatedAt) : ""}</div>

                    </div>
                )}
            </div>
        </div>
    )
}

export default Conversation;