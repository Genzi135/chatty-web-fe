/* eslint-disable react/prop-types */
import React from "react";
import { FiMoreHorizontal } from "react-icons/fi";

const Conversation = ({ data }) => {

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
                            <img src={data.members[1].avatar} alt="avatar" />
                        </div>
                    </div>
                    <div>
                        <div className="stat-title text-black">
                            {data.name}
                        </div>
                        <div className="text">
                            {data.lastMessageId}
                        </div>
                    </div>
                </div>
                {isHover ? (
                    <div>
                        <FiMoreHorizontal size={15} />

                    </div>
                ) : (
                    <div>
                        <div>{data.createAt}</div>

                    </div>
                )}
            </div>
        </div>
    )
}

export default Conversation;