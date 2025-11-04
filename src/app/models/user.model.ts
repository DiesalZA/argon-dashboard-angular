export interface User {
  id: string;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  about?: string;
  avatarUrl?: string;
  preferences?: UserPreferences;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserPreferences {
  defaultCurrency: string;
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
  defaultPortfolioId?: string;
  notifications: {
    email: boolean;
    push: boolean;
    priceAlerts: boolean;
    newsAlerts: boolean;
  };
  theme: 'light' | 'dark';
  language: string;
}

export interface ApiSettings {
  stockDataProvider: 'alpha_vantage' | 'finnhub' | 'yahoo_finance' | 'iex_cloud';
  apiKey?: string;
  refreshInterval: number; // in seconds
}
