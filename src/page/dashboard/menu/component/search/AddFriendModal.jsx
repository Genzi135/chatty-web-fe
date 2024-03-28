import { BsXLg } from "react-icons/bs";
import { COLORS } from "../../../../../utils/COLORS";
import React from "react";
import axios from "axios";
import { BASE_URL } from "../../../../../data/DUMMY_DATA";
import UserCard from "./UserCard";

const AddFriendModal = () => {
    const [phoneInput, setPhoneInput] = React.useState('');
    const [dataSource, setDataSource] = React.useState(null);
    const [report, setReport] = React.useState('');

    const [loading, setLoading] = React.useState(false);

    const userToken = JSON.parse(localStorage.getItem("userToken"))

    const handleInput = (text) => {
        setPhoneInput(text)
    }

    const handleSearch = async () => {
        if (phoneInput.length !== 10) {
            setReport("phone number must be 10 character")
            setDataSource(null)
        } else {
            try {
                setLoading(true);
                const respone = await axios({
                    url: BASE_URL + "/api/v1/users/findByPhone/" + phoneInput,
                    headers: { Authorization: `Bearer ${userToken}` },
                })
                console.log(respone)
                setReport('')
                try {
                    const res = await axios({
                        url: BASE_URL + "/api/v1/users/" + respone.data.data._id,
                        headers: { Authorization: `Bearer ${userToken}` },
                    })
                    console.log(res)
                    setDataSource(res.data.data)
                    setReport('')
                } catch (error) {
                    console.log(error)
                    setReport(error.response.data.message)
                }
            } catch (error) {
                console.log(error)
                setReport(error.response.data.message)
            }
        }
        setLoading(false);

    }

    React.useEffect(() => {
        setReport('')
        setDataSource(null)
    }, [phoneInput])

    return (
        <div style={{ width: 450, backgroundColor: 'white', height: "70%", borderRadius: 5, color: COLORS.text, display: "flex", flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderBottomWidth: 0.7 }}>
                    <h1 style={{ fontWeight: '500' }}>Add friend</h1>
                    <div>
                        <form method="dialog" className="modal-backdrop" style={{ borderRightColor: 'red' }} >
                            <button
                                className=" hover:bg-gray-200"
                                style={{ width: 35, height: 35, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 30, }}>
                                <BsXLg size={25} color={COLORS.text} />
                            </button>
                        </form>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: "space-between", alignItems: 'center', padding: 10 }}>
                    <div style={{ borderBottomWidth: 1, width: '20%', height: 40, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <h1 style={{ fontWeight: "400" }}>VN +84</h1>
                    </div>
                    <div style={{ borderBottomWidth: 1, width: "70%" }}>
                        <input onChange={(e) => handleInput(e.target.value)} type="text" placeholder="Phone number" style={{ width: "100%", height: 40, backgroundColor: COLORS.whiteBG, padding: 10, outline: "none" }} />
                    </div>
                </div>
                <div style={{ padding: 10 }}>
                    <h1 style={{ color: 'red', fontSize: 15 }}>
                        {report}
                    </h1>
                </div>
                <div>
                    {/* list in here */}
                    {dataSource && <UserCard data={dataSource} />}
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
                        onClick={() => { handleSearch() }}
                        className="hover:bg-blue-700 bg-blue-600"
                        style={{ width: 100, height: 45, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 5, }}>
                        <h1 style={{ color: COLORS.whiteBG, fontWeight: '500' }}>{loading ? <div>
                            <span className="loading loading-dots loading-sm"></span>
                        </div> : <div>
                            Search
                        </div>}</h1>
                    </button>
                </div>
            </div>

        </div>
    )
}

export default AddFriendModal;