@echo off
echo ========================================
echo AI DESIGNER GPT - GitHub Push Helper
echo ========================================
echo.
echo Please follow these steps:
echo.
echo 1. First, create a new repository on GitHub:
echo    - Go to: https://github.com/new
echo    - Name: ai-designer-gpt
echo    - Don't initialize with README
echo    - Click "Create repository"
echo.
echo 2. Then run these commands (replace YOUR_USERNAME):
echo.
echo    cd C:\Users\yanek\aidesignergpt
echo    git remote add origin https://github.com/YOUR_USERNAME/ai-designer-gpt.git
echo    git branch -M main
echo    git push -u origin main
echo.
echo 3. Deploy to Vercel:
echo    - Go to: https://vercel.com/new
echo    - Import your GitHub repo
echo    - Add environment variable: OPENAI_API_KEY
echo    - Deploy!
echo.
pause