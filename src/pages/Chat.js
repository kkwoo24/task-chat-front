import React, { useEffect, useState, useRef} from "react";
import chatAPI from "../services/ChatApi";

function Chat({ currentUser, selectedRoom }) {
    const [messages, setMessages] = useState([]);
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "auto" });
    };

    useEffect(() => {
        const fetchMessages = async (chatRoomId) => {
            try {
                const roomMessages = await chatAPI.getChatRoomMessages(chatRoomId);
                setMessages(roomMessages);
                scrollToBottom();
            } catch (error) {
                console.error("Failed to load chat messages", error);
            }
        };

        if (selectedRoom.chatRoomId) {
            fetchMessages(selectedRoom.chatRoomId);
        }
    }, [selectedRoom]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const formattingTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        let hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
        let min = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
        return `${hour}:${min}`;
    };

    return (
        <div className="chat-middle">
            {messages.map((msg) => (
                <li
                    className={`chat-bubble ${
                        msg.memberId === currentUser.chatMemberId ? "send" : "receive"
                    }`}
                    key={msg.seq}
                >
                    <span>{msg.memberName}</span>
                    <p>{msg.message}</p>
                    <span>{formattingTimestamp(msg.sendDateTime)}</span>
                </li>
            ))}
        </div>
    );
}

export default Chat;