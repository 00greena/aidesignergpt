// API endpoint for DALL-E Image Generation using Vercel AI Gateway
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

    // Use Vercel AI Gateway for image generation
    const response = await fetch('https://gateway.vercel.app/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.VERCEL_AI_GATEWAY_API_KEY}`,
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
      const errorText = await response.text();
      console.error('Vercel AI Gateway Image Error:', errorText);
      return res.status(response.status).json({ 
        error: 'AI Gateway image error', 
        details: errorText 
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