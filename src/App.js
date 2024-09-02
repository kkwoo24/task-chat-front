import React, { useState } from "react";
import chatApi from "./services/ChatApi";

import "./styles.css";

import Chat from "./pages/Chat";
import Input from "./pages/Input";
import Login from "./pages/Login";
import ChatRooms from "./pages/ChatRoom";

function App() {
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState(null);
    const [chatRooms, setChatRooms] = useState([]); // State for chat rooms
    const [selectedRoom, setSelectedRoom] = useState(null); // State for selected chat room

    const handleLoginSubmit = (memberInfo) => {
        memberInfo.color = randomColor();
        setUser(memberInfo);
        fetchChatRooms(memberInfo.chatMemberId);
    };

    const fetchChatRooms = (memberId) => {
        // Fetch chat rooms from the server
        chatApi.getChatRooms(memberId).then((rooms) => {
            setChatRooms(rooms);
        }).catch((e) => {
            console.log(e);
        });
    };

    const handleRoomSelect = (room) => {
        setSelectedRoom(room);
    };

    const handleMessageSubmit = (chatRoomId, msg) => {
        chatApi
        .sendMessage(user.chatMemberId, chatRoomId, msg)
        .then((res) => {
            console.log("sent", res);
        })
        .catch((e) => {
            console.log(e);
        });
    };

    const randomColor = () => {
        return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
    };

    return (
        <>
            {user !== null ? (
                selectedRoom ? (
                    <div className="chat-container">

                        <Chat messages={messages} currentUser={user} selectedRoom={selectedRoom} />
                        <Input chatRoomId={selectedRoom.chatRoomId} handleOnSubmit={handleMessageSubmit} setMessages={setMessages} messages={messages} />
                    </div>
                ) : (
                    <ChatRooms rooms={chatRooms} onRoomSelect={handleRoomSelect} currentUser={user} fetchChatRooms={fetchChatRooms} />
                )
            ) : (
                <Login handleOnSubmit={handleLoginSubmit} />
            )}
        </>
    );
}

export default App;