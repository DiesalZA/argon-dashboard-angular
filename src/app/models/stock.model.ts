export interface StockQuote {
  symbol: string;
  companyName: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  peRatio?: number;
  high: number;
  low: number;
  open: number;
  previousClose: number;
  timestamp?: Date;
}

export interface StockDetails extends StockQuote {
  description?: string;
  ceo?: string;
  sector?: string;
  industry?: string;
  employees?: number;
  website?: string;
  exchange: string;
  dividendYield?: number;
  eps?: number;
  beta?: number;
  week52High?: number;
  week52Low?: number;
}

export interface HistoricalPrice {
  date: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface WatchlistItem {
  id: string;
  userId: string;
  watchlistName: string;
  symbol: string;
  companyName?: string;
  addedDate: Date;
  targetPrice?: number;
  notes?: string;
  currentPrice?: number;
  change?: number;
  changePercent?: number;
}

export interface Watchlist {
  id: string;
  userId: string;
  name: string;
  items: WatchlistItem[];
  createdAt: Date;
  updatedAt?: Date;
}

export interface MarketIndex {
  symbol: string;
  name: string;
  value: number;
  change: number;
  changePercent: number;
  timestamp: Date;
}
