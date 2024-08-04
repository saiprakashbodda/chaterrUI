import React from 'react';

const ChatWindow = ({ selectedUser, messages }) => {
  return (
    <div>
      <h2>Chat with {selectedUser.name}</h2>
      <div className="message-container">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <p>{msg.message}</p>
            <small>{msg.date}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatWindow;
