export default function Conversation() {

    return (
        <div>
            <div style={{ width: "100%", height: 90, display: "flex", justifyContent: 'space-between', alignItems: "center", padding: 10 }}
                className="hover:bg-gray-100">
                <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center', gap: 10 }}>
                    <img src="https://res.cloudinary.com/diribdgsz/image/upload/v1704685598/chat-app/clone-avatar_a6lb3y.png" style={{ width: 60, height: 60 }} />
                    <div>
                        <div style={{ color: 'black', fontWeight: '500' }}>
                            Name
                        </div>
                        <div>
                            message
                        </div>
                    </div>
                </div>
                <div>
                    time
                </div>
            </div>
        </div>
    )
}