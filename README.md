# AI News Analyzer

A full-stack web application that analyzes news articles using AI to provide summaries and extract mentioned nationalities/countries.

## Project Structure

```
ai-news-frontend/
├── frontend/   	# Next.js React application
└── README.md
```

## Technology Stack

### Frontend
- **Next.js**: 15.0.0+
- **React**: 19.0.0+
- **TypeScript**: 5.3.2
- **TailwindCSS**: 4.0.0+
- **Axios**: 1.9.0

### Cloud Infrastructure
- **AWS Amplify** (Frontend)

## Setup Instructions

### Prerequisites
- Node.js 22.16+ and npm 10.9+

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment configuration:**
   ```bash
   # Create .env.local
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

4. **Run development server:**
   ```bash
   npm run dev
   ```

## Deployment

### Frontend Deployment (AWS Amplify)

1. **Connect repository to Amplify**
2. **Build settings (amplify.yml):**
	```yaml
	version: 1
	frontend:
	  phases:
		build:
		  commands:
			- npm ci
			- npm run build
	  artifacts:
		baseDirectory: .next
		files:
		  - '**/*'
	  cache:
		paths:
		  - .next/cache/**/*
		  - .npm/**/*
		  - node_modules/**/*
	```

#### Frontend Deployment (AWS Amplify - One Time Setup)
3. **Environment variables in Amplify:**
   - `NEXT_PUBLIC_API_URL`: XXX 

## Features

- **File Upload Support**: .txt and .docx files
- **AI-Powered Analysis**: OpenAI GPT for summarization and entity extraction
