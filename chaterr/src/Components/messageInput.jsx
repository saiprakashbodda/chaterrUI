import React, { useState } from 'react';

const MessageInput = ({ sendMessage }) => {
  const [message, setMessage] = useState('');

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    sendMessage(message);
    setMessage('');
  };

  return (
    <div>
      <input type="text" value={message} onChange={handleMessageChange} />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default MessageInput;
