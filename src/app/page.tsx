'use client'
import { useState, useEffect } from 'react';
import { useChannel } from '../utils/ably';
export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const { sendMessage } = useChannel('anonymous-chat', (message:any) => {
    setMessages((prevMessages):any => [...prevMessages, message.data]);
  });

  // Handle message sending
  const handleSend = () => {
    if (inputValue.trim() !== '') {
      sendMessage(inputValue);
      setInputValue('');
    }
  };

  // Handle emoji click
  const handleEmojiClick = (event:any, emojiObject:any) => {
    setInputValue(inputValue + emojiObject.emoji); // Add emoji to input field
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-4 border rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl font-bold mb-4 text-center">Anonymous Chat</h1>

      {/* Chat messages container */}
      <div className="bg-gray-100 h-64 overflow-y-auto mb-4 p-4 rounded-lg">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2 p-2 bg-blue-100 rounded text-gray-800">
            {msg}
          </div>
        ))}
      </div>

      {/* Chat input and buttons */}
      <div className="flex items-center">
        {/* Input field */}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type a message..."
          className="flex-grow p-2 border rounded-l-lg focus:outline-none"
        />

        {/* Send button */}
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white p-2 rounded-r-lg ml-1">
          Send
        </button>
      </div>
    </div>
  );
}
