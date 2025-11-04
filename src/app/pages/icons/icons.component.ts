import { Component, OnInit } from '@angular/core';
import { WatchlistItem, StockQuote } from '../../models';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {

  // Watchlist items (mock data - will be replaced with API calls)
  public watchlistItems: (WatchlistItem & { quote?: StockQuote })[] = [
    {
      id: 'w1',
      userId: 'user-1',
      watchlistName: 'Tech Watch',
      symbol: 'META',
      companyName: 'Meta Platforms Inc.',
      addedDate: new Date('2024-10-15'),
      targetPrice: 320.00,
      notes: 'Waiting for better entry point',
      quote: {
        symbol: 'META',
        companyName: 'Meta Platforms Inc.',
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
    },
    {
      id: 'w2',
      userId: 'user-1',
      watchlistName: 'Tech Watch',
      symbol: 'AMD',
      companyName: 'Advanced Micro Devices Inc.',
      addedDate: new Date('2024-10-20'),
      targetPrice: 110.00,
      notes: 'Strong AI play',
      quote: {
        symbol: 'AMD',
        companyName: 'Advanced Micro Devices Inc.',
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
    },
    {
      id: 'w3',
      userId: 'user-1',
      watchlistName: 'Healthcare',
      symbol: 'PFE',
      companyName: 'Pfizer Inc.',
      addedDate: new Date('2024-10-18'),
      targetPrice: 30.00,
      quote: {
        symbol: 'PFE',
        companyName: 'Pfizer Inc.',
        price: 28.50,
        change: 0.15,
        changePercent: 0.53,
        volume: 23456789,
        marketCap: 160000000000,
        high: 28.75,
        low: 28.20,
        open: 28.35,
        previousClose: 28.35
      }
    },
    {
      id: 'w4',
      userId: 'user-1',
      watchlistName: 'Financial',
      symbol: 'JPM',
      companyName: 'JPMorgan Chase & Co.',
      addedDate: new Date('2024-10-22'),
      targetPrice: 145.00,
      notes: 'Banking sector leader',
      quote: {
        symbol: 'JPM',
        companyName: 'JPMorgan Chase & Co.',
        price: 152.80,
        change: 1.20,
        changePercent: 0.79,
        volume: 8765432,
        marketCap: 437000000000,
        high: 153.50,
        low: 151.20,
        open: 151.60,
        previousClose: 151.60
      }
    },
    {
      id: 'w5',
      userId: 'user-1',
      watchlistName: 'EV & Energy',
      symbol: 'RIVN',
      companyName: 'Rivian Automotive Inc.',
      addedDate: new Date('2024-10-28'),
      targetPrice: 12.00,
      notes: 'High risk, high reward',
      quote: {
        symbol: 'RIVN',
        companyName: 'Rivian Automotive Inc.',
        price: 10.85,
        change: -0.45,
        changePercent: -3.98,
        volume: 34567890,
        marketCap: 10500000000,
        high: 11.30,
        low: 10.75,
        open: 11.30,
        previousClose: 11.30
      }
    },
    {
      id: 'w6',
      userId: 'user-1',
      watchlistName: 'Tech Watch',
      symbol: 'PLTR',
      companyName: 'Palantir Technologies Inc.',
      addedDate: new Date('2024-11-01'),
      targetPrice: 22.00,
      notes: 'AI and data analytics',
      quote: {
        symbol: 'PLTR',
        companyName: 'Palantir Technologies Inc.',
        price: 24.50,
        change: 1.85,
        changePercent: 8.17,
        volume: 56789012,
        marketCap: 52000000000,
        high: 24.90,
        low: 22.95,
        open: 23.10,
        previousClose: 22.65
      }
    }
  ];

  // Summary stats
  public watchlistSummary = {
    totalSymbols: 6,
    avgChange: 0.0,
    gainers: 0,
    losers: 0
  };

  // Available watchlist categories
  public watchlistCategories = ['Tech Watch', 'Healthcare', 'Financial', 'EV & Energy', 'Dividend Stocks'];
  public selectedCategory = 'All';

  // Form for adding new symbol
  public newSymbol = {
    symbol: '',
    watchlist: 'Tech Watch',
    targetPrice: null,
    notes: ''
  };

  constructor() { }

  ngOnInit() {
    this.calculateSummary();
  }

  calculateSummary() {
    this.watchlistSummary.totalSymbols = this.watchlistItems.length;

    const changes = this.watchlistItems.map(item => item.quote?.changePercent || 0);
    this.watchlistSummary.avgChange = changes.reduce((sum, change) => sum + change, 0) / changes.length;

    this.watchlistSummary.gainers = this.watchlistItems.filter(item => (item.quote?.changePercent || 0) > 0).length;
    this.watchlistSummary.losers = this.watchlistItems.filter(item => (item.quote?.changePercent || 0) < 0).length;
  }

  getFilteredItems() {
    if (this.selectedCategory === 'All') {
      return this.watchlistItems;
    }
    return this.watchlistItems.filter(item => item.watchlistName === this.selectedCategory);
  }

  removeFromWatchlist(id: string) {
    if (confirm('Remove this symbol from your watchlist?')) {
      console.log('Removing symbol:', id);
      // TODO: Implement API call to remove from watchlist
      this.watchlistItems = this.watchlistItems.filter(item => item.id !== id);
      this.calculateSummary();
    }
  }

  addToWatchlist() {
    if (!this.newSymbol.symbol) {
      alert('Please enter a symbol');
      return;
    }

    console.log('Adding to watchlist:', this.newSymbol);
    // TODO: Implement API call to add to watchlist
    alert(`${this.newSymbol.symbol} added to ${this.newSymbol.watchlist} watchlist!`);

    // Reset form
    this.newSymbol = {
      symbol: '',
      watchlist: 'Tech Watch',
      targetPrice: null,
      notes: ''
    };
  }

  addToPortfolio(symbol: string) {
    console.log('Adding to portfolio:', symbol);
    // TODO: Navigate to add transaction page with pre-filled symbol
    alert(`Navigate to add transaction for ${symbol}`);
  }

  getWatchlistCount(category: string): number {
    return this.watchlistItems.filter(item => item.watchlistName === category).length;
  }

}
