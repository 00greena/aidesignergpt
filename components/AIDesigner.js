export default function AIDesigner() {
  return (
    <div style={{
      maxWidth: '900px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '30px',
        borderRadius: '20px',
        textAlign: 'center',
        marginBottom: '30px'
      }}>
        <h1 style={{ margin: '0 0 10px 0', fontSize: '32px' }}>
          🎨 AI Designer GPT
        </h1>
        <p style={{ margin: 0, opacity: 0.9 }}>
          Create custom products with AI-powered design assistance
        </p>
      </div>

      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '20px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
      }}>
        <div id="chat-messages" style={{
          minHeight: '400px',
          marginBottom: '20px',
          padding: '20px',
          background: '#f7f7f8',
          borderRadius: '12px'
        }}>
          <p style={{ color: '#6b7280' }}>
            Welcome! This AI Designer is ready to help you create amazing custom products.
          </p>
          <p style={{ color: '#6b7280', marginTop: '10px' }}>
            To get started, make sure to add your OpenAI API key in Vercel's environment variables.
          </p>
        </div>

        <div style={{
          display: 'flex',
          gap: '10px'
        }}>
          <input
            type="text"
            placeholder="Describe your design idea..."
            style={{
              flex: 1,
              padding: '12px 18px',
              borderRadius: '25px',
              border: '2px solid #e5e7eb',
              fontSize: '16px',
              outline: 'none'
            }}
            id="message-input"
          />
          <button
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '25px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
            onClick={() => {
              const input = document.getElementById('message-input');
              const messages = document.getElementById('chat-messages');
              if (input.value.trim()) {
                messages.innerHTML += `
                  <div style="margin-top: 20px;">
                    <p style="background: #7c3aed; color: white; padding: 12px 18px; border-radius: 18px; display: inline-block; max-width: 70%;">
                      ${input.value}
                    </p>
                  </div>
                  <div style="margin-top: 10px;">
                    <p style="background: white; padding: 12px 18px; border-radius: 18px; display: inline-block; max-width: 70%;">
                      To enable AI responses, please configure your OpenAI API key in Vercel environment variables.
                    </p>
                  </div>
                `;
                input.value = '';
              }
            }}
          >
            Send
          </button>
        </div>
      </div>

      <div style={{
        marginTop: '20px',
        padding: '20px',
        background: '#fef3c7',
        borderRadius: '12px',
        border: '1px solid #fbbf24'
      }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#92400e' }}>⚙️ Setup Required</h3>
        <p style={{ margin: '0', color: '#78350f' }}>
          To enable AI features, add your <strong>OPENAI_API_KEY</strong> in Vercel's environment variables and redeploy.
        </p>
      </div>
    </div>
  );
}