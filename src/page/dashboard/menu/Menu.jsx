import Chat from "./component/chat/Chat";
import Contact from "./component/contact/Contact";
import Search from "./component/search/Search";
//import Todo from "./component/todo/Todo";

export default function Menu({ selectedItem }) {
    return (
        <>
            <div style={{ width: 400, backgroundColor: 'white' }}>
                <Search />
                {selectedItem === "chat" && <Chat />}
                {selectedItem === "contact" && <Contact />}
                {/* {selectedItem === "todo" && <Todo />} */}
            </div>
        </>
    )
}