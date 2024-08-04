import React, { useState, useEffect } from 'react';
import ChatWindow from './Components/chatWindow';
import MessageInput from './Components/messageInput';
import UserList from './Components/userList';

// Mock data
const mockUsers = [
  { id: 'user1', name: 'John Doe' },
  { id: 'user2', name: 'Jane Smith' }
];

const mockMessages = {
  user1: [
    { message_id: '1', sender_id: 'user1', receiver_id: 'user2', message: 'Hello, Jane!', date: '2024-08-04T06:48:55.649Z' }
  ],
  user2: [
    { message_id: '2', sender_id: 'user2', receiver_id: 'user1', message: 'Hi, John!', date: '2024-08-04T07:00:00.000Z' }
  ]
};

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch users from your API or use mock data
    // Uncomment the following lines when the API is available
    /*
    fetch('http://localhost:8000/users')
      .then(response => response.json())
      .then(data => setUsers(data));
    */
    // Using mock data for now
    setUsers(mockUsers);
  }, []);

  const sendMessage = (message) => {
    if (!selectedUser) return;

    const payload = {
      is_system_call: false,
      date: new Date().toISOString(),
      user_id: "user1",
      message: message
    };

    fetch('http://localhost:8000/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Message sent:', data);
      setMessages([...messages, payload]); // Update local state with the sent message
    })
    .catch(error => {
      console.error('Error sending message:', error);
    });
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    // Fetch messages from your API or use mock data
    // Uncomment the following lines when the API is available
    /*
    fetch(`http://localhost:8000/messages/${user.id}`)
      .then(response => response.json())
      .then(data => setMessages(data));
    */
    // Using mock data for now
    setMessages(mockMessages[user.id] || []);
  };

  return (
    <div className="App">
      <UserList users={users} onSelectUser={handleSelectUser} />
      {selectedUser && (
        <div>
          <ChatWindow selectedUser={selectedUser} messages={messages} />
          <MessageInput sendMessage={sendMessage} />
        </div>
      )}
    </div>
  );
};

export default App;
