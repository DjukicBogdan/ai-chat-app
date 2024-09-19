import React, { useEffect, useRef } from 'react';

function ChatWindow({ messages }) {
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto', padding: '10px', backgroundColor: '#ffffff' }}>
      {messages.map((msg, index) => (
        <div 
          key={index} 
          style={{ 
            backgroundColor: msg.sender === 'AI' ? '#ECECEC' : '#DCF8C6', 
            padding: '10px', 
            borderRadius: '10px', 
            marginBottom: '10px', 
            maxWidth: '60%', 
            alignSelf: msg.sender === 'AI' ? 'flex-start' : 'flex-end',
            wordWrap: 'break-word',   // Dodaj ovo za obuhvatanje teksta
            overflowWrap: 'break-word', // Dodaj ovo za obuhvatanje teksta
          }}
        >
          <span style={{ fontWeight: 'bold' }}>{msg.sender}:</span> {msg.text}
        </div>
      ))}
      <div ref={chatEndRef} />
    </div>
  );
}

export default ChatWindow;
