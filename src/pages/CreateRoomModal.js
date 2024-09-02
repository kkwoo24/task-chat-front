import React, { useState } from "react";
import chatAPI from "../services/ChatApi";

function CreateRoomModal({ isOpen, onClose, onRoomCreate, currentUser }) {
    const [newRoomName, setNewRoomName] = useState("");
    const [memberIds, setMemberIds] = useState("");

    const handleCreateRoom = async () => {
        try {
            const memberIdsArray = memberIds.split(',').map(id => id.trim());
            const newRoom = await chatAPI.createChatRoom(newRoomName, currentUser.memberId, memberIdsArray);
            onRoomCreate(newRoom);
            setNewRoomName(""); // Reset newRoomName
            setMemberIds(""); // Reset memberIds
            onClose();
        } catch (error) {
            console.error("Failed to create chat room", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Create New Chat Room</h2>
                <input
                    type="text"
                    placeholder="New room name"
                    value={newRoomName}
                    onChange={(e) => setNewRoomName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Member IDs (comma separated)"
                    value={memberIds}
                    onChange={(e) => setMemberIds(e.target.value)}
                />
                <button onClick={handleCreateRoom}>Create Room</button>
            </div>
        </div>
    );
}

export default CreateRoomModal;