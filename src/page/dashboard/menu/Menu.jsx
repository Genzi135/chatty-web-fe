import Chat from "./component/chat/Chat";
import Contact from "./component/contact/Contact";
import Search from "./component/search/Search";
//import Todo from "./component/todo/Todo";

// eslint-disable-next-line react/prop-types
export default function Menu({ selectedItem }) {
    return (
        <>
            <div style={{ width: 400, backgroundColor: 'white', borderRightWidth: 1 }}>
                <Search />
                {selectedItem === "Chat" && <Chat />}
                {selectedItem === "Contact" && <Contact />}
                {/* {selectedItem === "todo" && <Todo />} */}
            </div>
        </>
    )
}