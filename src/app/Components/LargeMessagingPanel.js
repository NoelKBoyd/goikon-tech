'use client';

import { useState } from 'react';

export default function LargeMessagingPanel() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Coach', text: 'Great job on the last match!', time: '10:30 AM' },
    { id: 2, sender: 'Player', text: 'Thanks, coach! Ready for the next one.', time: '10:32 AM' },
    { id: 3, sender: 'Coach', text: 'Be at the field by 6 PM tomorrow.', time: '10:35 AM' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const newMsg = {
      id: messages.length + 1,
      sender: 'You',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  return (
    <div className="h-full w-full bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Messages</h2>
      <div className="h-max overflow-y-auto border border-gray-300 rounded-md p-2 space-y-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-2 rounded-lg max-w-[80%] ${
              msg.sender === 'You' ? 'bg-blue-500 text-white self-end ml-auto' : 'bg-gray-200 text-gray-800'
            }`}
          >
            <p className="text-sm font-medium">{msg.sender}</p>
            <p className="text-base">{msg.text}</p>
            <p className="text-xs text-gray-600 text-right">{msg.time}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-3">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-grow p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}
