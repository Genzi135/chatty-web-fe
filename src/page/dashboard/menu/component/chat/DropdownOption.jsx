export default function DropdownOption() {
    return (
        <>
            <div style={{ position: 'absolute', backgroundColor: 'white', width: 230, gap: 15, marginRight: 175, marginTop: 165, color: 'black', borderRadius: 5 }}
                className="shadow-xl border"
            >
                <ul className="menu">
                    <li>
                        <div>
                            Mark as read
                        </div>
                    </li>
                    <li>
                        <div style={{ borderBottomWidth: 1 }}>
                            Send broadcast messages
                        </div>
                    </li>
                    <li>
                        <div>
                            Switch to classic design
                        </div>
                    </li>
                </ul>
            </div>
        </>
    )
}