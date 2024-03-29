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

export const setConversation = (conversation) => ({
    type: "CHANGE_CONVERSATION",
    payload: conversation
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
        dateOfBirth: "",
        avatar: "",
        bg: "",
        bio: "",
    },
    currentConversation: {
        // id: "",
        // ownerId: "",
        // members: [],
        // type: "",
        // conversationName: "",
        // lastMessageId: "",
        // pinMessageId: [],
        // createAt: "",
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
        case 'CHANGE_CONVERSATION':
            return {
                ...state,
                currentConversation: action.payload
            }
        default:
            return state;
    }
}

export default reducer;