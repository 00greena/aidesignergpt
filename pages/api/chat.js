// API endpoint for OpenAI Chat Completions
// This runs only at request time, not build time

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
    
    // Get API key at runtime only
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey || apiKey === 'undefined') {
      return res.status(200).json({ 
        choices: [{
          message: {
            content: 'Please configure your OpenAI API key in Vercel environment variables to enable AI responses.'
          }
        }]
      });
    }

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
        max_tokens
      })
    });

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error('Error:', error);
    return res.status(200).json({ 
      choices: [{
        message: {
          content: 'An error occurred. Please check your configuration.'
        }
      }]
    });
  }
}