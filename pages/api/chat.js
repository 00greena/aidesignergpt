// API endpoint using Vercel AI Gateway
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages, model = 'gpt-3.5-turbo', temperature = 0.8, max_tokens = 500 } = req.body;
    
    // Use Vercel AI Gateway
    const AI_GATEWAY_API_KEY = process.env.AI_GATEWAY_API_KEY;
    
    if (!AI_GATEWAY_API_KEY) {
      return res.status(400).json({ 
        error: 'AI Gateway API key not configured. Please add AI_GATEWAY_API_KEY to environment variables.' 
      });
    }

    // Vercel AI Gateway endpoint
    const response = await fetch('https://gateway.vercel.app/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AI_GATEWAY_API_KEY}`
      },
      body: JSON.stringify({
        model,
        messages,
        temperature,
        max_tokens
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('AI Gateway Error:', errorData);
      return res.status(response.status).json({ 
        error: errorData.error?.message || 'AI Gateway error',
        details: errorData 
      });
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error('API Route Error:', error);
    return res.status(500).json({ 
      error: 'Internal server error', 
      details: error.message 
    });
  }
}