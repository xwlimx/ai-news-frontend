# AI News Analyzer

A full-stack web application that analyzes news articles using AI to provide summaries and extract mentioned nationalities/countries.

## Project Structure

```
ai-news-analyzer/
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
- OpenAI API key

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
   NEXT_PUBLIC_API_URL=http://localhost:8000
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

3. **Environment variables in Amplify:**
   - `NEXT_PUBLIC_API_URL`: 

## Features

- **File Upload Support**: .txt and .docx files
- **AI-Powered Analysis**: OpenAI GPT for summarization and entity extraction


### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Development Notes

- The backend uses async/await patterns for better performance
- File processing supports both text and DOCX formats
- AI prompts are optimized for accuracy and consistency
- Frontend includes proper TypeScript typing
- Error boundaries and loading states enhance user experience
- CORS is configured for cross-origin requests

## Future Enhancement

- Implement rate limiting for the API
- Add authentication
- Configure CloudWatch logging
- Set up monitoring and alerts
- Implement caching for repeated analyses