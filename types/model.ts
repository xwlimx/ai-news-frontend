export interface AnalysisResult {
  summary: string;
  nationalities: string[];
}

export interface AnalysisRequest {
  text?: string;
  file?: File;
}

export interface ApiError {
  message: string;
  status?: number;
}

export interface LoadingState {
  isLoading: boolean;
  message?: string;
}