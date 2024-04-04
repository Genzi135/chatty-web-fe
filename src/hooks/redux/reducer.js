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

export const setCurrentMessage = (message) => ({
    type: "CHANGE_MESSAGE",
    payload: message
})

export const setListConversation = (arr) => ({
    type: 'SET_LIST_CONVERSATION',
    payload: arr
})

export const setReplyMessage = (obj) => ({
    type: "REPLY_MESSAGE",
    payload: obj
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
    currentConversation: {},
    login: false,
    message: "",
    listConversation: [],
    replyMessage: {},
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
        case 'CHANGE_MESSAGE':
            return {
                ...state,
                message: action.payload
            }
        case 'SET_LIST_CONVERSATION':
            return {
                ...state,
                listConversation: action.payload
            }
        case 'REPLY_MESSAGE':
            return {
                ...state,
                replyMessage: action.payload
            }
        default:
            return state;
    }
}

export default reducer;