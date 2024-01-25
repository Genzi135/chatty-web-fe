import React from "react";
import { FiMoreHorizontal } from "react-icons/fi";

export default function Conversation() {

    const [isHover, setHover] = React.useState(false);

    return (
        <div>
            <div
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                style={{ width: "100%", height: 90, display: "flex", justifyContent: 'space-between', alignItems: "center", padding: 10 }}
                className="hover:bg-gray-100">
                <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center', gap: 10 }} >
                    <div className="w-12 rounded-full">
                        <img src="https://res.cloudinary.com/diribdgsz/image/upload/v1704685598/chat-app/clone-avatar_a6lb3y.png" alt="avatar" />
                    </div>
                    <div>
                        <div className="stat-title text-black">
                            Name
                        </div>
                        <div className="text">
                            message
                        </div>
                    </div>
                </div>
                {isHover ? (
                    <div>
                        <FiMoreHorizontal size={15} />

                    </div>
                ) : (
                    <div>
                        <div>time</div>

                    </div>
                )}
            </div>
        </div>
    )
}