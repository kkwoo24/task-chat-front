import React, { useState } from "react";
import CreateRoomModal from "./CreateRoomModal";

function ChatRooms({ rooms, onRoomSelect, currentUser, fetchChatRooms }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleRoomCreate = () => {
        fetchChatRooms(currentUser.chatMemberId); // Fetch updated chat rooms list
    };

    return (
        <div className="chat-rooms">
            <h2>채팅방 목록</h2>
            <ul>
                {rooms.map((room, index) => (
                    <li key={index} onClick={() => onRoomSelect(room)}>
                        {room.chatRoomName}
                    </li>
                ))}
            </ul>
            <button onClick={() => setIsModalOpen(true)}>Create Room</button>
            <CreateRoomModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onRoomCreate={handleRoomCreate}
                currentUser={currentUser}
            />
        </div>
    );
}

export default ChatRooms;