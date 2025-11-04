export interface Portfolio {
  id: string;
  userId: string;
  name: string;
  totalValue: number;
  cashBalance: number;
  totalReturn: number;
  totalReturnPercent: number;
  dayChange: number;
  dayChangePercent: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Holding {
  id: string;
  portfolioId: string;
  symbol: string;
  companyName: string;
  shares: number;
  avgCostBasis: number;
  currentPrice: number;
  marketValue: number;
  unrealizedPL: number;
  unrealizedPLPercent: number;
  sector?: string;
  exchange?: string;
}

export interface Transaction {
  id: string;
  portfolioId: string;
  date: Date;
  type: 'BUY' | 'SELL' | 'DIVIDEND';
  symbol: string;
  companyName?: string;
  shares: number;
  price: number;
  fees: number;
  total: number;
  notes?: string;
}

export interface PortfolioSummary {
  totalValue: number;
  dayChange: number;
  dayChangePercent: number;
  totalReturn: number;
  totalReturnPercent: number;
  cashBalance: number;
  investedAmount: number;
}
