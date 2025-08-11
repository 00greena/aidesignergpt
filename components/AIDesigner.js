import { useState, useEffect, useRef } from 'react';

export default function AIDesigner() {
  const [state, setState] = useState({
    messages: [],
    uploadedFiles: [],
    isLoading: false,
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || '',
    showAdmin: false
  });

  const [inputValue, setInputValue] = useState('');
  const [charCount, setCharCount] = useState(0);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  // API URL - will use Vercel functions in production
  const API_BASE_URL = process.env.NODE_ENV === 'production' 
    ? '' // Same domain in production
    : 'http://localhost:3000'; // Local development

  useEffect(() => {
    // Auto-scroll to bottom of messages
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.messages]);

  // Handle textarea auto-resize
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px';
    }
  }, [inputValue]);
  const sendMessage = async () => {
    if (!inputValue.trim() && state.uploadedFiles.length === 0) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: inputValue,
      files: state.uploadedFiles
    };

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
      uploadedFiles: []
    }));

    setInputValue('');
    setCharCount(0);

    try {
      // Call our Vercel API endpoint
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: 'You are a helpful AI design assistant for custom products.' },
            { role: 'user', content: inputValue }
          ],          model: 'gpt-3.5-turbo',
          temperature: 0.8,
          max_tokens: 500
        })
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      const aiMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: data.choices[0].message.content
      };

      setState(prev => ({
        ...prev,
        messages: [...prev.messages, aiMessage],
        isLoading: false
      }));

      // Check if we should generate an image
      if (inputValue.toLowerCase().includes('design') || 
          inputValue.toLowerCase().includes('create') ||
          inputValue.toLowerCase().includes('image')) {
        await generateImage(inputValue);
      }

    } catch (error) {
      console.error('Error:', error);