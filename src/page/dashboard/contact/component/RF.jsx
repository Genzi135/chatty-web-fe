/* eslint-disable react/prop-types */
const RF = ({ data }) => {
    const handleRemove = (id) => {
        console.log("Remove: ", id)
    }
    const handleAddFriend = (id) => {
        console.log("Add: ", id)
    }
    return (
        <div style={{ width: "32%", display: 'flex', flexDirection: 'column', backgroundColor: 'white', padding: 10, gap: 10, borderRadius: 5 }}>
            <div className="flex justify-start gap-4">
                <div className="avatar ">
                    <div className="w-12 rounded-full">
                        <img src={data.img} alt="avatar" />
                    </div>
                </div>
                <div>
                    <div className="text-black">
                        {data.name}
                    </div>
                    <div style={{ fontSize: 13 }}>
                        {data.title}
                    </div>
                </div>
            </div>
            <div className="flex justify-around gap-4">
                <div className="bg-gray-200 flex justify-center items-center text-black hover:bg-gray-300" style={{ borderRadius: 3, width: "50%", height: 30, padding: 10, }}>
                    <button onClick={() => { handleRemove(data.id) }}>Remove</button>
                </div>
                <div className="bg-gray-200 flex justify-center items-center text-black hover:bg-gray-300" style={{ borderRadius: 3, width: "50%", height: 30, padding: 10, }}>
                    <button onClick={() => { handleAddFriend(data.id) }}>Add</button>
                </div>
            </div>
        </div>
    )
}
// eslint-disable-next-line react-refresh/only-export-components
export default RF;