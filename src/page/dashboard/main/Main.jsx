import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../../data/DUMMY_DATA";
import { setLogOut, setLogin, setUser } from "../../../hooks/redux/reducer";
import DashBoard from "../Dashboard";
import AuthScreen from "../../authentication/AuthPage";
import React from "react";

const Main = () => {
    const isLogin = useSelector((state) => state.login);
    const dispatch = useDispatch();

    const getData = async () => {
        let userToken = JSON.parse(localStorage.getItem("userToken"));
        if (!userToken) {
            dispatch(setLogOut());
            return;
        }
        try {
            const respone = await axios({
                url: BASE_URL + "/api/v1/users/getMe",
                method: 'get',
                headers: { Authorization: `Bearer ${userToken}` },
            });
            dispatch(setUser(respone.data.data));
            dispatch(setLogin());
        } catch (error) {
            console.log(error);
            dispatch(setLogOut());
        }
    }

    React.useEffect(() => {
        getData();
    }, []);


    return (
        <>
            {isLogin ? (
                <DashBoard />
            ) : (
                <AuthScreen />
            )}
        </>
    )
}

export default Main;
