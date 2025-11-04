import { Component, OnInit } from '@angular/core';
import { Holding, Transaction } from '../../models';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  // Holdings data (mock data - will be replaced with API calls)
  public holdings: Holding[] = [
    {
      id: '1',
      portfolioId: 'p1',
      symbol: 'AAPL',
      companyName: 'Apple Inc.',
      shares: 50,
      avgCostBasis: 150.00,
      currentPrice: 178.50,
      marketValue: 8925.00,
      unrealizedPL: 1425.00,
      unrealizedPLPercent: 19.00,
      sector: 'Technology',
      exchange: 'NASDAQ'
    },
    {
      id: '2',
      portfolioId: 'p1',
      symbol: 'MSFT',
      companyName: 'Microsoft Corporation',
      shares: 35,
      avgCostBasis: 280.00,
      currentPrice: 365.25,
      marketValue: 12783.75,
      unrealizedPL: 2983.75,
      unrealizedPLPercent: 30.46,
      sector: 'Technology',
      exchange: 'NASDAQ'
    },
    {
      id: '3',
      portfolioId: 'p1',
      symbol: 'TSLA',
      companyName: 'Tesla Inc.',
      shares: 20,
      avgCostBasis: 245.00,
      currentPrice: 198.50,
      marketValue: 3970.00,
      unrealizedPL: -930.00,
      unrealizedPLPercent: -18.98,
      sector: 'Automotive',
      exchange: 'NASDAQ'
    },
    {
      id: '4',
      portfolioId: 'p1',
      symbol: 'NVDA',
      companyName: 'NVIDIA Corporation',
      shares: 25,
      avgCostBasis: 420.00,
      currentPrice: 485.60,
      marketValue: 12140.00,
      unrealizedPL: 1640.00,
      unrealizedPLPercent: 15.62,
      sector: 'Technology',
      exchange: 'NASDAQ'
    },
    {
      id: '5',
      portfolioId: 'p1',
      symbol: 'AMZN',
      companyName: 'Amazon.com Inc.',
      shares: 40,
      avgCostBasis: 135.00,
      currentPrice: 152.75,
      marketValue: 6110.00,
      unrealizedPL: 710.00,
      unrealizedPLPercent: 13.15,
      sector: 'Consumer',
      exchange: 'NASDAQ'
    },
    {
      id: '6',
      portfolioId: 'p1',
      symbol: 'GOOGL',
      companyName: 'Alphabet Inc.',
      shares: 30,
      avgCostBasis: 125.00,
      currentPrice: 142.30,
      marketValue: 4269.00,
      unrealizedPL: 519.00,
      unrealizedPLPercent: 13.84,
      sector: 'Technology',
      exchange: 'NASDAQ'
    },
    {
      id: '7',
      portfolioId: 'p1',
      symbol: 'JNJ',
      companyName: 'Johnson & Johnson',
      shares: 60,
      avgCostBasis: 155.00,
      currentPrice: 162.75,
      marketValue: 9765.00,
      unrealizedPL: 465.00,
      unrealizedPLPercent: 5.00,
      sector: 'Healthcare',
      exchange: 'NYSE'
    }
  ];

  // Transactions data (mock data - will be replaced with API calls)
  public transactions: Transaction[] = [
    {
      id: 't1',
      portfolioId: 'p1',
      date: new Date('2024-11-02'),
      type: 'BUY',
      symbol: 'AAPL',
      companyName: 'Apple Inc.',
      shares: 10,
      price: 178.50,
      fees: 5.00,
      total: 1790.00,
      notes: 'Added to tech position'
    },
    {
      id: 't2',
      portfolioId: 'p1',
      date: new Date('2024-11-01'),
      type: 'SELL',
      symbol: 'GOOGL',
      companyName: 'Alphabet Inc.',
      shares: 15,
      price: 142.30,
      fees: 5.00,
      total: 2129.50,
      notes: 'Taking profits'
    },
    {
      id: 't3',
      portfolioId: 'p1',
      date: new Date('2024-10-28'),
      type: 'BUY',
      symbol: 'NVDA',
      companyName: 'NVIDIA Corporation',
      shares: 5,
      price: 485.60,
      fees: 5.00,
      total: 2433.00
    },
    {
      id: 't4',
      portfolioId: 'p1',
      date: new Date('2024-10-25'),
      type: 'BUY',
      symbol: 'MSFT',
      companyName: 'Microsoft Corporation',
      shares: 10,
      price: 365.25,
      fees: 5.00,
      total: 3657.50
    },
    {
      id: 't5',
      portfolioId: 'p1',
      date: new Date('2024-10-20'),
      type: 'DIVIDEND',
      symbol: 'JNJ',
      companyName: 'Johnson & Johnson',
      shares: 60,
      price: 1.19,
      fees: 0,
      total: 71.40,
      notes: 'Quarterly dividend'
    },
    {
      id: 't6',
      portfolioId: 'p1',
      date: new Date('2024-10-15'),
      type: 'BUY',
      symbol: 'TSLA',
      companyName: 'Tesla Inc.',
      shares: 20,
      price: 245.00,
      fees: 5.00,
      total: 4905.00
    }
  ];

  // Summary stats
  public holdingsSummary = {
    totalPositions: 7,
    totalMarketValue: 57962.75,
    totalCostBasis: 51150.00,
    totalUnrealizedPL: 6812.75,
    totalUnrealizedPLPercent: 13.32
  };

  constructor() { }

  ngOnInit() {
    // Calculate summary from holdings
    this.calculateSummary();
  }

  calculateSummary() {
    this.holdingsSummary.totalPositions = this.holdings.length;
    this.holdingsSummary.totalMarketValue = this.holdings.reduce((sum, h) => sum + h.marketValue, 0);
    this.holdingsSummary.totalCostBasis = this.holdings.reduce((sum, h) => sum + (h.avgCostBasis * h.shares), 0);
    this.holdingsSummary.totalUnrealizedPL = this.holdingsSummary.totalMarketValue - this.holdingsSummary.totalCostBasis;
    this.holdingsSummary.totalUnrealizedPLPercent = (this.holdingsSummary.totalUnrealizedPL / this.holdingsSummary.totalCostBasis) * 100;
  }

}
