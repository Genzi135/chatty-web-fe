
var data = [{
    username: "123",
    password: "123",
    remember: false
}];

export default data;

//user
export const user = [
    {
        id: 1,
        phoneNumber: '0123456789',
        password: '123',
        fullName: 'Nguyen Van A',
        nickName: 'A Nguyen',
        gender: "Male",
        dayOfBirth: '19-10-2002',
        avatar: " ",
        backgroundImage: " ",
        bio: " ",
        friendsList: [
            {
                user_id: 2,
                fullName: "Huynh Trieu Phu",
                nickName: "Genzi135",
            }, {
                user_id: 3,
                fullName: "Nguyen Chi Hieu",
                nickName: "January14th",
            },
        ],
    },
]

//conversation
export const conversation = [
    {
        id: 1,
        member_id: [1, 2],
        type: 'p2p',
        conversationName: 'testConversation',
        avatar: "",
        bgImage: "", //if don't set take img user to set image
        mute: "", //set time to mute this conversation 2h-4h-6h-8h-12h-when turn on
        createTime: "12:12:00-12-12-2023",
        pin: true,
        hide: false,
        label: "",
        link: "",
        member: 2,
        remindTime: {
            time: "19:24:13-13/10/2023",
            content: "",
            repeat: "daily" //repeat notification for daily-weekly-monthly 
        },
        messagePin: [
            {
                message_id: 16,
            }, {
                message_id: 12,
            }
        ],
        imageList: [
            {
                message_id: 16,
            }, {
                message_id: 12,
            }
        ],
        videoList: [
            {
                message_id: 13,
            }, {
                message_id: 14,
            }
        ],
        linkList: [
            {
                message_id: 10,
            }, {
                message_id: 11,
            }
        ]
    },
    {
        id: 2,
        member_id: [1, 2, 3, 4, 5],
        type: 'group',
        conversationName: 'testConversation',
        avatar: "", //if don't set background to white, if have set bgImage by this avatar
        bgImage: "",
        createTime: "12:12:00-12-12-2023",
        pin: true,
        hide: false,
        label: "",
        link: "",
        member: 100,
        remindTime: {
            time: "19:24:13-13/10/2023",
            content: "",
            repeat: "daily" //repeat notification for daily-weekly-monthly 
        },
        messagePin: [
            {
                message_id: 16,
            }, {
                message_id: 12,
            }
        ],
        imageList: [
            {
                message_id: 16,
            }, {
                message_id: 12,
            }
        ],
        videoList: [
            {
                message_id: 13,
            }, {
                message_id: 14,
            }
        ],
        linkList: [
            {
                message_id: 10,
            }, {
                message_id: 11,
            }
        ]

    }
]

//message
export const message = [
    {
        id: 1,
        userID: 1,
        conversationID: 1,
        timeSent: '19:24:13-13/10/2023',
        status: 'viewed', //sent - recieved - view - delete
        pin: false, //true-false
        text: 'Hello world',
        image: "",
        video: "",
        file: "",
        icon: "",
        sticker: "",
        unSend: false,
        deleteForMeOnly: false,
        star: false,
        replyFor: {
            message_id: 1,
            message_content: ""
        },


    },

]
