import { createContext, useContext, useEffect } from "react";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";

const SocketContext = createContext();

const socket = io("http://ec2-52-221-252-41.ap-southeast-1.compute.amazonaws.com:8555");

export const SocketProvider = ({ children }) => {
    const currentUser = useSelector((state) => state.user);
    useEffect(() => {
        console.log("context render")
        if (currentUser) {
            // const { email, phone, name, _id } = currentUser
            // console.log("user_connected", _id);
            // socket.emit("user_connected", { userId: _id });

            socket.on('connect', () => {
                console.log('Kết nối thành công với máy chủ');
                socket.emit('user_connected', { userId: currentUser._id });
            });
            console.log("emitted");
        }
        return () => {
            socket.disconnect();
        }
    }, [currentUser])

    return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>
}

export const useSocket = () => {
    return useContext(SocketContext);
}