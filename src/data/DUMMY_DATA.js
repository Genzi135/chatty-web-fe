//url
//ava: https://res.cloudinary.com/diribdgsz/image/upload/v1706161303/chat-app/ava_mdynxx.jpg
//ava2: https://res.cloudinary.com/diribdgsz/image/upload/v1706161304/chat-app/ava_prof_lk8bos.jpg
//bg: https://res.cloudinary.com/diribdgsz/image/upload/v1706161305/chat-app/Background-IUH_snuqnj.jpg
//bgClone: https://res.cloudinary.com/diribdgsz/image/upload/v1704685988/chat-app/clone-background_bb1l7i.png
//avaClone: https://res.cloudinary.com/diribdgsz/image/upload/v1704685598/chat-app/clone-avatar_a6lb3y.png

export const BASE_URL = "//ec2-52-221-252-41.ap-southeast-1.compute.amazonaws.com:8555";


export const pageimg = [
    "https://chat.zalo.me/assets/quick-message-onboard.3950179c175f636e91e3169b65d1b3e2.png",
    "https://chat.zalo.me/assets/vanish_onboard.95edcd15d875cae4d6d504d739eaa977.png",
    "https://chat.zalo.me/assets/inapp-welcome-screen-04.ade93b965a968b16f2203e9d63b283a7.jpg",
    "https://chat.zalo.me/assets/inapp-welcome-screen-02.7f8cab265c34128a01a19f3bcd5f327a.jpg",

]
const DUMMY_DATA = {
    user: [
        {
            id: "u1",
            phoneNumber: "0948743637",
            email: "phu13052002@gmail.com",
            password: "123",
            fullName: "Huynh Phu",
            nickName: "Genzi",
            gender: "Male",
            dob: "2002-05-13",
            avatar: "https://res.cloudinary.com/diribdgsz/image/upload/v1706161303/chat-app/ava_mdynxx.jpg",
            bg: " https://res.cloudinary.com/diribdgsz/image/upload/v1706161305/chat-app/Background-IUH_snuqnj.jpg",
            bio: "Hello i'm Genzi",
            isActive: true,
            isDelete: false,
            // friendList: [{
            //     userId: "u2",
            //     fullName: "Uchiha Sasuke",
            //     nickName: "Sax",
            //     avatar: "https://res.cloudinary.com/diribdgsz/image/upload/v1706161304/chat-app/ava_prof_lk8bos.jpg",
            //     isBlock: false
            // }, {
            //     userId: "u3",
            //     fullName: "Uzumaki Naruto",
            //     nickName: "Kyubi",
            //     avatar: "https://res.cloudinary.com/diribdgsz/image/upload/v1704685598/chat-app/clone-avatar_a6lb3y.png",
            //     isBlock: false,
            // }],
        }, {
            id: "u2",
            phoneNumber: "0948743638",
            email: "13052002@gmail.com",
            password: "321",
            fullName: "Uchiha Sasuke",
            nickName: "Sac",
            gender: "Male",
            dob: "2002-05-13",
            avatar: "https://res.cloudinary.com/diribdgsz/image/upload/v1706161304/chat-app/ava_prof_lk8bos.jpg",
            bg: " https://res.cloudinary.com/diribdgsz/image/upload/v1706161305/chat-app/Background-IUH_snuqnj.jpg",
            bio: "Hello i'm Sasuke",
            isActive: true,
            isDelete: false,
        }, {
            id: "u3",
            phoneNumber: "0948743639",
            email: "naruto@gmail.com",
            password: "999",
            fullName: "Uzumaki Naruto",
            nickName: "Kyubi",
            gender: "Male",
            dob: "2002-05-13",
            avatar: "https://res.cloudinary.com/diribdgsz/image/upload/v1704685598/chat-app/clone-avatar_a6lb3y.png",
            bg: " https://res.cloudinary.com/diribdgsz/image/upload/v1706161305/chat-app/Background-IUH_snuqnj.jpg",
            bio: "Hello i'm Naruto",
            isActive: true,
            isDelete: false,
        }, {
            id: "u4",
            phoneNumber: "0948743636",
            email: "sakura@gmail.com",
            password: "666",
            fullName: "Haruno Sakura",
            nickName: "Sakura",
            gender: "Female",
            dob: "2002-05-13",
            avatar: "https://res.cloudinary.com/diribdgsz/image/upload/v1704685598/chat-app/clone-avatar_a6lb3y.png",
            bg: " https://res.cloudinary.com/diribdgsz/image/upload/v1706161305/chat-app/Background-IUH_snuqnj.jpg",
            bio: "SaaaaaaaaaaaaaaSuuuuuuuuuuKeeeeeeeeeeeeee",
            isActive: true,
            isDelete: false,
        }
    ],
    conversation: [
        {
            id: "u1u2c",
            ownerId: "",
            memberId: ["u1", "u2"],
            type: "p2p",
            conversationName: "test 1",
            lastMessageId: "u1u3cm5",
            pinMessageId: ["u1u3cm2", "u1u3cm3"],
            createAt: "2024-01-01",
        }, {
            id: "u1u3c",
            ownerId: "",
            memberId: ["u1", "u3"],
            type: "p2p",
            conversationName: "test-u1u3",
            lastMessageId: "u1u3m2",
            pinMessageId: [],
            createAt: "2024-01-12",
        }, {
            id: "u1u2u3c",
            ownerId: "u1",
            memberId: ["u1", "u3", "u2"],
            type: "group",
            conversationName: "test-u1u2u3",
            lastMessageId: "",
            pinMessageId: [],
            createAt: "2024-01-12",
        },
    ],
    messages: [
        {
            id: "m1",
            userId: "u1",
            conversationId: "u1u2u3c",
            createAt: "2024-01-12",
            text: "Hello guys",
            isUnSend: false,
            reacts: [{ userId: "u2", type: 0 }],
            replyTo: { messageId: "" },
            tags: { userId: "" },
            image: "",
            video: "",
            status: "receive",
        }, {
            id: "m2",
            userId: "u2",
            conversationId: "u1u2u3c",
            createAt: "2024-01-12",
            text: "Hi",
            isUnSend: false,
            reacts: [{ userId: "u3", type: 1 }],
            replyTo: { messageId: "m1" },
            tags: { userId: "" },
            image: "",
            video: "",
            status: "sent",
        },
    ],
    friend: [
        {
            userId: "u1",
            userIds: ["u2", "u3"]
        }, {
            userId: "u2",
            userIds: ["u1", "u3"]
        }, {
            userId: "u3",
            userIds: ["u2", "u1"]
        }
    ],
    friendRequest: [{
        id: "fr1",
        createAt: "2024-01-11",
        senderID: "u4",
        receiverID: "u1",
    }
    ],
}

export default DUMMY_DATA;