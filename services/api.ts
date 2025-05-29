import axios, { AxiosError } from 'axios';
import { AnalysisResult, ApiError } from '@/types/model';

// Backend API base URL - update this to your deployed backend URL
const NEXT_PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: NEXT_PUBLIC_API_BASE_URL,
  timeout: 60000, // 60 seconds timeout for AI processing
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export class ApiService {
  static async analyzeArticle(text?: string, file?: File): Promise<AnalysisResult> {
    try {
      const formData = new FormData();
      
      if (file) {
        formData.append('file', file);
      } else if (text) {
        formData.append('text', text);
      } else {
        throw new Error('Either text or file must be provided');
      }

      const response = await apiClient.post('/analyze', formData);
      
      if (!response.data) {
        throw new Error('No data received from server');
      }

      return {
        summary: response.data.summary || '',
        nationalities: response.data.nationalities || []
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        const apiError: ApiError = {
          message: error.response?.data?.detail || error.message || 'An error occurred',
          status: error.response?.status
        };
        throw apiError;
      }
      throw new Error('Network error occurred');
    }
  }
}