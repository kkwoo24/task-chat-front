import Axios from "axios";

const kafka = Axios.create({
    baseURL: "http://localhost:9092/kafka",
});

const axios = Axios.create({
    baseURL: "http://localhost:8092/api",
});

const chatAPI = {
    getMessages: (groupId) => {
        console.log("Calling get messages from API");
        return kafka.get(`/messages/${groupId}`);
    },

    login: async (memberLoginId) => {
        try {
            const response = await axios.post(`/login`, { memberLoginId: memberLoginId });
            return response.data.payload;
        } catch (error) {
            console.error("Login failed", error);
            throw error;
        }
    },

    sendMessage: (chatMemberId, chatRoomId, text) => {
        return axios.post(`/chat/message/send`, {
            "chatRoomId": chatRoomId,
            "memberId": chatMemberId,
            "message": text
        }, {
            headers: { "Content-Type": "application/json" },
        });
    },

    getChatRooms: async (memberId) => {
        try {
            const response = await axios.post(`/chat/rooms`, { memberId: memberId });
            return response.data.payload;
        } catch (error) {
            console.error("Failed to load chat room", error);
            throw error;
        }
    },

    createChatRoom: async (roomName, creatorId, memberIds) => {
        try {
            const response = await axios.post(`/chat/create`, {
                "chatRoomName": roomName,
                "creatorId": creatorId,
                "memberIds": memberIds
            });
            return response.data.payload;
        } catch (error) {
            console.error("Failed to create chat room", error);
            throw error;
        }
    },

    getChatRoomMessages: async (chatRoomId) => {
        try {
            const response = await axios.post(`/chat/logs`, { chatRoomId: chatRoomId });
            return response.data.payload;
        } catch (error) {
            console.error("Failed to load chat log", error);
            throw error;
        }
    }

};

export default chatAPI;