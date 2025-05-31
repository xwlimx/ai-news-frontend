export interface GeopoliticalEntities {
  countries: string[];
  nationalities: string[];
  people: string[];
  organizations: string[];
}

export interface AnalysisResult {
  summary: string;
  geopolitical_entities: GeopoliticalEntities;
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