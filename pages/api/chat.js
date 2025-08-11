// API endpoint using Vercel AI SDK
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages, model = 'gpt-3.5-turbo', temperature = 0.8, max_tokens = 500 } = req.body;
    
    // Try multiple methods to get the API key
    const apiKey = process.env.OPENAI_API_KEY || 
                   process.env.VERCEL_AI_GATEWAY_API_KEY ||
                   process.env.AI_GATEWAY_API_KEY;
    
    if (!apiKey) {
      // If no API key, try direct gateway without auth (if configured in Vercel dashboard)
      const gatewayUrl = process.env.VERCEL_AI_GATEWAY_URL || 'https://gateway.vercel.app';
      
      const response = await fetch(`${gatewayUrl}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          messages,
          temperature,
          max_tokens,
        })
      });

      if (!response.ok) {
        // Fallback response if gateway fails
        return res.status(200).json({
          choices: [{
            message: {
              content: 'Please ensure AI Gateway is configured in Vercel project settings.'
            }
          }]
        });
      }

      const data = await response.json();
      return res.status(200).json(data);
    }
    
    // If API key exists, use standard OpenAI endpoint
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        messages,
        temperature,
        max_tokens,
      })
    });

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error('API Error:', error);
    return res.status(200).json({
      choices: [{
        message: {
          content: 'Connection error. Please check your configuration.'
        }
      }]
    });
  }
}