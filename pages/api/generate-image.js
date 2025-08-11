// API endpoint for image generation using Vercel AI Gateway
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
    const { 
      prompt, 
      model = 'dall-e-3', 
      size = '1024x1024', 
      quality = 'standard',
      n = 1 
    } = req.body;

    const AI_GATEWAY_API_KEY = process.env.AI_GATEWAY_API_KEY;
    
    if (!AI_GATEWAY_API_KEY) {
      return res.status(400).json({ 
        error: 'AI Gateway API key not configured.' 
      });
    }

    // Vercel AI Gateway endpoint for image generation
    const response = await fetch('https://gateway.vercel.app/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AI_GATEWAY_API_KEY}`
      },
      body: JSON.stringify({
        model,
        prompt,
        n,
        size,
        quality,
        response_format: 'url'
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('AI Gateway Image Error:', errorData);
      return res.status(response.status).json({ 
        error: errorData.error?.message || 'AI Gateway image generation error' 
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