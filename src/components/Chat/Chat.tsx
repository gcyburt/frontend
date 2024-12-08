import React, { useState } from 'react';
import axios from 'axios';
import styles from './Chat.module.css';

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000';
const endpoint = `${apiUrl}/chat`;

const Chat: React.FC = () => {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState<string[]>([]);

    const handleSendMessage = async () => {
        if (!message.trim()) return;

        console.log('✉️ Sending message:', message);
        setChatHistory([...chatHistory, `You: ${message}`]);

        try {
            const response = await axios.post(endpoint, { prompt: message });
            console.log('🤖 Received AI response:', response.data.completion);

            setChatHistory([...chatHistory, `You: ${message}`, `AI: ${response.data.completion}`]);
        } catch (error) {
            console.error('❌ Error sending message:', error);
        }

        setMessage('');
    };

    return (
        <div className={styles.chatContainer}>
            <div className={styles.chatHistory}>
                {chatHistory.map((entry, index) => (
                    <div key={index}>{entry}</div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className={styles.input}
            />
            <button onClick={handleSendMessage} className={styles.sendButton}>Send</button>
        </div>
    );
};

export default Chat; 