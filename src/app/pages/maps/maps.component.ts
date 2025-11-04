import { Component, OnInit } from '@angular/core';
import { MarketIndex, StockQuote } from '../../models';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {

  // Major market indices (mock data - will be replaced with API calls)
  public marketIndices: MarketIndex[] = [
    {
      symbol: '^GSPC',
      name: 'S&P 500',
      value: 4567.18,
      change: 23.45,
      changePercent: 0.52,
      timestamp: new Date()
    },
    {
      symbol: '^DJI',
      name: 'Dow Jones',
      value: 35678.90,
      change: -45.23,
      changePercent: -0.13,
      timestamp: new Date()
    },
    {
      symbol: '^IXIC',
      name: 'NASDAQ',
      value: 14234.56,
      change: 67.89,
      changePercent: 0.48,
      timestamp: new Date()
    },
    {
      symbol: '^RUT',
      name: 'Russell 2000',
      value: 1876.54,
      change: 12.34,
      changePercent: 0.66,
      timestamp: new Date()
    }
  ];

  // Top gainers (mock data)
  public topGainers: StockQuote[] = [
    {
      symbol: 'PLTR',
      companyName: 'Palantir Technologies',
      price: 24.50,
      change: 1.85,
      changePercent: 8.17,
      volume: 56789012,
      marketCap: 52000000000,
      high: 24.90,
      low: 22.95,
      open: 23.10,
      previousClose: 22.65
    },
    {
      symbol: 'NVDA',
      companyName: 'NVIDIA Corporation',
      price: 485.60,
      change: 18.90,
      changePercent: 4.05,
      volume: 45234567,
      marketCap: 1200000000000,
      high: 487.50,
      low: 472.20,
      open: 475.00,
      previousClose: 466.70
    },
    {
      symbol: 'AMD',
      companyName: 'Advanced Micro Devices',
      price: 118.25,
      change: 3.75,
      changePercent: 3.27,
      volume: 45234567,
      marketCap: 191000000000,
      high: 119.50,
      low: 115.80,
      open: 116.00,
      previousClose: 114.50
    }
  ];

  // Top losers (mock data)
  public topLosers: StockQuote[] = [
    {
      symbol: 'RIVN',
      companyName: 'Rivian Automotive',
      price: 10.85,
      change: -0.45,
      changePercent: -3.98,
      volume: 34567890,
      marketCap: 10500000000,
      high: 11.30,
      low: 10.75,
      open: 11.30,
      previousClose: 11.30
    },
    {
      symbol: 'TSLA',
      companyName: 'Tesla Inc.',
      price: 198.50,
      change: -7.80,
      changePercent: -3.78,
      volume: 87654321,
      marketCap: 630000000000,
      high: 205.75,
      low: 197.50,
      open: 204.00,
      previousClose: 206.30
    },
    {
      symbol: 'META',
      companyName: 'Meta Platforms',
      price: 305.50,
      change: -2.50,
      changePercent: -0.81,
      volume: 15234567,
      marketCap: 789000000000,
      high: 308.75,
      low: 304.20,
      open: 307.00,
      previousClose: 308.00
    }
  ];

  // Most active stocks (mock data)
  public mostActive: StockQuote[] = [
    {
      symbol: 'AAPL',
      companyName: 'Apple Inc.',
      price: 178.50,
      change: 1.25,
      changePercent: 0.71,
      volume: 98765432,
      marketCap: 2800000000000,
      high: 179.50,
      low: 177.20,
      open: 177.80,
      previousClose: 177.25
    },
    {
      symbol: 'TSLA',
      companyName: 'Tesla Inc.',
      price: 198.50,
      change: -7.80,
      changePercent: -3.78,
      volume: 87654321,
      marketCap: 630000000000,
      high: 205.75,
      low: 197.50,
      open: 204.00,
      previousClose: 206.30
    },
    {
      symbol: 'MSFT',
      companyName: 'Microsoft Corporation',
      price: 365.25,
      change: 2.75,
      changePercent: 0.76,
      volume: 67891234,
      marketCap: 2700000000000,
      high: 366.50,
      low: 363.80,
      open: 364.00,
      previousClose: 362.50
    }
  ];

  // Sector performance (mock data)
  public sectorPerformance = [
    { sector: 'Technology', change: 1.25, color: 'success' },
    { sector: 'Healthcare', change: 0.85, color: 'success' },
    { sector: 'Financial', change: 0.42, color: 'success' },
    { sector: 'Consumer', change: 0.18, color: 'success' },
    { sector: 'Energy', change: -0.32, color: 'danger' },
    { sector: 'Materials', change: -0.58, color: 'danger' },
    { sector: 'Utilities', change: -0.75, color: 'danger' },
    { sector: 'Real Estate', change: -1.12, color: 'danger' }
  ];

  // Market news (mock data)
  public marketNews = [
    {
      id: 'news1',
      title: 'Fed Keeps Interest Rates Unchanged',
      summary: 'The Federal Reserve announced it will maintain current interest rates, citing stable inflation and strong employment data.',
      source: 'Reuters',
      timestamp: new Date('2024-11-04T09:30:00'),
      url: '#'
    },
    {
      id: 'news2',
      title: 'Tech Stocks Rally on AI Optimism',
      summary: 'Major technology stocks surged today as investors bet on continued growth in artificial intelligence and cloud computing.',
      source: 'Bloomberg',
      timestamp: new Date('2024-11-04T10:15:00'),
      url: '#'
    },
    {
      id: 'news3',
      title: 'Oil Prices Drop Amid Demand Concerns',
      summary: 'Crude oil prices fell sharply today as concerns over global demand outweighed supply concerns.',
      source: 'CNBC',
      timestamp: new Date('2024-11-04T11:00:00'),
      url: '#'
    },
    {
      id: 'news4',
      title: 'Earnings Season Beats Expectations',
      summary: 'Q3 earnings are coming in stronger than expected, with 75% of S&P 500 companies beating analyst estimates.',
      source: 'Wall Street Journal',
      timestamp: new Date('2024-11-04T08:45:00'),
      url: '#'
    }
  ];

  // Market status
  public marketStatus = {
    isOpen: true,
    statusText: 'Market Open',
    nextClose: new Date('2024-11-04T16:00:00'),
    timezone: 'EST'
  };

  constructor() { }

  ngOnInit() {
    // In production, load market data from API
    this.checkMarketStatus();
  }

  checkMarketStatus() {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay();

    // Simple market hours check (9:30 AM - 4:00 PM ET, Mon-Fri)
    // This is a simplified check - real implementation would be more sophisticated
    if (day === 0 || day === 6) {
      this.marketStatus.isOpen = false;
      this.marketStatus.statusText = 'Market Closed - Weekend';
    } else if (hour < 9 || (hour === 9 && now.getMinutes() < 30)) {
      this.marketStatus.isOpen = false;
      this.marketStatus.statusText = 'Pre-Market';
    } else if (hour >= 16) {
      this.marketStatus.isOpen = false;
      this.marketStatus.statusText = 'After Hours';
    }
  }

  formatMarketCap(value: number): string {
    if (value >= 1000000000000) {
      return '$' + (value / 1000000000000).toFixed(2) + 'T';
    } else if (value >= 1000000000) {
      return '$' + (value / 1000000000).toFixed(2) + 'B';
    } else if (value >= 1000000) {
      return '$' + (value / 1000000).toFixed(2) + 'M';
    }
    return '$' + value.toFixed(2);
  }

  formatVolume(value: number): string {
    if (value >= 1000000) {
      return (value / 1000000).toFixed(2) + 'M';
    } else if (value >= 1000) {
      return (value / 1000).toFixed(2) + 'K';
    }
    return value.toString();
  }

}
