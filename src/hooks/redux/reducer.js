export const setView = (view) => ({
    type: 'CHANGE_VIEW',
    payload: view
})

export const setLogin = (auth) => ({
    type: 'SET_LOGIN',
    payload: auth,
})

export const setUser = (user) => ({
    type: "CHANGE_USER",
    payload: user
})

const initialState = {
    view: {
        menu: "Chat",
        main: "Chat",
    },
    user: {
        id: "",
        phoneNumber: "",
        email: "",
        password: "",
        fullName: "",
        nickName: "",
        gender: "",
        dob: "",
        avatar: "",
        bg: "",
        bio: "",
    },
    currentConversation: {
        id: "",
        ownerId: "",
        memberId: [],
        type: "",
        conversationName: "",
        lastMessageId: "",
        pinMessageId: [],
        createAt: "",
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_VIEW':
            return {
                ...state,
                view: action.payload,

            }
        case 'CHANGE_USER':
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
}

export default reducer;