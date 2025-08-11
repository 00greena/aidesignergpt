import { useState } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Welcome! I\'m your AI design assistant. How can I help you create something amazing today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage]
        })
      });

      const data = await response.json();
      
      if (data.choices && data.choices[0]) {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: data.choices[0].message.content 
        }]);
      } else {
        throw new Error('Invalid response');
      }
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, there was an error. Please make sure the OpenAI API key is configured in Vercel environment variables.' 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px', fontFamily: 'system-ui' }}>
      <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '30px', borderRadius: '20px', textAlign: 'center', marginBottom: '30px' }}>
        <h1>🎨 AI Designer GPT</h1>
        <p>Create custom products with AI-powered design assistance</p>
      </div>
      
      <div style={{ background: 'white', borderRadius: '20px', padding: '20px', minHeight: '400px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
        <div style={{ maxHeight: '400px', overflowY: 'auto', marginBottom: '20px' }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ marginBottom: '15px', textAlign: msg.role === 'user' ? 'right' : 'left' }}>
              <span style={{
                background: msg.role === 'user' ? '#7c3aed' : '#f3f4f6',
                color: msg.role === 'user' ? 'white' : 'black',
                padding: '10px 15px',
                borderRadius: '18px',
                display: 'inline-block',
                maxWidth: '70%'
              }}>
                {msg.content}
              </span>
            </div>
          ))}
          {loading && <div style={{ textAlign: 'center' }}>Thinking...</div>}
        </div>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message..."
            style={{
              flex: 1,
              padding: '12px 18px',
              borderRadius: '25px',
              border: '2px solid #e5e7eb',
              fontSize: '16px'
            }}
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            style={{
              background: loading ? '#ccc' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '25px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: '600'
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}