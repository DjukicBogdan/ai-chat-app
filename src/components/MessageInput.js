import React, { useState } from 'react';
import axios from 'axios';

function MessageInput({ onSend }) {
  const [text, setText] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (text.trim()) {
      onSend({ sender: 'You', text });
      setText('');
      setIsSending(true);

      try {
        const response = await axios.post('http://127.0.0.1:8000/generate/', {
          prompt: text,
          max_length: 150,
          temperature: 0.5,
          top_k: 50,
          top_p: 0.9
        });

        const aiMessage = { sender: 'AI', text: response.data.generated_text };
        onSend(aiMessage);
      } catch (error) {
        console.error('Error communicating with AI:', error);
        const errorMessage = { sender: 'AI', text: 'Sorry, I am having trouble responding right now.' };
        onSend(errorMessage);
      } finally {
        setIsSending(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div style={styles.messageInput}>
      <input
        type="text"
        placeholder="Type a message"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={handleKeyPress}
        style={styles.input}
        disabled={isSending}
      />
      <button onClick={handleSend} style={styles.sendButton} disabled={isSending}>
        {isSending ? 'Sending...' : 'Send'}
      </button>
    </div>
  );
}

const styles = {
  messageInput: {
    display: 'flex',
    padding: '10px',
    borderTop: '1px solid #ccc',
    backgroundColor: '#f7f7f7',
  },
  input: {
    flex: 1,
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '20px',
    marginRight: '10px',
  },
  sendButton: {
    padding: '10px 20px',
    borderRadius: '20px',
    backgroundColor: '#25D366',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
};

export default MessageInput;
