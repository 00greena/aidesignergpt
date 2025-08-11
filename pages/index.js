import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

// Dynamically import the AIDesigner component to avoid SSR issues
const AIDesigner = dynamic(() => import('../components/AIDesigner'), {
  ssr: false,
  loading: () => <div style={{ padding: '20px', textAlign: 'center' }}>Loading AI Designer...</div>
});

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <Head>
        <title>AI Designer GPT - Custom Product Designer</title>
        <meta name="description" content="Create custom products with AI-powered design assistance" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ minHeight: '100vh', background: '#f9fafb' }}>
        {mounted && <AIDesigner />}
      </main>
    </>
  );
}