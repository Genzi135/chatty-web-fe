import axios from "axios";
import React from "react";
import { BASE_URL } from "../../../../../data/DUMMY_DATA";
import { useSelector } from "react-redux";
import { COLORS } from "../../../../../utils/COLORS";

const ForwardModal = ({ onClose }) => {
    const [dataSource, setDataSource] = React.useState([]);
    const [name, setName] = React.useState('');
    const [ava, setAva] = React.useState('');
    const [conversationId, setConversationId] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const userToken = JSON.parse(localStorage.getItem("userToken"));

    const mess = useSelector((state) => state.message)


    const getData = async () => {
        try {
            setLoading(true)
            const response = await axios({
                url: BASE_URL + "/api/v1/conservations",
                method: 'get',
                headers: { Authorization: `Bearer ${userToken}` },
            });
            setLoading(false)
            console.log(response);
            setDataSource(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleForwardMessage = async () => {
        if (mess) {
            try {
                const response = await axios({
                    url: BASE_URL + "/api/v1/conservations/" + `${conversationId}/messages/sendText`,
                    method: 'POST',
                    headers: { Authorization: `Bearer ${userToken}` },
                    data: {
                        content: mess
                    }
                });
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        }
        onClose()
    };

    const chatClick = (conversation) => {
        setName(conversation.name);
        setAva(conversation.image);
        setConversationId(conversation._id);
    };

    React.useEffect(() => {
        getData();
        setAva('');
        setName('')
    }, []);

    return (
        <div style={{ backgroundColor: "white", width: 400, height: 600, zIndex: 666, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 10 }}>

            <div style={{ color: 'black' }}>
                <div className="text-black p-3 text-lg font-semibold">
                    <h2>Forward message</h2>
                </div>
                <div className="mb-3">
                    <div className="overflow-hidden whitespace-normal mb-3 border shadow-lg p-2 rounded-md">
                        <div className="font-medium text-blue-700">
                            Message:
                        </div>
                        <div>
                            {mess}
                        </div>

                    </div>
                    <div className="mt-2 flex items-center gap-2 border p-2 rounded-md shadow-lg">
                        <div className="font-medium text-blue-700">
                            Send to:
                        </div>
                        {ava &&
                            <div className="flex items-center gap-1">
                                <div className="avatar">
                                    <div className="w-6 rounded-full">
                                        <img src={ava} alt="avatar" />
                                    </div>
                                </div>
                                <div>
                                    {name}
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className="overflow-auto max-h-max scroll-smooth">
                    {dataSource.map((e, index) => (
                        <div key={index} onClick={() => chatClick(e)}>
                            <div className="flex justify-start items-center gap-5 p-2 hover:bg-gray-100 overflow-hidden rounded">
                                <div className="avatar">
                                    <div className="w-12 rounded-full">
                                        <img src={e.image} alt="avatar" />
                                    </div>
                                </div>
                                <div>{e.name}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div style={{ display: "flex", justifyContent: 'flex-end', alignItems: "center", gap: 20, padding: 20, borderTopWidth: 1 }}>
                <div>
                    <form method="dialog" className="modal-backdrop" style={{ borderRightColor: 'red' }} >
                        <button
                            className=" hover:bg-gray-300 bg-gray-200"
                            style={{ width: 100, height: 45, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 5, fontWeight: '500' }}>
                            <h1 style={{ color: COLORS.text }}>Cancel</h1>
                        </button>
                    </form>
                </div>
                <div>
                    <button
                        onClick={() => { handleForwardMessage() }}
                        className="hover:bg-blue-700 bg-blue-600"
                        style={{ width: 100, height: 45, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 5, }}>
                        <h1 style={{ color: COLORS.whiteBG, fontWeight: '500' }}>{loading ? <div>
                            <span className="loading loading-dots loading-sm"></span>
                        </div> : <div>
                            Send
                        </div>}</h1>
                    </button>
                </div>
            </div>
        </div >
    );
};

export default ForwardModal;
