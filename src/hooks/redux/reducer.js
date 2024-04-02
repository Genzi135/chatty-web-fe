export const setView = (view) => ({
    type: 'CHANGE_VIEW',
    payload: view
})

export const setLogin = () => ({
    type: 'SET_LOGIN',
})

export const setLogOut = () => ({
    type: 'SET_LOGOUT',
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
    },
    login: false
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
        case 'SET_LOGIN':
            return {
                ...state,
                login: true
            }
        case 'SET_LOGOUT':
            return {
                ...state,
                login: false
            }
        default:
            return state;
    }
}

export default reducer;