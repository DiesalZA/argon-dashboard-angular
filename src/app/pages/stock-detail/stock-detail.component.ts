import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StockDetails, HistoricalPrice } from '../../models';
import Chart from 'chart.js';
import { chartOptions, parseOptions } from '../../variables/charts';

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.scss']
})
export class StockDetailComponent implements OnInit {

  public symbol: string = '';
  public activeTab: string = 'overview';
  public priceChart: any;
  public selectedTimeframe: string = '1M';

  // Mock stock details (will be replaced with API call)
  public stockDetails: StockDetails = {
    symbol: 'AAPL',
    companyName: 'Apple Inc.',
    price: 178.50,
    change: 1.25,
    changePercent: 0.71,
    volume: 98765432,
    marketCap: 2800000000000,
    peRatio: 28.5,
    high: 179.50,
    low: 177.20,
    open: 177.80,
    previousClose: 177.25,
    description: 'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide.',
    ceo: 'Tim Cook',
    sector: 'Technology',
    industry: 'Consumer Electronics',
    employees: 164000,
    website: 'https://www.apple.com',
    exchange: 'NASDAQ',
    dividendYield: 0.52,
    eps: 6.26,
    beta: 1.29,
    week52High: 199.62,
    week52Low: 124.17
  };

  // Mock historical price data
  public historicalData: { [key: string]: HistoricalPrice[] } = {
    '1D': this.generateMockData(1, 'hour'),
    '1W': this.generateMockData(7, 'day'),
    '1M': this.generateMockData(30, 'day'),
    '3M': this.generateMockData(90, 'day'),
    '1Y': this.generateMockData(365, 'day'),
    '5Y': this.generateMockData(1825, 'week'),
  };

  // Mock news data
  public stockNews = [
    {
      id: 'n1',
      title: 'Apple Announces Record Quarterly Earnings',
      summary: 'Apple Inc. reported better-than-expected earnings for Q3, driven by strong iPhone sales and services revenue growth.',
      source: 'Reuters',
      timestamp: new Date('2024-11-03T14:30:00'),
      url: '#'
    },
    {
      id: 'n2',
      title: 'New iPhone Models Drive Strong Demand',
      summary: 'Analysts report that the latest iPhone 15 series is seeing robust demand across all markets, particularly in China.',
      source: 'Bloomberg',
      timestamp: new Date('2024-11-02T10:15:00'),
      url: '#'
    },
    {
      id: 'n3',
      title: 'Apple Expands Services Business',
      summary: 'The company continues to grow its services segment, with Apple TV+ and Apple Music gaining subscribers.',
      source: 'CNBC',
      timestamp: new Date('2024-11-01T16:45:00'),
      url: '#'
    }
  ];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // Get symbol from route params
    this.route.params.subscribe(params => {
      this.symbol = params['symbol'] || 'AAPL';
      this.stockDetails.symbol = this.symbol;
      // In production, fetch stock details from API
      this.loadStockData();
    });

    // Initialize chart after a short delay to ensure DOM is ready
    setTimeout(() => this.initializeChart(), 100);
  }

  loadStockData() {
    // TODO: Implement API call to fetch stock data
    console.log('Loading data for symbol:', this.symbol);
  }

  initializeChart() {
    const chartCanvas = document.getElementById('chart-stock-price');
    if (!chartCanvas) return;

    parseOptions(Chart, chartOptions());

    const data = this.historicalData[this.selectedTimeframe];

    this.priceChart = new Chart(chartCanvas, {
      type: 'line',
      options: {
        scales: {
          yAxes: [{
            ticks: {
              callback: function(value) {
                return '$' + value.toFixed(2);
              }
            }
          }]
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              return '$' + tooltipItem.yLabel.toFixed(2);
            }
          }
        }
      },
      data: {
        labels: data.map(d => this.formatDate(d.date)),
        datasets: [{
          label: 'Price',
          data: data.map(d => d.close),
          borderColor: '#5e72e4',
          backgroundColor: 'rgba(94, 114, 228, 0.1)',
          fill: true
        }]
      }
    });
  }

  changeTimeframe(timeframe: string) {
    this.selectedTimeframe = timeframe;
    if (this.priceChart) {
      const data = this.historicalData[timeframe];
      this.priceChart.data.labels = data.map(d => this.formatDate(d.date));
      this.priceChart.data.datasets[0].data = data.map(d => d.close);
      this.priceChart.update();
    }
  }

  formatDate(date: Date): string {
    const d = new Date(date);
    if (this.selectedTimeframe === '1D') {
      return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else if (this.selectedTimeframe === '1W' || this.selectedTimeframe === '1M') {
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } else {
      return d.toLocaleDateString('en-US', { year: '2-digit', month: 'short' });
    }
  }

  generateMockData(days: number, interval: string): HistoricalPrice[] {
    const data: HistoricalPrice[] = [];
    const basePrice = 175;
    let currentPrice = basePrice;

    const points = interval === 'hour' ? days * 24 : days;

    for (let i = 0; i < points; i++) {
      const date = new Date();
      if (interval === 'hour') {
        date.setHours(date.getHours() - (points - i));
      } else if (interval === 'day') {
        date.setDate(date.getDate() - (points - i));
      } else {
        date.setDate(date.getDate() - ((points - i) * 7));
      }

      // Simulate price movement
      const change = (Math.random() - 0.5) * 3;
      currentPrice += change;
      const open = currentPrice;
      const close = currentPrice + (Math.random() - 0.5) * 2;
      const high = Math.max(open, close) + Math.random() * 1;
      const low = Math.min(open, close) - Math.random() * 1;

      data.push({
        date: date,
        open: open,
        high: high,
        low: low,
        close: close,
        volume: Math.floor(Math.random() * 10000000) + 50000000
      });
    }

    return data;
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  addToPortfolio() {
    console.log('Adding', this.symbol, 'to portfolio');
    // TODO: Navigate to transaction form with pre-filled symbol
    alert(`Navigate to add transaction for ${this.symbol}`);
  }

  addToWatchlist() {
    console.log('Adding', this.symbol, 'to watchlist');
    // TODO: Implement add to watchlist
    alert(`${this.symbol} added to watchlist!`);
  }

  formatMarketCap(value: number): string {
    if (value >= 1000000000000) {
      return '$' + (value / 1000000000000).toFixed(2) + 'T';
    } else if (value >= 1000000000) {
      return '$' + (value / 1000000000).toFixed(2) + 'B';
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
