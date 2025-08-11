# AI Designer GPT

🚀 **LIVE APP**: [Visit your AI Designer](https://aidesignergpt-54ny.vercel.app/)

A fully-featured AI-powered custom product designer with ChatGPT-style interface, real-time design generation, and e-commerce integration.

## Features

- 🤖 OpenAI GPT-4/GPT-3.5 Chat Integration
- 🎨 DALL-E 3 Image Generation
- 🎤 Voice Input with Whisper API
- 📷 Image Upload & Analysis
- 💳 Stripe Payment Integration
- 📊 Admin Dashboard
- 🎯 Product Management System
- 📈 Analytics & Reporting

## Setup

1. Clone this repository
2. Install dependencies: `npm install`
3. Create `.env.local` file with your API keys:
```
OPENAI_API_KEY=your_openai_api_key
STRIPE_PUBLIC_KEY=your_stripe_public_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```
4. Run development server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000)

## Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/00greena/aidesignergpt)

## Environment Variables

Make sure to add these in Vercel:
- `OPENAI_API_KEY` - Your OpenAI API key (Required)
- `STRIPE_PUBLIC_KEY` - Your Stripe public key (Optional)
- `STRIPE_SECRET_KEY` - Your Stripe secret key (Optional)

## Tech Stack

- Next.js 14
- React 18
- OpenAI API
- Stripe API
- Vercel Edge Functions

## Live Demo

Visit: https://aidesignergpt-54ny.vercel.app/

## Created by

Built with ❤️ for custom product design automation

---
Last updated: December 2024