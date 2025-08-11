import Head from 'next/head';
import Script from 'next/script';
import { useEffect, useState } from 'react';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Head>
        <title>AI Designer GPT - Custom Product Designer</title>
        <meta name="description" content="Create custom products with AI-powered design assistance" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        :root {
          --primary: #7c3aed;
          --primary-hover: #6d28d9;
          --secondary: #10b981;
          --dark: #1f2937;
          --light: #f9fafb;
          --border: #e5e7eb;
          --shadow: 0 10px 25px rgba(124, 58, 237, 0.1);
          --gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          --chat-bg: #f7f7f8;
          --input-bg: #ffffff;
          --hover-bg: #f3f4f6;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
          background: var(--light);
          color: var(--dark);
        }

        .app-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 20px;
          min-height: 100vh;
        }