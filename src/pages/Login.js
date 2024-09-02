import React, { useState } from "react";
import chatAPI from '../services/ChatApi';

function Login({ handleOnSubmit }) {
    const [memberLoginId, setMemberLoginId] = useState("");

    const handleOnChange = (e) => {
        setMemberLoginId(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const memberInfo = await chatAPI.login(memberLoginId);
            setMemberLoginId(memberInfo.memberLoginId);
            handleOnSubmit(memberInfo);
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    return (
        <div className="login">
            <div className="wrapper">
                <h2>간단한 채팅프로그램</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        placeholder="사용할 아이디를 입력하세요."
                        value={memberLoginId}
                        onChange={handleOnChange}
                        minLength={3}
                        required={true}
                    />
                    <button type="submit">Go!</button>
                </form>
            </div>
        </div>
    );
}

export default Login;