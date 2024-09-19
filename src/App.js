import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChatWindow from './components/ChatWindow'; // Ispravljeni import

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Dodaj pozdravnu poruku kad se aplikacija učita
  useEffect(() => {
    setMessages([
      { text: 'Welcome! How can I assist you today?', sender: 'AI' }
    ]);
  }, []);

  const handleSend = async () => {
    if (input.trim() === '') return;

    setMessages([...messages, { text: input, sender: 'user' }]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/generate/', {
        prompt: input,
        max_length: 100,
        temperature: 0.5,
        top_k: 50,
        top_p: 0.95,
      });

      const aiMessage = response.data.generated_text;

      setMessages([...messages, { text: input, sender: 'user' }, { text: aiMessage, sender: 'AI' }]);
    } catch (error) {
      console.error('Error generating text:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100%' }}>
      <ChatWindow messages={messages} />
      <div style={{ display: 'flex', padding: '10px', borderTop: '1px solid #ccc' }}>
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          onKeyPress={(e) => e.key === 'Enter' && handleSend()} 
          style={{ flex: 1, padding: '10px', borderRadius: '10px', border: '1px solid #ccc' }} 
        />
        <button onClick={handleSend} style={{ marginLeft: '10px', padding: '10px', borderRadius: '10px', border: 'none', backgroundColor: '#007BFF', color: '#fff', cursor: 'pointer' }}>Send</button>
      </div>
    </div>
  );
};

export default App;
