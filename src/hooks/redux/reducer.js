/* eslint-disable no-case-declarations */
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

export const setListMessage = (arr) => ({
    type: 'SET_LIST_MESSAGE',
    payload: arr
})

export const setReplyMessage = (obj) => ({
    type: "REPLY_MESSAGE",
    payload: obj
})

export const addMess = (mess) => ({
    type: "ADD_MESSAGE",
    payload: mess
})

export const updateCoversation = (conversation) => ({
    type: "UPDATE_CONVERSATION",
    payload: conversation
})

export const updateConversationLastMessage = (conversationId, newLastMessage) => ({
    type: 'UPDATE_CONVERSATION_LAST_MESSAGE',
    payload: { conversationId, newLastMessage }
});

export const updateConversationIsReadMessageFalse = (conversationId) => ({
    type: 'UPDATE_CONVERSATION_IS_READ_MESSAGE_TRUE',
    payload: { conversationId }
});

export const setLastMessage = (lastMessage) => ({
    type: 'SET_LAST_MESSAGE',
    payload: lastMessage
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
    listMessage: []
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
        case 'SET_LIST_MESSAGE':
            return {
                ...state,
                listMessage: action.payload
            }
        case 'ADD_MESSAGE':
            return {
                ...state,
                listMessage: [...state.listMessage, action.payload]
            };
        case 'UPDATE_CONVERSATION':
            return {
                ...state,
                listConversation: state.listConversation.map(e => {
                    if (e._id === action.payload._id) {
                        return {
                            e: action.payload
                        }
                    }
                })
            }

        case 'UPDATE_CONVERSATION_LAST_MESSAGE':
            const { conversationId, newLastMessage } = action.payload;
            return {
                ...state,
                listConversation: state.listConversation.map(conversation => {
                    if (conversation._id === conversationId) {
                        return {
                            ...conversation,
                            lastMessage: newLastMessage
                        };
                    }
                    return conversation;
                })
            };
        case 'UPDATE_CONVERSATION_IS_READ_MESSAGE_TRUE':
            const { conversation_id } = action.payload;
            return {
                ...state,
                listConversation: state.listConversation.map(conversation => {
                    if (conversation._id === conversation_id) {
                        return {
                            ...conversation,
                            isReadMessage: true
                        };
                    }
                    return conversation;
                })
            };
        case 'SET_LAST_MESSAGE':
            return {
                ...state,
                currentConversation: {
                    ...state.currentConversation,
                    lastMessage: action.payload
                }
            }
        default:
            return state;
    }
}

export default reducer;