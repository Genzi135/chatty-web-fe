/* eslint-disable react/prop-types */
import FriendList from "./FriendList";
import FriendRequest from "./FriendRequest";
import GroupList from "./GroupList";

const Contact = ({ menu }) => {
    return (
        <div style={{ width: "100%", height: '100%' }}>
            <div style={{ width: '100%', height: '100%' }}>
                {/* <FriendList /> */}
                {/* <GroupList /> */}
                {/* <FriendRequest /> */}
                {menu === "FR" && <FriendList />}
                {menu === "GL" && <GroupList />}
                {menu === "RS" && <FriendRequest />}
            </div>
        </div>
    )
}

export default Contact;